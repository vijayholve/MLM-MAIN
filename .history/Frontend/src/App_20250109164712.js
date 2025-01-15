import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home ''
import { AuthProvider } from './context/useAuth';

import Login from './routes/login';
import Menu from './routes/menu';
import Register from './routes/register';
import PrivateRoute from './components/private_route';
function App() {
  return (
    <>
        <Router>
          <AuthProvider>
              <Routes> 
                
                <Route element={<PrivateRoute><><Home /></></PrivateRoute>} path='/' /> 
                <Route element={<><Login /></>} path='/login' /> 
                <Route element={<><Register /></>} path='/register' /> 
              </Routes>
          </AuthProvider>
        </Router>
    </>
  );
}

export default App;
