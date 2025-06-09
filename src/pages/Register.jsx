import { useState } from 'react';
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Paper
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    position: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [accessCode, setAccessCode] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { name, position, phone, email, password } = form;
      const res = await axios.post('https://api.liquidwaterproofingacademy.com/api/register', {
        name,
        position,
        phone,
        email,
        password
      });
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  if (!authorized) {
    return (
      <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: 320, textAlign: 'center' }}>
          <img src="/lrs-logo1.png" alt="LRS" style={{ width: 60, marginBottom: 20 }} />
          <Typography variant="h6" gutterBottom>Enter Access Code</Typography>
          <TextField
            label="Access Code"
            type="password"
            fullWidth
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            fullWidth
            onClick={() => {
              if (accessCode === '1234') setAuthorized(true);
              else alert('Incorrect access code');
            }}
          >
            Submit
          </Button>
        </Paper>
      </Grid>
    );
  }

  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: '100vh', backgroundColor: '#f6f6f6' }}>
      <Paper
        elevation={3}
        sx={{
          width: '90%',
          maxWidth: 900,
          display: 'flex',
          flexDirection: 'row',
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
        }}
      >
        {/* Left panel */}
        <Box
          sx={{
            width: '40%',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
            borderRight: '1px solid #eee'
          }}
        >
          <img src="/lrs-logo1.png" alt="LRS" style={{ width: 80, marginBottom: 20 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Welcome to LRS
          </Typography>
          <Typography variant="body1" sx={{ color: '#666' }}>
            Register to get started.
          </Typography>
        </Box>

        {/* Right panel with form */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: '60%',
            p: 4,
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          <TextField
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Job Title"
            name="position"
            value={form.position}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#e84855',
              fontWeight: 'bold',
              ':hover': { backgroundColor: '#c03b47' },
              py: 1.2
            }}
          >
            REGISTER
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Register;
