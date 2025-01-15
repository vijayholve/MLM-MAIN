import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPageForm from "./form/loginPage/LoginPageForm.jsx";
import 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPageForm
         />} />
        <Route path="/" element={

        } />
      </Routes>
    </Router>
  );
}

export default App;
