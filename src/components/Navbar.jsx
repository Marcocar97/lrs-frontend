// src/components/Navbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  // Ocultar navbar en login/register
  if (!isLoggedIn || ['/login', '/register'].includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fff', boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* LOGO */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img
            src="/lrs-logo1.png"
            alt="LRS Logo"
            style={{ height: 40, cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          />
          <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
            Toolkit
          </Typography>
        </Box>

        {/* PRODUCTOS */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="primary" onClick={() => navigate('/rapidroof')}>RapidRoof</Button>
          <Button color="primary" onClick={() => navigate('/fastcoat')}>Fastcoat</Button>
          <Button color="primary" onClick={() => navigate('/elasto-kote')}>Elasto-Kote</Button>
          <Button color="primary" onClick={() => navigate('/karnak')}>Karnak</Button>
        </Box>

        {/* HELP + LOGOUT */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton color="primary" onClick={() => navigate('/help')}>
            <HelpOutlineIcon />
          </IconButton>
          <IconButton color="primary" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
