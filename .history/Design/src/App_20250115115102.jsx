import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./form/loginPage/LoginPageForm.jsx";
import ProtectedPage from "./form/loginPage/ProtectedPage.jsx";
import PrivateRoutePage from './form/loginPage/PrivateRoute.jsx';

// PrivateRoute component
const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login-page" element={<LoginPage setUser={setUser} />} />

          {/* Use element instead of component */}
          <Route
            path="/protected"
            element={<PrivateRoutePage component={ProtectedPage} />}
          />

          <Route path="/home" element={<h1>Home</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
