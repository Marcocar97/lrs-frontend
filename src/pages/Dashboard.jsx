import { Box, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    name: 'RapidRoof',
    path: '/rapidroof',
    comingSoon: false,
  },
  {
    name: 'FastCoat',
    path: '/fascoat',
    comingSoon: false,
  },
  {
    name: 'ElastoKote',
    comingSoon: true,
  },
  {
    name: 'EcoThane',
    comingSoon: true,
  },
];

const productColors = {
    RapidRoof: '#f57c00',   
    FastCoat: '#388e3c',  
    ElastoKote: '#d32f2f',  
    EchoThane: '#2795d4', 
  };
  

const Dashboard = () => {
  const [userName, setUserName] = useState('User');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.name) setUserName(user.name);
  }, []);

  return (
    <Box
  sx={{
    pt: '100px',
    px: isMobile ? 2 : 4,
    pb: 4,
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    boxSizing: 'border-box',
  }}
>
    <Typography variant="h4" fontWeight="bold" mb={1}>
  Hi {userName}, welcome to your LRS Toolkit
</Typography>
<Typography variant="subtitle1" mb={3}>
  Select a product below to get started
</Typography>


<Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '2rem',
        }}
      >
        {products.map((product) => (
          <Box
            key={product.name}
            onClick={() => !product.comingSoon && navigate(product.path)}
            sx={{
              width: isMobile ? '100%' : 'calc(50% - 2rem)',
              height: '22vh',
              minHeight: 140,
              backgroundColor: productColors[product.name] || '#42a5f5',
              color: '#fff',
              borderRadius: 3,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 'bold',
              fontSize: '1.4rem',
              position: 'relative',
              cursor: product.comingSoon ? 'not-allowed' : 'pointer',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: product.comingSoon ? 'none' : 'scale(1.02)',
              },
              '&:hover .coming-soon': {
                opacity: 1,
              },
              overflow: 'hidden',
            }}
          >
            {product.name}
            {product.comingSoon && (
              <Box
                className="coming-soon"
                sx={{
                  position: 'absolute',
                  bottom: 12,
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: '#333',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                }}
              >
                Coming soon
              </Box>
            )}
          </Box>
       
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
