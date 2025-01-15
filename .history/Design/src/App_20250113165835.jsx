import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import CreateUser from "./form/CreateUser";
import MLMTree from "./pages/BinaryTree";
import MainTable from "./components/table/Table";
import LoginUser from "./form/LoginUser";
import { AuthProvider } from "./components/context/useAuth";
import CreateKyc from "./form/KycForm.jsx";
import PrivateRoute from "./components/private_route.jsx";
import { ChakraProvider } from "@chakra-ui/react";
const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <main className="col-md-9 ms-sm-auto col-lg-9 px-4">
            <Routes>
              {/* Private routes */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mlm-tree/:mlmId"
                element={
                  <PrivateRoute>
                    <MLMTree />
                  </PrivateRoute>
                }
              />
              <Route
                path="/all-users"
                element={
                  <PrivateRoute>
                    <MainTable />
                  </PrivateRoute>
                }
              />
              <Route
                path="/create-kyc"
                element={
                  <PrivateRoute>
                    <CreateKyc />
                  </PrivateRoute>
                }
              />

              {/* Public routes */}
              <Route path="/about" element={<About />} />
              <Route path="/register-form" element={<CreateUser />} />
              <Route path="/login" element={<LoginUser />} />
            </Routes>
          </main>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
