import React from "react";
import { createRoot } from 'react-dom/client'; // Correct import for React 18
import App from "./App";
import { baseTheme } from '@chakra-ui/theme'
import { Provider } from '@chakra-ui/react/provider'

  createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider theme={baseTheme}>
    <App />
    </Provider>
  </React.StrictMode>
);
