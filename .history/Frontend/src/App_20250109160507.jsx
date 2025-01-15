import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import About from "./pages/About";
import Home from "./pages/Home";
import { AuthProvider } from "./components/context/useauth";
import Navbar from "./components/navbar/Navbar";
import CreateUser from "./form/CreateUser";
import MLMTree from "./pages/BinaryTree";
import MainTable from "./components/table/Table";
import CreateKyc from "./form/KycForm";
import LoginUser from "./form/loginUser";
import PrivateRoute from './components/private_route';
// import ColumnGroupingTable from "  es/user_details";
const App = () => {
  return (
    <ChakraProvider >
    <Router>
      <Navbar />
      <main className="col-md-9 ms-sm-auto col-lg-9 px-4">
      <AuthProvider>
        <Routes>
          <Route path="/"  element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/register-form" element={<CreateUser />} />
          <Route path="/mlm-tree/:mlmId" element={<MLMTree />} />
          <Route path="/all-users" element={<MainTable/>}/>
          <Route path="/create-kyc" element={<CreateKyc />}/>
          <Route path="/login" element={<LoginUser />}/>

        </Routes>
      </AuthProvider>
      </main>
    </Router>
    </ChakraProvider>

  );
};

export default App;
