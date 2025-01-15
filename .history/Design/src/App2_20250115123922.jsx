import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// Import your components
import LoginPage from "./form/loginPage/LoginPageForm.jsx";
import ProtectedPage from "./form/loginPage/ProtectedPage.jsx";
import PrivateRoutePage from "./form/loginPage/PrivateRoute";

// Commented out unused imports
// import About from "./pages/About";
// import Home from "./pages/Home";
// import Navbar from "./components/navbar/Navbar";
// import CreateUser from "./form/CreateUser";
// import MLMTree from "./pages/BinaryTree";
// import MainTable from "./components/table/Table";
// import { AuthProvider, useAuth } from "./components/context/useAuth";
// import CreateKyc from "./form/KycForm.jsx";
// import { ChakraProvider } from "@chakra-ui/react";
// import {
//   ThemeProvider as MUIThemeProvider,
//   createTheme,
// } from "@mui/material/styles";
// import Plans from "./pages/Plans.jsx";

// Define the theme (can be customized later)
const muiTheme = createTheme();

const App = () => {
  // State to store user authentication status
  const [user, setUser] = useState(null);

  // Component render
  return (
    <Router>
      <div>
        {/* Using Routes instead of Switch (Switch is deprecated in React Router v6) */}
        <Routes>
          {/* Login Page route - sets the user state */}
          <Route path="/login-page" element={<LoginPage setUser={setUser} />} />

          {/* PrivateRoutePage for protected pages */}
          <Route
            path="/protected"
            element={
              <PrivateRoutePage>
                <ProtectedPage />
              </PrivateRoutePage>
            }
          />

          {/* Home route */}
          <Route path="/home" element={<Home />} />

          {/* You can also add other routes like About, Plans, etc. */}
          {/* Public routes */}
          {/* <Route path="/plans" element={<Plans />} />
          <Route path="/about" element={<About />} /> */}

        </Routes>
      </div>
    </Router>
  );
};

// Create a Home component as placeholder for the home route
const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>
    </div>
  );
};

// Example of PrivateRoutePage implementation
// PrivateRoutePage component checks if the user is authenticated
// If not authenticated, it redirects to the login page
const PrivateRoutePage = ({ children }) => {
  // You can modify the condition here based on your authentication logic
  const user = JSON.parse(localStorage.getItem("user"));
  
  if (!user) {
    return <Navigate to="/login-page" replace />;
  }

  return children; // Render protected page if authenticated
};

export default App;
