import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPageForm from "./form/loginPage/LoginPageForm.jsx";
import ProtectedPage from "./form/loginPage/ProtectedPage.jsx";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import CreateUser from "./form/CreateUser";
import MLMTree from "./pages/BinaryTree";
import MainTable from "./components/table/Table";
import CreateKyc from "./form/KycForm.jsx";
import Plans from "./pages/Plans.jsx";
import DashboardComponent from "./pages/Dashboard.jsx";
import { SiteConfig } from "./components/context/SiteConfingContent.jsx";
// Create the User Context
export const UserContext = createContext();
export const baseURL = "http://127.0.0.1:8000"; // Base URL for media files

const App = () => {
  const [username, setUsername] = useState(null);
  
  return (
    <SiteConfig.Provider >

    <UserContext.Provider value={{ username, setUsername, baseURL }}>
      <Router>
        <Navbar />
        <div className="col-md-9 ms-sm-auto col-lg-9 px-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPageForm />} />
            <Route
              path="/register-form"
              element={
                <ProtectedPage>
                  <CreateUser />
                </ProtectedPage>
              }
            />
            <Route path="/plans" element={
              <ProtectedPage>

                <Plans />
              </ProtectedPage>
              
              } />
            <Route path="/dashboard" element={
              <ProtectedPage>

                <DashboardComponent />
              </ProtectedPage>
              } />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedPage>
                  <Home />
                </ProtectedPage>
              }
            />
            <Route
              path="/mlm-tree/:mlmId"
              element={
                <ProtectedPage>
                  <MLMTree />
                </ProtectedPage>
              }
            />
            <Route
              path="/all-users"
              element={
                <ProtectedPage>
                  <MainTable />
                </ProtectedPage>
              }
            />
            <Route
              path="/create-kyc"
              element={
                <ProtectedPage>
                  <CreateKyc />
                </ProtectedPage>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
    </SiteConfig.Provider>

  );
};

export default App;
