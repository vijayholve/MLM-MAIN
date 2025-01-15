import React from "react";
import { createRoot } from 'react-dom/client'; // Correct import for React 18
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";


  createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      
    </ChakraProvider>
    <App />
  </React.StrictMode>
);
