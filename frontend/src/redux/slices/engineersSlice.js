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

      return response.data.data.engineer; // Assuming the response structure
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
      });
  },
});

export const { setStatus, setError } = engineerSlice.actions;
export default engineerSlice.reducer;
