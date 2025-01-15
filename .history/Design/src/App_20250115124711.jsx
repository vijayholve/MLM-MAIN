import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPageForm from "./form/loginPage/LoginPageForm.jsx";
import ProtectedPage from "./form/loginPage/ProtectedPage.jsx";
import PrivateRoutePage from './form/loginPage/PrivateRoute.jsx';

const App = () => {
  const [user, setUser] = useState(null);

  return (
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
  );
};

export default App;
