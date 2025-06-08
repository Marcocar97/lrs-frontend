import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = Boolean(localStorage.getItem('token'));

  if (!isLoggedIn || ['/login', '/register'].includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        backgroundColor: '#fff',
        color: '#000',
        zIndex: 1300,
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        {/* LOGO + NOMBRE MARCA */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <img
            src="/lrs-logo1.png"
            alt="LRS Logo"
            style={{ height: 40, cursor: 'pointer' }}
            onClick={() => navigate('/dashboard')}
          />
          <Typography
            sx={{
              fontFamily: `'Arial Black', 'sans-serif'`,
              fontWeight: 700,
              fontStyle: 'italic',
              color: '#222',
              fontSize: '1.1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Liquid Roofing Systems
          </Typography>
        </Box>

        {/* NAV LINKS */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button sx={{ color: '#005BAC', fontWeight: 'bold' }} onClick={() => navigate('/rapidroof')}>RAPIDROOF</Button>
          <Button sx={{ color: '#005BAC', fontWeight: 'bold' }} onClick={() => navigate('/fastcoat')}>FASTCOAT</Button>
          <Button sx={{ color: '#005BAC', fontWeight: 'bold' }} onClick={() => navigate('/elasto-kote')}>ELASTO-KOTE</Button>
          <Button sx={{ color: '#005BAC', fontWeight: 'bold' }} onClick={() => navigate('/karnak')}>KARNAK</Button>
        </Box>

        {/* ICONS */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton sx={{ color: '#005BAC' }} onClick={() => navigate('/help')}>
            <HelpOutlineIcon />
          </IconButton>
          <IconButton sx={{ color: '#005BAC' }} onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
