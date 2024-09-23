import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:8000/api/v1/contract";

// Async action to create a contract
export const createContract = createAsyncThunk(
  "contract/createContract",
  async (contractData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.post(baseURL, contractData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to create contract"
      );
    }
  }
);

// Async action to fetch a contract by ID
export const fetchContractById = createAsyncThunk(
  "contract/fetchContractById",
  async (contractId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(`${baseURL}/${contractId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data.contract;
    } catch (error) {
      return rejectWithValue(error.response.data || "Failed to fetch contract");
    }
  }
);

// Async action to fetch all contracts
export const fetchAllContracts = createAsyncThunk(
  "contract/fetchAllContracts",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(baseURL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data.contracts;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to fetch contracts"
      );
    }
  }
);

// Async action to update a contract by ID
export const updateContract = createAsyncThunk(
  "contract/updateContract",
  async ({ contractId, updatedData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.patch(
        `${baseURL}/${contractId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.data.contract;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to update contract"
      );
    }
  }
);

// Async action to delete a contract
export const deleteContract = createAsyncThunk(
  "contract/deleteContract",
  async (contractId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      await axios.delete(`${baseURL}/${contractId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return contractId;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to delete contract"
      );
    }
  }
);

export const fetchContractsByClientId = createAsyncThunk(
  "contract/fetchContractsByClientId",
  async (clientId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(`${baseURL}/client/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data.contracts;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to fetch contracts by client"
      );
    }
  }
);

// Fetch contracts by engineer ID
export const fetchContractsByEngineerId = createAsyncThunk(
  "contract/fetchContractsByEngineerId",
  async (engineerId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(`${baseURL}/engineer/${engineerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data.contracts;
    } catch (error) {
      return rejectWithValue(
        error.response.data || "Failed to fetch contracts by engineer"
      );
    }
  }
);
export const fetchContracts = createAsyncThunk(
  "contract/fetchContracts",
  async ({ role, userId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("Token");
      const endpoint =
        role === "client" ? `client/${userId}` : `engineer/${userId}`;
      const response = await axios.get(`${baseURL}/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data.contracts; // Return the contracts
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch contracts"
      );
    }
  }
);

export const checkIfContractExists = createAsyncThunk(
  "contracts/checkIfContractExists",
  async ({ serviceId, engineerUserId, clientId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/v1/contract/check`, {
        params: {
          service: serviceId,
          engineer: engineerUserId,
          client: clientId,
        },
      });
      return response.data.exists;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Contract slice
const contractSlice = createSlice({
  name: "contract",
  initialState: {
    contracts: [],
    selectedContract: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create contract
      .addCase(createContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createContract.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts.push(action.payload.data.contract);
      })
      .addCase(createContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch contract by ID
      .addCase(fetchContractById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContractById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedContract = action.payload;
      })
      .addCase(fetchContractById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all contracts
      .addCase(fetchAllContracts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContracts.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts = action.payload;
      })
      .addCase(fetchAllContracts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update contract
      .addCase(updateContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContract.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.contracts.findIndex(
          (contract) => contract._id === action.payload._id
        );
        if (index !== -1) {
          state.contracts[index] = action.payload;
        }
      })
      .addCase(updateContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete contract
      .addCase(deleteContract.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContract.fulfilled, (state, action) => {
        state.loading = false;
        state.contracts = state.contracts.filter(
          (contract) => contract._id !== action.payload
        );
      })
      .addCase(deleteContract.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contractSlice.reducer;
