import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage"; // Your Login Page component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} /> {/* Home page route */}
      </Routes>
    </Router>
  );
}

export default App;
