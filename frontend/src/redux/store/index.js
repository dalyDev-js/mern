import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "../slices/jobSlice";
import authReducer from "../slices/authSlice";

import engineerReducer from "../slices/engineersSlice";
import verificationReducer from "../slices/requestVerify";
import userSlice from "../slices/userSlice";
import clientSlice from "../slices/clientSlice";
import contractSlice from "../slices/contractSlice";
import chatSlice from "../slices/chatSlice";
export const store = configureStore({
  reducer: {
    job: jobReducer,
    auth: authReducer,
    user: userSlice,
    verification: verificationReducer,
    engineerlist: engineerReducer,
    client: clientSlice,
    contract: contractSlice,
    chat: chatSlice,
  },
});

export default store;
