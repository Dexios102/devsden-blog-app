import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/api/beta";
axios.defaults.withCredentials = true;
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
