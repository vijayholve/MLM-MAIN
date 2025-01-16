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
import { createContext } from "react";
 
const UserContext = createContext();
const App = () => {
  const [username, setUsername] = useState(Nu);
  
  // Simulate fetching user data (remove this in production)
  // useEffect(() => {
  //   setTimeout(() => {
  //     // Simulating a user fetch after 2 seconds
  //     setUser({ name: "John Doe" }); // Replace with actual user data
  //   }, 2000);
  // }, []);

  // Debugging: Check if the user is loaded
  console.log("User state:", username);

  return (
    <Router>
      <Navbar user={username} />
      <div className="col-md-9 ms-sm-auto col-lg-9 px-4">
        {(
          <Routes>
            <UserContext.Provider value={{username,setUsername}}>

            {/* Public Routes */}
            <Route path="/login" element={<LoginPageForm  setUser={setUsername}/>} />
            <Route path="/register-form" element={<CreateUser />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/about" element={<About />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedPage >
                  <Home />
                </ProtectedPage>
              }
              />
            <Route
              path="/mlm-tree/:mlmId"
              element={
                <>
                  <MLMTree />
                </>
              }
            />
            <Route
              path="/all-users"
              element={
                <>
                  <MainTable />
                </>
              }
              />
            <Route
              path="/create-kyc"
              element={
                <>
                  <CreateKyc />
                </>
              }
              />
        </UserContext.Provider>
          </Routes>
        )}
      </div>
    </Router>
  );
};

export default App;
