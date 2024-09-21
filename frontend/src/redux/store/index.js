import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../slices/jobSlice";
import authReducer from "../slices/authSlice";

import engineerReducer from "../slices/engineersSlice";
import verificationReducer from "../slices/requestVerify";
import userSlice from "../slices/userSlice";
export const store = configureStore({
  reducer: {
    job: jobReducer,
    auth: authReducer,
    user: userSlice,
    verification: verificationReducer,
    engineerlist: engineerReducer, // Handles engineer-related actions
  },
});

export default store;
