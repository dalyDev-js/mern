import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to post a new job
export const postJob = createAsyncThunk(
  "job/postJob",
  async (jobData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/jobs", jobData);
      return response.data;
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
      });
  },
});

export const { setStatus, setError } = jobSlice.actions;
export default jobSlice.reducer;
