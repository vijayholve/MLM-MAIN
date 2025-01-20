import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPageForm from "./form/loginPage/LoginPageForm.jsx";
import ProtectedPage from "./form/loginPage/ProtectedPage.jsx";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import CreateUser from "./form/CreateUser";
import MLMTree from "./pages/BinaryTree";
import MainTable from "./components/table/Table";
import CreateKyc from "./form/KycForm.jsx";
import Plans from "./pages/Plans.jsx";
import DashboardComponent from "./pages/Dashboard.jsx";
// Create the User Context
export const UserContext = createContext();
export const baseURL = "http://127.0.0.1:8000"; // Base URL for media files 

import SiteConfingContent from "./components/context/SiteConfingContent.jsx";
import SiteConfigEditor from "./components/setting/SiteConfigEditor.jsx";
import Kyctable from "./components/table/Kyctable.jsx";
const App = () => {
  const [username, setUsername] = useState(null);
  const [Message,setMessage] = useState({
    success : '',
    error :' '
  })
  const [openMessage, setOpenMessage] = useState(false);

  return (
    <UserContext.Provider value={{ username, setUsername, baseURL ,openMessage,setMessage,Message}}>
      <SiteConfingContent>
        <Router>
          <div className="col-md-9 ms-sm-auto col-lg-9 px-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPageForm />} />
              <Route
                path="/register-form"
                element={
                  <ProtectedPage>
                    <Navbar />

                    <CreateUser />
                  </ProtectedPage>
                }
              />
              <Route
                path="/plans"
                element={
                  <ProtectedPage>
                    <Navbar />

                    <Plans />
                  </ProtectedPage>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedPage>
                    <Navbar />

                    <DashboardComponent />
                  </ProtectedPage>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedPage>
                    <Navbar />

                    <Home />
                  </ProtectedPage>
                }
              />
              <Route
                path="/mlm-tree/:mlmId"
                element={
                  <ProtectedPage>
                    <Navbar />

                    <MLMTree />
                  </ProtectedPage>
                }
              />
              <Route
                path="/setting"
                element={
                  <ProtectedPage>
                    <Navbar />

                    <SiteConfigEditor />
                  </ProtectedPage>
                }
              />
              <Route
                path="/all-users"
                element={
                  <ProtectedPage>
                    <Navbar />

                    <MainTable />
                  </ProtectedPage>
                }
              />
              <Route
                path="/create-kyc"
                element={
                  <ProtectedPage>
                    <Navbar />

                    <CreateKyc />
                  </ProtectedPage>
                }
              />
              <Route
                path="/kyc"
                element={
                  <ProtectedPage>
                    <Navbar />

                    <Kyctable />
                  </ProtectedPage>
                }
              />
            </Routes>
          </div>
        </Router>
      </SiteConfingContent>
    </UserContext.Provider>
  );
};

export default App;
