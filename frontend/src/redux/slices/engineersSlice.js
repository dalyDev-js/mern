//engieneers slice

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

// Async thunk to fetch all engineers
export const fetchAllEngineers = createAsyncThunk(
  "engineerlist/fetchAllEngineers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("api/v1/engineer/all");
      console.log(response);
      return response.data.data.engineers;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Async thunk to fetch engineer details by ID
export const fetchEngineerById = createAsyncThunk(
  "engineerlist/fetchEngineerById",
  async (engineerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/engineer/${engineerId}`);
      console.log(response);

      return response.data.data.engineer;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const fetchEngineerByEngineerId = createAsyncThunk(
  "engineerlist/fetchEngineerById",
  async (engineerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/engineer/engineerId/${engineerId}`
      );
      console.log(response);

      return response.data.data.engineer;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);
// update engineer details
export const updateEngineerName = createAsyncThunk(
  "engineerlist/updateEngineerName",
  async ({ engineerId, fullName }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/v1/engineer/updateEngineer/${engineerId}`,
        { fullName }
      );
      return response.data.data.engineer;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const updateEngineerProfilePic = createAsyncThunk(
  "engineerlist/updateEngineerProfilePic",
  async ({ engineerId, profilePic }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profilePic", profilePic);

      const response = await axios.put(
        `/api/v1/engineer/updateEngineer/${engineerId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.data.engineer;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const submitProposal = createAsyncThunk(
  "engineerlist/submitProposal",
  async ({ engineerId, service, content, budget }, { rejectWithValue }) => {
    try {
      console.log(engineerId, service, content, budget);
      const response = await axios.post(
        "/api/v1/proposals/addproposal",
        { engineerId, service, content, budget } // Include engineerId
      );
      console.log("Proposal response:", response);
      return response.data;
    } catch (error) {
      console.error("Error submitting proposal:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Async thunk to save a job to the engineer's saved jobs
export const saveJob = createAsyncThunk(
  "engineerlist/saveJob", // Corrected the name
  async ({ serviceId, engineerId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token"); // Get token from localStorage
      const response = await axios.post(
        "/api/v1/engineer/savejob", // URL without serviceId or engineerId as parameters
        { serviceId, engineerId }, // Send both serviceId and engineerId in the request body
        {
          headers: { Authorization: `Bearer ${token}` }, // Include token in the request header
        }
      );
      return response.data.savedJobs; // Return the updated saved jobs array
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);
export const removeSavedJob = createAsyncThunk(
  "engineerlist/removeSavedJob",
  async ({ serviceId, engineerId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token"); // Get token from localStorage
      const response = await axios.post(
        "/api/v1/engineer/removejob", // URL to remove saved job
        { serviceId, engineerId }, // Send both serviceId and engineerId in the body
        {
          headers: { Authorization: `Bearer ${token}` }, // Include token in the request header
        }
      );
      return response.data.savedJobs; // Return the updated saved jobs array
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const fetchSubmittedProposals = createAsyncThunk(
  "engineerlist/fetchSubmittedProposals",
  async (engineerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `/api/v1/engineers/${engineerId}/submittedProposals`
      );
      return response.data; // Assuming this returns an array of submitted proposals
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Slice for engineers
const engineerSlice = createSlice({
  name: "engineerlist", // Updated the slice name
  initialState: {
    engineers: [],
    selectedEngineer: null,
    savedJobs: [], // Ensure this is initialized
    submittedProposals: [], // Initialize this as well
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
      // Fetch all engineers
      .addCase(fetchAllEngineers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllEngineers.fulfilled, (state, action) => {
        state.engineers = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAllEngineers.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Fetch engineer by ID
      .addCase(fetchEngineerById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEngineerById.fulfilled, (state, action) => {
        state.selectedEngineer = action.payload; // Set the selected engineer
        state.status = "succeeded";
      })
      .addCase(fetchEngineerById.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(submitProposal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitProposal.fulfilled, (state, action) => {
        const { service } = action.payload; // Assuming the response contains the service ID
        state.submittedProposals.push(service); // Update the submitted proposals
        state.status = "succeeded";
      })

      .addCase(submitProposal.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // Save job
      .addCase(saveJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveJob.fulfilled, (state, action) => {
        state.savedJobs.push(action.payload); // Add the saved job
        state.status = "succeeded";
      })
      .addCase(saveJob.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { setStatus, setError } = engineerSlice.actions;
export default engineerSlice.reducer;
