import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'

import { AuthProvider } from './context/useAuth';

import Login from './routes/login';
import Menu from './routes/menu';
import Register from './routes/register';

import PrivateRoute from './components/private_route';
function App() {
  return (
    <ChakraProvider>
        <Router>
          <AuthProvider>
              <Routes>
                <Route element={<PrivateRoute><><Home /></></PrivateRoute>} path='/' /> 
                <Route element={<><Login /></>} path='/login' /> 
                <Route element={<><Register /></>} path='/register' /> 
              </Routes>
          </AuthProvider>
        </Router>
    </ChakraProvider>
  );
}

export default App;
