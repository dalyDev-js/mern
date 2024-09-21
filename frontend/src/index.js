import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { AuthContextProvider } from "./context/AuthContext";

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Q1A9NKPqNhojDsBstCiHNECKYvqTV0vBcXsAtgBiPXKyUAjyrlM3Q2JLg7djaJJcBMZvy8UjlzwspgeAsEJ1n0Z00lyG096XF');

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthContextProvider>
      <Elements stripe={stripePromise}>
        <App />
        </Elements>
      </AuthContextProvider>
    </Provider>
  </React.StrictMode>
);
