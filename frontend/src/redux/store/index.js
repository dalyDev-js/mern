import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../slices/jobSlice";
import authReducer from "../slices/authSlice";

import engineerReducer from "../slices/engineersSlice";
export const store = configureStore({
  reducer: {
    job: jobReducer,
    auth: authReducer,

    engineerlist: engineerReducer, // Handles engineer-related actions
  },
});

export default store;
