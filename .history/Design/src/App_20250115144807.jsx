import { Routes, Route } from 'react-router-dom';
import { Home } from '@mui/icons-material';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}
