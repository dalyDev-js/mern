// src/redux/slices/chatSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to create or fetch a conversation
export const createOrFetchConversation = createAsyncThunk(
  "chat/createOrFetchConversation",
  async ({ senderId, receiverId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/chat/conversation`,
        {
          senderId,
          receiverId,
        }
      );
      return response.data.data.conversation;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to create or fetch conversation"
      );
    }
  }
);

// Async thunk to send a message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ senderId, receiverId, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/chat/send/${receiverId}`,
        {
          senderId,
          content,
        }
      );
      return response.data.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to send message"
      );
    }
  }
);

// Async thunk to fetch all conversations
export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/chat/conversations",
        { userId }
      );

      // Assuming the response returns unique conversations
      return response.data.data.conversations;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch conversations"
      );
    }
  }
);

// Async thunk to fetch messages for a specific conversation
export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ conversationId, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/chat/messages/${conversationId}`,
        {
          userId, // Send userId explicitly in the body
        }
      );
      return response.data.data.messages;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch messages"
      );
    }
  }
);

// Slice
const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    messages: {},
    selectedConversation: null,
    loading: false,
    loadingConversations: false,
    error: null,
  },
  reducers: {
    // Reducer to handle receiving a new message via Socket.IO
    receiveMessage: (state, action) => {
      const message = action.payload;
      const { conversation: conversationId } = message;

      // Update conversation's lastMessage
      const conversation = state.conversations.find(
        (conv) => conv._id === conversationId
      );

      if (conversation) {
        conversation.lastMessage = message;
      } else {
        // Optionally add the conversation if it doesn't exist
        state.conversations.push({
          _id: conversationId,
          participants: [message.sender, message.receiver],
          lastMessage: message,
        });
      }

      // If messages for this conversation are loaded, append the new message if it doesn't exist
      if (state.messages[conversationId]) {
        const exists = state.messages[conversationId].some(
          (msg) => msg._id === message._id
        );
        if (!exists) {
          state.messages[conversationId].push(message);
        }
      } else {
        state.messages[conversationId] = [message];
      }
    },
    // Reducer to select a conversation
    selectConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle sendMessage
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        const message = action.payload;
        if (typeof message.sender === "string") {
          message.sender = { _id: message.sender };
        }
        const { conversation: conversationId } = message;

        // Update conversation's lastMessage
        const conversation = state.conversations.find(
          (conv) => conv._id === conversationId
        );

        if (conversation) {
          conversation.lastMessage = message;
        } else {
          // Optionally add the conversation if it doesn't exist
          state.conversations.push({
            _id: conversationId,
            participants: [message.sender, message.receiver],
            lastMessage: message,
          });
        }

        // Check if the message already exists
        const messages = state.messages[conversationId];

        if (messages) {
          const exists = messages.some((msg) => msg._id === message._id);
          if (!exists) {
            messages.push(message);
          }
        } else {
          state.messages[conversationId] = [message];
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle fetchConversations
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loadingConversations = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loadingConversations = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loadingConversations = false;
        state.error = action.payload;
      });

    // Handle fetchMessages
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        const messages = action.payload;
        if (messages.length > 0) {
          const conversationId = messages[0].conversation;
          state.messages[conversationId] = messages;
        } else if (state.selectedConversation) {
          // Handle case where there are no messages for the conversation
          state.messages[state.selectedConversation._id] = [];
        }
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Handle createOrFetchConversation
    builder
      .addCase(createOrFetchConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrFetchConversation.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedConversation = action.payload;

        // Add the conversation to the list if it's not already there
        const exists = state.conversations.some(
          (conv) => conv._id === action.payload._id
        );
        if (!exists) {
          state.conversations.push(action.payload);
        }
      })
      .addCase(createOrFetchConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const { receiveMessage, selectConversation } = chatSlice.actions;

// Export reducer
export default chatSlice.reducer;
