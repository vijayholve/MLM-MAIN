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
import Layout from "./components/layout/Layout.jsx";
const App = () => {
  const [username, setUsername] = useState(null);

  return (
    <UserContext.Provider value={{ username, setUsername, baseURL }}>
      <SiteConfingContent>
        <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<LoginPageForm />} />
              <Route
                path="/register-form"
                element={
                  <ProtectedPage>
                    <Layout>
                    <CreateUser />
                      </Layout> 

                  </ProtectedPage>
                }
              />
              <Route
                path="/plans"
                element={
                  <ProtectedPage>
<Layout>

                    <Plans />
</Layout>
                  </ProtectedPage>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedPage>
<Layout >

                    <DashboardComponent />
</Layout>
                  </ProtectedPage>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  <ProtectedPage>
<Layout>

                    <Home />
</Layout>
                  </ProtectedPage>
                }
              />
              <Route
                path="/mlm-tree/:mlmId"
                element={
                  <ProtectedPage>
<Layout>

                    <MLMTree />
</Layout>
                  </ProtectedPage>
                }
              />
              <Route
                path="/setting"
                element={
                  <ProtectedPage>
<Layout>

                    <SiteConfigEditor />
</Layout>
                  </ProtectedPage>
                }
              />
              <Route
                path="/all-users"
                element={
                  <ProtectedPage>
<Layout>

                    <MainTable />
</Layout>
                  </ProtectedPage>
                }
              />
              <Route
                path="/create-kyc"
                element={
                  <ProtectedPage>
<Layout
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
