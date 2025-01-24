import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./main.css";
import { Provider } from 'react-redux';
// import { Analytics } from "@vercel/analytics/react"
import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./utils/context/userContext";
import { persistor, store } from "./utils/store/store";
import { PersistGate } from "redux-persist/integration/react";
const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <UserContextProvider>
        <React.StrictMode>
          <QueryClientProvider client={client}>

            <App />
            {/* <Analytics /> */}
          </QueryClientProvider>
        </React.StrictMode>
      </UserContextProvider>,
    </PersistGate>
  </Provider>
);
