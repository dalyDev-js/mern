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

// Async thunk to post a new engineer
export const postEngineer = createAsyncThunk(
  "engineerlist/postEngineer",
  async (engineerData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/v1/engineers", engineerData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch engineers by client or specific criteria
export const fetchMyEngineers = createAsyncThunk(
  "engineerlist/fetchMyEngineers",
  async (_, { rejectWithValue }) => {
    try {
      const hardcodedClientId = "66e6fb684b5878794bcadf9b";
      const response = await axios.post("/api/v1/engineers/my-engineers", {
        clientId: hardcodedClientId,
      });
      return response.data.data.engineers;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Async thunk to delete an engineer
export const deleteEngineer = createAsyncThunk(
  "engineerlist/deleteEngineer",
  async (engineerId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/v1/engineers/${engineerId}`);
      return engineerId; // Return the engineer ID to remove it from the state
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//  ///////////////////// engineer details   /////////////////////
// Async thunk to fetch engineer details by ID
export const fetchEngineerById = createAsyncThunk(
  "engineerlist/fetchEngineerById",
  async (engineerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/engineer/${engineerId}`);
      console.log(response);

      return response.data.data.engineer; // Assuming the response structure
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
    engineers: [], // List of engineers
    selectedEngineer: null, // Engineer details for the selected engineer
    status: "idle", // Status of operations
    error: null, // Store any errors
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
      //////////////////////// engineer by ID ////////////////////////////////
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
      // Post a new engineer
      .addCase(postEngineer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postEngineer.fulfilled, (state, action) => {
        state.engineers.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(postEngineer.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      // Fetch engineers based on client or specific criteria
      .addCase(fetchMyEngineers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMyEngineers.fulfilled, (state, action) => {
        state.engineers = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMyEngineers.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })
      // Delete an engineer
      .addCase(deleteEngineer.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEngineer.fulfilled, (state, action) => {
        state.engineers = state.engineers.filter(
          (engineer) => engineer._id !== action.payload
        );
        state.status = "succeeded";
      })
      .addCase(deleteEngineer.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { setStatus, setError } = engineerSlice.actions;
export default engineerSlice.reducer;
