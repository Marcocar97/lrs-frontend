import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import RapidRoof from './pages/RapidRoof';
import HelpPage from './pages/Help';
import UploadFile from './pages/UploadedFiles';
import FastCoat from './pages/FastCoat';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/rapidroof" element={<RapidRoof />} />
        <Route path="/fascoat" element={<FastCoat />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/list" element={<UploadFile />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
