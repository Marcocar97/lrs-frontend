import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "../components/PdfDocument";

const RapidRoof = () => {
  const [formData, setFormData] = useState({
    lrsReference: "",
    reference: "",
    date: "",
    roofSize: "",
    attention: "",
    preparedBy: "Paul Jones",
    guarantee: "10-year",
    surface: "Timber",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 11, p: 4, borderRadius: 3 }}>
        <Box
          sx={{
            backgroundColor: "#f7931e",
            height: 60,
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            mt: -4,
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6" color="white" fontWeight="bold">
            LRS Project Tool
          </Typography>
        </Box>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Welcome to the Project Generator
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Fill in the information to create your specification
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>

        <TextField
  fullWidth
  margin="normal"
  label="LRS Reference"
  name="lrsReference"
  onChange={handleChange}
/>

          <TextField
            fullWidth
            margin="normal"
            label="Project reference"
            name="reference"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Date"
            type="date"
            name="date"
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
         <TextField
  fullWidth
  margin="normal"
  label="Roof size (m²)"
  name="roofSize"
  onChange={(e) =>
    setFormData({ ...formData, roofSize: e.target.value + " m²" })
  }
/>

          <TextField
            fullWidth
            margin="normal"
            label="For the attention of"
            name="attention"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Prepared by"
            name="preparedBy"
            value={formData.preparedBy}
            onChange={handleChange}
          />
          <TextField
            select
            fullWidth
            margin="normal"
            label="Guarantee"
            name="guarantee"
            value={formData.guarantee}
            onChange={handleChange}
          >
            <MenuItem value="10-year">10-Year Guarantee</MenuItem>
            <MenuItem value="20-year">20-Year Guarantee</MenuItem>
          </TextField>
          <TextField
  select
  fullWidth
  margin="normal"
  label="Surface Type"
  name="surface"
  value={formData.surface}
  onChange={handleChange}
>
  <MenuItem value="Asbestos">Asbestos</MenuItem>
  <MenuItem value="Concrete">Concrete</MenuItem>
  <MenuItem value="Existing Coatings">Existing Coatings</MenuItem>
  <MenuItem value="Single-Ply">Single-Ply</MenuItem>
  <MenuItem value="VCL">VCL</MenuItem>
  <MenuItem value="Asphalt">Asphalt</MenuItem>
  <MenuItem value="Felt">Felt</MenuItem>
  <MenuItem value="GRP">GRP</MenuItem>
  <MenuItem value="Metal">Metal</MenuItem>
  <MenuItem value="Timber">Timber</MenuItem>
</TextField>

<TextField
  fullWidth
  margin="normal"
  type="file"
  inputProps={{ accept: "image/*" }}
  onChange={(e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result, // base64
        }));
      };
      reader.readAsDataURL(file);
    }
  }}
/>



          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#231f20",
              color: "white",
              "&:hover": {
                backgroundColor: "#4a4a4a",
              },
            }}
            onClick={handleSubmit}
          >
            Generate PDF
          </Button>

          {submitted && (
            <Box sx={{ mt: 3 }}>
              <PDFDownloadLink
                document={<PdfDocument {...formData} />}
                fileName={`${formData.reference || "project"}-specification.pdf`}
                style={{
                  textDecoration: "none",
                  color: "white",
                }}
              >
                {({ loading }) => (
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{
                      mt: 2,
                      backgroundColor: "#0072ce",
                      "&:hover": {
                        backgroundColor: "#005bb5",
                      },
                    }}
                  >
                    {loading ? "Generating PDF..." : "Download PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default RapidRoof;
