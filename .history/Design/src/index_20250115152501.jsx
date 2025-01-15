import React from "react";
import { createRoot } from 'react-dom/client'; // Correct import for React 18
import App from "./App";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    < >
    <App />
  </React.StrictMode>
);
