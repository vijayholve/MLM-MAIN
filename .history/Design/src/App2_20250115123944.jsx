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

export default App;
