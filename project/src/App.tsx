import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashScreen from './components/SplashScreen';
import Login from './components/Login';
import UserCRUD from './components/UserCRUD';
import Register from './components/Register';
import Desencriptador from './components/Desencriptador'; // Asegúrate de que esta importación sea correcta
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users" element={<UserCRUD />} />
          <Route path="/register" element={<Register />} />
          <Route path="/desencriptar" element={<Desencriptador />} />
        </Routes>
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;