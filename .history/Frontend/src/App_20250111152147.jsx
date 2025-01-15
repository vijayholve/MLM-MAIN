import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import CreateUser from "./form/CreateUser";
import MLMTree from "./pages/BinaryTree";
import MainTable from "./components/table/Table";
import LoginUser from "./form/LoginUser";
import { AuthProvider } from "./components/context/useAuth.jsx";
import CreateKyc from "./form/KycForm.jsx";
import PrivateRoute from "./components/private_route.jsx";






const App = () => {
  return (
    <ErrorBoundary>


    <ChakraProvider>
      <Router>
        <AuthProvider>
          <Navbar />
          <main className="col-md-9 ms-sm-auto col-lg-9 px-4">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/register-form" element={<CreateUser />} />
              <Route path="/mlm-tree/:mlmId" element={<MLMTree />} />
              <Route path="/all-users" element={<MainTable />} />
              <Route path="/create-kyc" element={<CreateKyc />} />
              <Route path="/login" element={<LoginUser />} />
            </Routes>
          </main>
        </AuthProvider>
      </Router>
      </ChakraProvider>
    );
};


export default App;
