import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./utils/context/userContext";

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextProvider>
    <React.StrictMode>
      <QueryClientProvider client={client}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  </UserContextProvider>,
);
