import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { CourseContextprovider } from "./Context/CourseContext";
import { LoginContextProvider } from "./Context/LoginContext";
import { LoginContextProviderinst } from "./Context/LoginContextins";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoginContextProviderinst>
      <LoginContextProvider>
        <CourseContextprovider>
          <App />
        </CourseContextprovider>
      </LoginContextProvider>
    </LoginContextProviderinst>
  </React.StrictMode>
);
