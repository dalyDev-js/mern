import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

// Async thunk to fetch all clients
export const fetchAllClients = createAsyncThunk(
  "clientlist/fetchAllClients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("api/v1/client/all");
      return response.data.data.clients;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Async thunk to fetch client details by user ID
export const fetchClientById = createAsyncThunk(
  "clientlist/fetchClientById",
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/client/${clientId}`);
      return response.data.data.client;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Update client profile
export const updateClientName = createAsyncThunk(
  "clientlist/updateClientName",
  async ({ clientId, fullName }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/v1/client/updateClient/${clientId}`,
        { fullName }
      );
      return response.data.data.client;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Update client profile picture
export const updateClientProfilePic = createAsyncThunk(
  "clientlist/updateClientProfilePic",
  async ({ clientId, profilePic }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profilePic", profilePic);

      const response = await axios.put(
        `/api/v1/client/updateClient/${clientId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.data.client;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Save a project for the client
export const saveProject = createAsyncThunk(
  "clientlist/saveProject",
  async ({ projectId, clientId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.post(
        "/api/v1/client/saveproject",
        { projectId, clientId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.savedProjects;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Remove saved project for the client
export const removeSavedProject = createAsyncThunk(
  "clientlist/removeSavedProject",
  async ({ projectId, clientId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.post(
        "/api/v1/client/removeproject",
        { projectId, clientId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.savedProjects;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Fetch submitted projects by client ID
export const fetchSubmittedProjects = createAsyncThunk(
  "clientlist/fetchSubmittedProjects",
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/client/${clientId}/projects`);
      return response.data; // Assuming this returns an array of submitted projects
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Slice for clients
const clientSlice = createSlice({
  name: "clientlist",
  initialState: {
    clients: [],
    selectedClient: null,
    savedProjects: [],
    submittedProjects: [],
    status: "idle",
    error: null,
  },

  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch all clients
      .addCase(fetchAllClients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllClients.fulfilled, (state, action) => {
        state.clients = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAllClients.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Fetch client by ID
      .addCase(fetchClientById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClientById.fulfilled, (state, action) => {
        state.selectedClient = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchClientById.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Update client name
      .addCase(updateClientName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateClientName.fulfilled, (state, action) => {
        state.selectedClient = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateClientName.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Update client profile picture
      .addCase(updateClientProfilePic.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateClientProfilePic.fulfilled, (state, action) => {
        state.selectedClient = action.payload;
        state.status = "succeeded";
      })
      .addCase(updateClientProfilePic.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Save project
      .addCase(saveProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveProject.fulfilled, (state, action) => {
        state.savedProjects.push(action.payload); // Add the saved project
        state.status = "succeeded";
      })
      .addCase(saveProject.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Remove saved project
      .addCase(removeSavedProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeSavedProject.fulfilled, (state, action) => {
        state.savedProjects = action.payload; // Update saved projects
        state.status = "succeeded";
      })
      .addCase(removeSavedProject.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { setStatus, setError } = clientSlice.actions;
export default clientSlice.reducer;
