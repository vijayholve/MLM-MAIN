import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPageForm from "./form/loginPage/LoginPageForm.jsx";
import ProtectedPage from "./form/loginPage/ProtectedPage.jsx";
import PrivateRoutePage from './form/loginPage/PrivateRoute.jsx';
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import CreateUser from "./form/CreateUser";
import MLMTree from "./pages/BinaryTree";
import MainTable from "./components/table/Table";
import CreateKyc from "./form/KycForm.jsx";
import Plans from "./pages/Plans.jsx";

const App = () => {
  const [user, setUser] = useState(null);

  // Simulate fetching user data (remove this in production)
  useEffect(() => {
    setTimeout(() => {
      // Simulating a user fetch after 2 seconds
      setUser({ name: "John Doe" }); // Replace with actual user data
    }, 2000);
  }, []);

  // Debugging: Check if the user is loaded
  console.log("User state:", user);

  return (
    <Router>
        <Navbar user={user} />
        <main className="col-md-9 ms-sm-auto col-lg-9 px-4">
          {user === null ? (
              <div>Loading...</div> // Show loading while user is being fetched
          ) : (
              <Routes>
              {/* Private routes */}
              <Route
                path="/"
                element={
                    <PrivateRoutePage>
                    <Home />
                  </PrivateRoutePage>
                }
                />
                <ProtectedPage>
              <Route path="/mlm-tree/:mlmId" element={<MLMTree />} />
              <Route path="/all-users" element={<MainTable />} />
              <Route path="/create-kyc" element={<CreateKyc />} />
          </ProtectedPage>
  
              <Route path="/plans" element={<Plans />} />
              <Route path="/about" element={<About />} />
              <Route path="/register-form" element={<CreateUser />} />
              <Route path="/login" element={<LoginPageForm />} />
            </Routes>
          )}
        </main>
    </Router>
  );
};

export default App;
