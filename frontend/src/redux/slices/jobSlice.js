import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

export const fetchAllServices = createAsyncThunk(
  "job/fetchAllServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/v1/services");
      return response.data.data.services;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Async thunk to post a new job
export const postJob = createAsyncThunk(
  "job/postJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/services", jobData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch jobs by client
export const fetchMyJobs = createAsyncThunk(
  "job/fetchMyJobs",
  async (_, { rejectWithValue }) => {
    try {
      const hardcodedClientId = "66e6fb684b5878794bcadf9b";
      const response = await axios.post("/api/v1/services/my-jobs", {
        clientId: hardcodedClientId,
      });
      return response.data.data.services;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/services/${jobId}`);
      return jobId; // Return the job ID to remove it from the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
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
      // Fetch all services
      .addCase(fetchAllServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllServices.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAllServices.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(postJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(postJob.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(fetchMyJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyJobs.fulfilled, (state, action) => {
        state.jobs = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMyJobs.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      .addCase(deleteJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job._id !== action.payload);
        state.status = "succeeded";
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { setStatus, setError } = jobSlice.actions;
export default jobSlice.reducer;
