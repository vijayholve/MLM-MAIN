import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Navbar from "./components/navbar/Navbar";
import CreateUser from "./form/CreateUser";
import MLMTree from "./pages/BinaryTree";
import MainTable from "./components/table/Table";
import CreateKyc from "./form/KycForm";
// import ColumnGroupingTable from "  es/user_details";
const App = () => {
  return (
    <Router>
      <Navbar />
      <main className="col-md-9 ms-sm-auto col-lg-9 px-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register-form" element={<CreateUser />} />
          <Route path="/mlm-tree/:mlmId" element={<MLMTree />} />
          <Route path="/all-users" element={<MainTable/>}/>
          <Route path="/create-kyc" element={<CreateKyc />}/>
        </Routes>
      </main>
    </Router>
  );
};

export default App;
