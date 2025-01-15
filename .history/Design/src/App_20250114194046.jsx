import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import CreateUser from "./form/CreateUser";
import MLMTree from "./pages/BinaryTree";
import MainTable from "./components/table/Table";
import LoginUser_component from "./form/LoginUser";
import { AuthProvider, useAuth } from "./components/context/useAuth";
import CreateKyc from "./form/KycForm.jsx";
import { ChakraProvider } from "@chakra-ui/react";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
} from "@mui/material/styles";
import Plans from "./pages/Plans.jsx";
import PrivateRoute from "components/private_route.jsx";
const muiTheme = createTheme();

{
  /* App */
}

// PrivateRoute component
const App = () => {
  return (
    <ChakraProvider>
      <MUIThemeProvider theme={muiTheme}>
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

                {/* Public routes */}
                <Route path="/plans" element={<Plans />} />
                <Route path="/about" element={<About />} />
                <Route path="/register-form" element={<CreateUser />} />
                <Route path="/login" element={<LoginUser_component />} />
              </Routes>
            </main>
          </AuthProvider>
        </Router>
      </MUIThemeProvider>
    </ChakraProvider>
  );
};

export default App;
