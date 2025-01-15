import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChakraProvider } from "@chakra-ui/react";
const theme = extendTheme({}); // Optional: customize the theme if needed

createRoot(document.getElementById('root')).render(
  <ChakraProvider  theme={theme}>
  <App/>
  </ChakraProvider>,
)
