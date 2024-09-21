import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async action to submit a proposal
export const submitProposal = createAsyncThunk(
  "proposal/submitProposal",
  async (proposalData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.post(
        "http://localhost:8000/api/v1/proposals/addproposal",
        proposalData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async action to check if a proposal has been submitted for the job
export const checkSubmittedProposal = createAsyncThunk(
  "proposal/checkSubmittedProposal",
  async ({ jobId, engineerId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(
        `http://localhost:8000/api/v1/engineer/${engineerId}/submittedProposals/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data.submitted;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Proposal slice
const proposalSlice = createSlice({
  name: "proposal",
  initialState: {
    submitted: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitProposal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitProposal.fulfilled, (state) => {
        state.loading = false;
        state.submitted = true;
      })
      .addCase(submitProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Check submitted proposal
      .addCase(checkSubmittedProposal.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkSubmittedProposal.fulfilled, (state, action) => {
        state.loading = false;
        state.submitted = action.payload;
      })
      .addCase(checkSubmittedProposal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default proposalSlice.reducer;
