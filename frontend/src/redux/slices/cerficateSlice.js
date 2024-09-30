import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch certificates
export const fetchCertificates = createAsyncThunk(
  "certificates/fetchCertificates",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/certificates/${id}`
    );
    return response.data.certificates;
  }
);

const certificateSlice = createSlice({
  name: "certificates",
  initialState: {
    certificates: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCertificates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCertificates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.certificates = action.payload;
      })
      .addCase(fetchCertificates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default certificateSlice.reducer;
