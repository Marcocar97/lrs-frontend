import {
    Box,
    Typography,
    Container,
    TextField,
    InputAdornment,
    Grid,
    Card,
    CardContent,
    Collapse,
  } from '@mui/material';
  import SearchIcon from '@mui/icons-material/Search';
  import { useState } from 'react';
  
  const helpData = [
    {
      name: 'RapidRoof',
      comingSoon: false,
      instructions: [
        { title: 'LRS Reference', description: 'This is the unique number provided by your Technical Manager. Please enter it exactly as given.' },
        { title: 'Project Reference', description: 'This is the name of your project. It will be displayed in the generated PDF.' },
        { title: 'Date', description: 'Choose the current or intended date using the calendar selector.' },
        { title: 'Roof Size (m²)', description: 'Insert the total roof size. To add more than one value, separate them with commas (e.g., 120, 135). The system will automatically append “m²” to each value.' },
        { title: 'For the Attention Of', description: 'Enter the name of the person the document is addressed to.' },
        { title: 'Prepared By', description: 'By default, this is “Paul Jones”, but you may edit it if needed.' },
        { title: 'Guarantee', description: 'Choose between 10-Year or 20-Year warranty options.' },
        { title: 'Surface Type', description: 'Select the surface where the system will be applied (e.g., Timber, Felt, GRP, etc.).' },
        { title: 'Image Upload', description: 'Click the button labeled “Upload an image for Roof Specification”. This will open your device’s file explorer. Once you select an image, a preview will appear. If you wish to replace it, click the button again and choose a new file. The button will automatically update with the new image.' },
      ],
      pdfSteps: [
        'After filling in all required fields, click the “Generate PDF” button.',
        'Wait a few seconds while the document is being processed.',
        'Once ready, the “Download PDF” button will activate and change color.',
        'Click it to download the file directly to your device.',
      ],
    },
    { name: 'Fastcoat', comingSoon: true },
    { name: 'Elasto-Kote', comingSoon: true },
    { name: 'Karnak', comingSoon: true },
  ];
  
  const HelpPage = () => {
    const [selectedProduct, setSelectedProduct] = useState('RapidRoof');
    const [searchTerm, setSearchTerm] = useState('');
  
    const product = helpData.find((item) => item.name === selectedProduct);
  
    const filteredInstructions =
      product?.instructions?.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];
  
    return (
        <Box sx={{ backgroundColor: '#f3f5fb', minHeight: '100vh', pb: 8, pt: '80px' }}>
        {/* Header */}
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="bold" color="#003f7d" gutterBottom>
            Instructions for generating the Installation Specification document
          </Typography>
          <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2 }}>
            <TextField
              fullWidth
              placeholder="Search for help with a form section or step in the process"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: '#005BAC' }} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: '#fff',
                  borderRadius: 2,
                  border: '1px solid #ccc',
                  '&:hover': { borderColor: '#005BAC' },
                },
              }}
            />
          </Box>
        </Box>
      
        {/* Product Cards */}
        <Container maxWidth="md">
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            {helpData.map((item) => (
              <Grid item xs={6} sm={3} key={item.name}>
                <Card
                  sx={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    height: '100%',
                    border: selectedProduct === item.name
                      ? '2px solid #005BAC'
                      : '1px solid #e0e0e0',
                    backgroundColor: '#fff',
                    boxShadow: selectedProduct === item.name ? '0px 2px 10px rgba(0,91,172,0.15)' : 'none',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: '#005BAC',
                      boxShadow: '0px 2px 10px rgba(0,91,172,0.15)',
                    },
                  }}
                  onClick={() => setSelectedProduct(item.name)}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: '#005BAC' }}
                    >
                      {item.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
      
          {/* Help Content */}
          <Collapse in={!product?.comingSoon}>
            <Box>
              {filteredInstructions.map((item, index) => (
                <Card
                  key={index}
                  sx={{
                    mb: 2,
                    backgroundColor: '#fff',
                    borderLeft: '4px solid #005BAC',
                    boxShadow: '0px 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
      
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ color: '#003f7d' }} gutterBottom>
                  Generating and Downloading the PDF
                </Typography>
                {product?.pdfSteps?.map((step, i) => (
                  <Card
                    key={i}
                    sx={{
                      mb: 1,
                      backgroundColor: '#fff',
                      borderLeft: '4px solid #005BAC',
                      boxShadow: '0px 1px 4px rgba(0,0,0,0.05)',
                    }}
                  >
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">{step}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
      
              <Typography variant="body2" sx={{ mt: 3, color: '#333' }}>
                If you need further assistance, contact our office at{' '}
                <strong style={{ color: '#005BAC' }}>01948 841877</strong>.
              </Typography>
            </Box>
          </Collapse>
      
          {/* Coming Soon */}
          {product?.comingSoon && (
            <Box sx={{ textAlign: 'center', mt: 6 }}>
              <Typography variant="body1" fontStyle="italic" color="text.secondary">
                This guide is coming soon.
              </Typography>
            </Box>
          )}
        </Container>
      </Box>      
    );
  };
  
  export default HelpPage;
  