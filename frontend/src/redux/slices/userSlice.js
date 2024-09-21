// userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

// Async thunk to fetch user details by ID
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/users/getUser/${userId}`);
      return response.data.data.user; // Assuming response structure
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Slice for a single user
const userSlice = createSlice({
  name: "user",
  initialState: {
    selectedUser: null, // User details for the selected user
    status: "idle", // Status of the operation
    error: null, // Store any errors
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user by ID
      .addCase(fetchUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload; // Set the selected user
        state.status = "succeeded";
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
