import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import "@fortawesome/fontawesome-free/js/all";
import { SocketContextProvider } from "../src/context/SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketContextProvider>
        <App />
      </SocketContextProvider>
    </Provider>
  </React.StrictMode>
);
