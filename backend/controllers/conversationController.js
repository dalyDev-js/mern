import Conversation from "../model/conversation.model.js";
import Message from "../model/message.model.js";

// Get all conversations for the logged-in user
export const getAllConversations = async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch conversations where the user is a participant
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate({
        path: "participants",
        model: "User", // Populate the participants (entire User object)
      })
      .populate({
        path: "messages", // Populate the messages array in each conversation
        model: "Message", // Use the Message model
      })
      .lean();

    res.status(200).json({ data: { conversations } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch conversations", error });
  }
};

// Get or create a conversation between sender and receiver
export const getOrCreateConversation = async (req, res) => {
  const { receiverId } = req.params;
  const { senderId } = req.body;

  try {
    // Find or create a conversation between the two participants
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      // Create a new conversation if one doesn't exist
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
      await conversation.save();
    }

    res.status(200).json({ conversation });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch or create conversation", error });
  }
};

// Get messages for a specific conversation by conversation ID
export const getMessagesByConversationId = async (req, res) => {
  const { conversationId } = req.params;

  try {
    // Find the conversation by ID and populate the messages field
    const conversation = await Conversation.findById(conversationId).populate({
      path: "messages",
      model: "Message",
    });

    if (!conversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(200).json({ data: { messages: conversation.messages } });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages", error });
  }
};
