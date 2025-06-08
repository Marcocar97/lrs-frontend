import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://api.liquidwaterproofingacademy.com/api/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Login successful');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  const theme = useTheme();
  const navigate = useNavigate();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* VIDEO */}
      {!isMobile && (
  <Box
  sx={{
    width: '65%',
    height: '100%',
    position: 'relative',
    flexShrink: 0,
    overflow: 'hidden',
  }}
>
<video
autoPlay
muted
playsInline
  src="/lrs-video.mp4"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'fill' // ⚠️ solo si tu video está preparado con las medidas del contenedor
  }}
/>

</Box>
    
      )}

      {/* FORM */}
      <Box
        sx={{
          width: isMobile ? '100%' : '35%',
          height: '100%',
          background: 'linear-gradient(to bottom, #e43428, #e43428)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '90%',
            maxWidth: 320,
          }}
        >

          <Typography variant="body1" color="white" mb={1}>
            E-mail:
          </Typography>
          <TextField
            fullWidth
            name="email"
            type="email"
            variant="filled"
            value={form.email}
            onChange={handleChange}
            sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
            required
          />

          <Typography variant="body1" color="white" mb={1}>
            Password:
          </Typography>
          <TextField
            fullWidth
            name="password"
            type="password"
            variant="filled"
            value={form.password}
            onChange={handleChange}
            sx={{ mb: 3, backgroundColor: '#fff', borderRadius: 1 }}
            required
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: 'yellow',
              color: 'black',
              fontWeight: 'bold',
              ':hover': { backgroundColor: '#f2c400' },
            }}
          >
            LOGIN
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
