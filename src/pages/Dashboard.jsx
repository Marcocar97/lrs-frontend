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
    name: 'Fastcoat',
    comingSoon: true,
  },
  {
    name: 'Elasto-Kote',
    comingSoon: true,
  },
  {
    name: 'Karnak',
    comingSoon: true,
  },
];

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
        pt: '70px', 
        p: isMobile ? 2 : 4,
        backgroundColor: '#f9f9f9',
        height: '100vh',
        boxSizing: 'border-box',
        overflow: 'hidden',
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
           backgroundColor: product.comingSoon ? '#e0e0e0' : '#42a5f5',
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
