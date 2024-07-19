import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import "./webcomponents";

ReactDOM.createRoot(document.getElementById("webcomponents-bundle")!)
  .render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
