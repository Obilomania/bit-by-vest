import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist"; // import "bootstrap/dist/css/bootstrap.min.css";

let persistor = persistStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // style: {
          //   borderRadius: "10px",
          //   background: "#333",
          //   color: "#fff",
          // },
          success: {
            duration: 4000,
            style: {
              background: "#000000",
              color: "white",
              border: "2px solid #fff",
              width: "20rem",
            },
          },
          error: {
            duration: 4000,
            style: {
              background: "red",
              color: "white",
              border: "2px solid #fff",
              width: "20rem",
            },
          },
        }}
      />
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
