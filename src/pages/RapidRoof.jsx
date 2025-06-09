import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Paper,
  Grid,
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
    image: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleDownload = () => {
    // Esperar un poco para que el PDF comience a generarse
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  

  return (
    <Container disableGutters sx={{ width: '100%', px: { xs: 2, sm: 4 } }}>
    <Paper elevation={3} sx={{ mt: 8, p: { xs: 3, sm: 5 }, borderRadius: 3, width: '100%' }}>
      <Box sx={{ width: '100%' }}>
  


        {/* Encabezado visual */}
        <Box
          sx={{
            backgroundColor: "#ef4136",
            height: 60,
            borderRadius: 2,
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" color="white" fontWeight="bold">
            RapidRoof
          </Typography>
        </Box>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Installation Specification Generator
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Fill in the information below to generate your PDF.
        </Typography>

        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>

{/* Fila 1 */}
<Grid container spacing={2} sx={{ mb: 1 }}>
<Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      label="LRS Reference"
      name="lrsReference"
      value={formData.lrsReference}
      onChange={handleChange}
      size="small"
      margin="normal"
    />
  </Grid>
  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      label="Project Reference"
      name="reference"
      value={formData.reference}
      onChange={handleChange}
      size="small"
      margin="normal"
    />
  </Grid>
</Grid>

{/* Fila 2 */}
<Grid container spacing={2} sx={{ mb: 1 }}>
<Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      label="Date"
      type="date"
      name="date"
      value={formData.date}
      onChange={handleChange}
      InputLabelProps={{ shrink: true }}
      size="small"
      margin="normal"
    />
  </Grid>
  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
  <TextField
  fullWidth
  label="Roof size (m²)"
  name="roofSize"
  value={formData.roofSize}
  onChange={(e) => {
    // Solo guarda el texto crudo mientras se escribe
    setFormData({ ...formData, roofSize: e.target.value });
  }}
  onBlur={(e) => {
    const raw = e.target.value;

    const formatted = raw
      .replace(/m²/g, "") // elimina cualquier "m²" previo
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
      .map((num) => `${num} m²`)
      .join(", ");

    setFormData({ ...formData, roofSize: formatted });
  }}
  size="small"
  margin="normal"
/>


  </Grid>
</Grid>

{/* Fila 3 */}
<Grid container spacing={2} sx={{ mb: 1 }}>
<Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      label="For the attention of"
      name="attention"
      value={formData.attention}
      onChange={handleChange}
      size="small"
      margin="normal"
    />
  </Grid>
  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      label="Prepared by"
      name="preparedBy"
      value={formData.preparedBy}
      onChange={handleChange}
      size="small"
      margin="normal"
    />
  </Grid>
</Grid>

{/* Fila 4 */}
<Grid container spacing={2} sx={{ mb: 1 }}>
<Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      select
      label="Guarantee"
      name="guarantee"
      value={formData.guarantee}
      onChange={handleChange}
      size="small"
      margin="normal"
    >
      <MenuItem value="10-year">10-Year Guarantee</MenuItem>
      <MenuItem value="20-year">20-Year Guarantee</MenuItem>
    </TextField>
  </Grid>
  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      select
      label="Surface Type"
      name="surface"
      value={formData.surface}
      onChange={handleChange}
      size="small"
      margin="normal"
    >
      {[
        "Asbestos", "Concrete", "Existing Coatings", "Single-Ply", "VCL",
        "Asphalt", "Felt", "GRP", "Metal", "Timber"
      ].map((s) => (
        <MenuItem key={s} value={s}>{s}</MenuItem>
      ))}
    </TextField>
  </Grid>
</Grid>


{/* Subida de imagen (ocupa toda la fila) */}
<Grid container sx={{ mt: 1 }}>
  <Grid item xs={12}>
    <Button component="label" fullWidth variant="outlined">
      Upload an image for Roof Specification
      <input
        type="file"
        hidden
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setFormData((prev) => ({
                ...prev,
                image: reader.result,
              }));
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </Button>

    {formData.image && (
      <Box
        sx={{
          mt: 2,
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <img
          src={formData.image}
          alt="Preview"
          style={{ maxWidth: "100%", maxHeight: 240, objectFit: "contain" }}
        />
      </Box>
    )}
  </Grid>
</Grid>


          {/* Botón generar PDF */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#231f20",
              "&:hover": { backgroundColor: "#4a4a4a" },
            }}
            onClick={handleSubmit}
          >
            Generate PDF
          </Button>

          {/* Botón descargar PDF */}
          {submitted && (
            <Box sx={{ mt: 2 }}>
              <PDFDownloadLink
                document={<PdfDocument {...formData} />}
                fileName={`${formData.reference || "project"}-specification.pdf`}
                style={{ textDecoration: "none" }}
              >
                {({ loading }) => (
                 <Button
                 variant="contained"
                 fullWidth
                 disabled={loading}
                 onClick={handleDownload}
                 sx={{
                   mt: 2,
                   backgroundColor: "#0072ce",
                   "&:hover": { backgroundColor: "#005bb5" },
                 }}
               >
                 {loading ? "Generating PDF..." : "Download PDF"}
               </Button>
               
                )}
              </PDFDownloadLink>
            </Box>
          )}
        </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RapidRoof;
