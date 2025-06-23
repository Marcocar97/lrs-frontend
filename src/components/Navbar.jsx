import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery('(max-width:915px)');
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!isLoggedIn || ['/login', '/register'].includes(location.pathname)) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const navItems = [
    { label: 'RAPIDROOF', path: '/rapidroof' },
    { label: 'FASTCOAT', path: '/fastcoat' },
    { label: 'ELASTO-KOTE', path: '/elasto-kote' },
  ];

  return (
    <>
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
          {/* LOGO + NOMBRE */}
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

          {/* LINKS DESKTOP */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  sx={{ color: '#005BAC', fontWeight: 'bold' }}
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* ICONOS + MENÚ */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: '#005BAC' }}>
                <MenuIcon />
              </IconButton>
            )}
            <IconButton sx={{ color: '#005BAC' }} onClick={() => navigate('/help')}>
              <HelpOutlineIcon />
            </IconButton>
            <IconButton sx={{ color: '#005BAC' }} onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* DRAWER PARA MÓVIL */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 240 }} role="presentation" onClick={() => setDrawerOpen(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.label} onClick={() => navigate(item.path)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
