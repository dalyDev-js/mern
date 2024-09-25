import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to fetch portfolios
export const fetchPortfolios = createAsyncThunk(
  "portfolios/fetchPortfolios",
  async (id) => {
    const response = await axios.get(
      `http://localhost:8000/api/v1/portfolios/${id}`
    );
    return response.data.portfolios;
  }
);

const portfolioSlice = createSlice({
  name: "portfolios",
  initialState: {
    portfolios: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolios.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPortfolios.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.portfolios = action.payload;
      })
      .addCase(fetchPortfolios.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default portfolioSlice.reducer;
