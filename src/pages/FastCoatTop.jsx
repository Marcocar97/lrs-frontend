import React, { useState, useEffect} from "react";
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
import PdfDocument from "../components/PdfDocumentFastCoatTop";
import { pdf } from '@react-pdf/renderer';
import {
  PDFDocument as PDFLibDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

const addPhysicalPageNumbers = async (sourceBlob) => {
  const sourceBytes = await sourceBlob.arrayBuffer();
  const pdfDocument = await PDFLibDocument.load(sourceBytes);
  const font = await pdfDocument.embedFont(StandardFonts.HelveticaBold);
  const pages = pdfDocument.getPages();
  const fontSize = 8.5;

  pages.forEach((page, index) => {
    const label = `Page ${index + 1} of ${pages.length}`;
    const labelWidth = font.widthOfTextAtSize(label, fontSize);

    page.drawText(label, {
      x: (page.getWidth() - labelWidth) / 2,
      y: 30,
      size: fontSize,
      font,
      color: rgb(0.27, 0.27, 0.27),
    });
  });

  const numberedBytes = await pdfDocument.save();
  return new Blob([numberedBytes], { type: "application/pdf" });
};



const FastCoatTop = () => {
  const [formData, setFormData] = useState({
    lrsReference: "",
    reference: "",
    date: "",
    roofSize: "",
    attention: "",
    preparedBy: "Paul Jones",
    guarantee: "25-year",
    surface: "Timber",
    image: null,
    antiSkid: "",
    photos: [],
    roofBuildUp: "",

  });


  const [submitted, setSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const requiredFields = [
      "reference",
      "date",
      "attention",
      "preparedBy",
      "guarantee",
      "surface"
    ];
    return requiredFields.every((field) => formData[field]?.trim());
  };
  
// handleSubmit: genera + sube PDF y luego envía la notificación al portal
const handleSubmit = async () => {
  if (isGenerating) return;

  setSubmitted(false);
  if (!validateForm()) return;

  setIsGenerating(true);

  try {
    const { emailOk, blob } = await uploadPdfToBackend();
    if (!emailOk) throw new Error("Email notification failed");

    console.log("✅ Notificación enviada");
    setDownloadUrl(URL.createObjectURL(blob));
    setSubmitted(true);
  } catch (err) {
    console.error("❌ Error en envío:", err);
    alert("Hubo un problema al generar/subir el PDF o enviar la notificación.");
  } finally {
    setIsGenerating(false);
  }
};



// Enviar NOTIFICACIÓN por EmailJS
// Enviar NOTIFICACIÓN por EmailJS
const sendEmail = async () => {
  try {
    const payload = {
      service_id: "service_8qd27im",
      template_id: "template_mp9prl8",
      user_id: "q8SYdWtSShPPbGI8c",
      template_params: {
        // Campo genérico para tu plantilla de EmailJS (ajusta la variable en EmailJS a {{notice}}).
        notice: "A new Fastcoat specification PDF was generated."
      },
    };

    console.log("[sendEmail] payload:", payload);

    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    console.log("[sendEmail] status/text:", res.status, text);
    if (!res.ok) throw new Error(text);
    return true;
  } catch (err) {
    console.error("❌ [sendEmail] error:", err);
    return false;
  }
};


// SUBE el PDF y luego ENVÍA el email
const uploadPdfToBackend = async () => {
  console.log("⏳ [pdf] Generando PDF...");

  const renderedBlob = await pdf(<PdfDocument {...formData} />).toBlob();
  const blob = await addPhysicalPageNumbers(renderedBlob);
  console.log(`✅ [pdf] PDF generado (${Math.round(blob.size / 1024)} KB)`);

  const filename = `${formData.reference || "project"}.pdf`;
  const file = new File([blob], filename, { type: "application/pdf" });

  const formDataUpload = new FormData();
  formDataUpload.append("file", file);

  console.log("⏳ [upload] Subiendo PDF al backend...");
  const response = await fetch("https://api.liquidwaterproofingacademy.com/api/upload", {
    method: "POST",
    body: formDataUpload,
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Upload failed (${response.status}): ${text || "No body"}`);
  }

  console.log("✅ [upload] Archivo subido correctamente");

  // Enviar email de notificación
console.log("👉 [upload] Enviando notificación por email...");
const emailOk = await sendEmail(); // <- sin argumentos
console.log("📧 [upload] Resultado notificación:", emailOk);

  return { emailOk, blob };
};


  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.name) {
      setFormData((prev) => ({
        ...prev,
        preparedBy: user.name,
      }));
    }
  }, []);

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);



  return (
    <Container disableGutters sx={{ width: '100%', px: { xs: 2, sm: 4 } }}>
    <Paper elevation={3} sx={{ mt: 8, p: { xs: 3, sm: 5 }, borderRadius: 3, width: '100%' }}>
      <Box sx={{ width: '100%' }}>
  


        {/* Encabezado visual */}
        <Box
          sx={{
            backgroundColor: "#289838",
            height: 60,
            borderRadius: 2,
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" color="white" fontWeight="bold">
            FastCoat
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
      required
      error={submitted && !formData.lrsReference}
      helperText={submitted && !formData.lrsReference ? "This field is required" : ""}
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
  inputProps={{ min: new Date().toISOString().split("T")[0] }}
  size="small"
  margin="normal"
  required
  error={submitted && !formData.date}
  helperText={submitted && !formData.date ? "This field is required" : ""}
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
      required
      error={submitted && !formData.lrsReference}
      helperText={submitted && !formData.lrsReference ? "This field is required" : ""}
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
  required
  disabled
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
      required
      error={submitted && !formData.lrsReference}
      helperText={submitted && !formData.lrsReference ? "This field is required" : ""}
    >
      <MenuItem value="20-year">20-Year Guarantee</MenuItem>
      <MenuItem value="25-year">25-Year Guarantee</MenuItem>
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
      required
      error={submitted && !formData.lrsReference}
      helperText={submitted && !formData.lrsReference ? "This field is required" : ""}
    >
      {[
        "Fibre Cement", "Concrete", "Existing Coatings", "Single-Ply", "VCL",
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

{/* Fila: Roof Type y U Value (incluso si no aplica, se mantiene el espacio para no romper el layout) */}
<Grid container spacing={2} sx={{ mb: 1 }}>
  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      select
      label="Roof Type"
      name="roofType"
      value={formData.roofType || ""}
      onChange={(e) => {
        const value = e.target.value;
        setFormData({
          ...formData,
          roofType: value,
          uValue: value === "Warm Roof" ? formData.uValue : "", // limpiar si no aplica
        });
      }}
      size="small"
      margin="normal"
      required
      error={submitted && !formData.lrsReference}
      helperText={submitted && !formData.lrsReference ? "This field is required" : ""}
    >
      {["Existing Overlay", "Warm Roof", "Inverted Roof"].map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      select
      label="U Value Needed"
      name="uValue"
      value={formData.uValue || ""}
      onChange={(e) =>
        setFormData({ ...formData, uValue: e.target.value })
      }
      size="small"
      margin="normal"
      disabled={formData.roofType !== "Warm Roof"}
    >
      {[
        "0.11W/m²K",
        "0.15Wm²K",
        "0.16W/m²K",
        "0.18W/m²K",
      ].map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  </Grid>
</Grid>

{/* Campo: Roof Build Up (texto libre) */}
<Grid container spacing={2} sx={{ mb: 1 }}>
  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      label="Roof Build Up"
      name="roofBuildUp"
      value={formData.roofBuildUp || ""}
      onChange={handleChange}
      multiline
      minRows={3}
      size="small"
      margin="normal"
    />
  </Grid>
</Grid>


{/* Fila: Outlets y Skylights */}
<Grid container spacing={2} sx={{ mb: 1 }}>
  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      select
      label="Outlets"
      name="outlets"
      value={formData.outlets || ""}
      onChange={handleChange}
      size="small"
      margin="normal"
      required
      error={submitted && !formData.lrsReference}
      helperText={submitted && !formData.lrsReference ? "This field is required" : ""}
    >
      {["TBC", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map(
        (option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        )
      )}
    </TextField>
  </Grid>

  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      select
      label="Skylights"
      name="skylights"
      value={formData.skylights || ""}
      onChange={handleChange}
      size="small"
      margin="normal"
      required
      error={submitted && !formData.lrsReference}
      helperText={submitted && !formData.lrsReference ? "This field is required" : ""}
    >
      {["TBC", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map(
        (option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        )
      )}
    </TextField>
  </Grid>
</Grid>

{/* Fila: AC Units y Existing Coatings */}
<Grid container spacing={2} sx={{ mb: 1 }}>
  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      select
      label="AC Units"
      name="acUnits"
      value={formData.acUnits || ""}
      onChange={handleChange}
      size="small"
      margin="normal"
      required
      error={submitted && !formData.lrsReference}
      helperText={submitted && !formData.lrsReference ? "This field is required" : ""}
    >
      {["TBC", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"].map(
        (option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        )
      )}
    </TextField>
  </Grid>

  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      select
      label="Existing Coatings"
      name="existingCoatings"
      value={formData.existingCoatings || ""}
      onChange={handleChange}
      size="small"
      margin="normal"
      required
      error={submitted && !formData.lrsReference}
      helperText={submitted && !formData.lrsReference ? "This field is required" : ""}
    >
      {["Yes", "No"].map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  </Grid>
</Grid>

{/* Fila: Ponding Water */}
<Grid container spacing={2} sx={{ mb: 1 }}>
  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      select
      label="Ponding Water"
      name="pondingWater"
      value={formData.pondingWater || ""}
      onChange={handleChange}
      size="small"
      margin="normal"
      required
      error={submitted && !formData.lrsReference}
      helperText={submitted && !formData.lrsReference ? "This field is required" : ""}
    >
      {["Yes", "No"].map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  </Grid>
</Grid>

{/* Fila: Anti-Skid Required */}
<Grid container spacing={2} sx={{ mb: 1 }}>
  <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
    <TextField
      fullWidth
      select
      label="Traffic Coat"
      name="antiSkid"
      value={formData.antiSkid || ""}
      onChange={handleChange}
      size="small"
      margin="normal"
      required
      error={submitted && !formData.lrsReference}
      helperText={submitted && !formData.lrsReference ? "This field is required" : ""}
    >
      {["Yes", "No"].map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  </Grid>
</Grid>

{/* Subida de fotografías adicionales (máx. 4) */}
<Grid container sx={{ mt: 2 }}>
  <Grid item xs={12}>
    <Button component="label" fullWidth variant="outlined">
      Add Photographs (Max 4)
      <input
        type="file"
        hidden
        accept="image/*"
        multiple
        onChange={(e) => {
          const newFiles = Array.from(e.target.files);
          const existing = formData.photos || [];

          const readers = newFiles.map(
            (file) =>
              new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
              })
          );

          Promise.all(readers).then((newImages) => {
            const combined = [...existing, ...newImages].slice(0, 4);
            setFormData((prev) => ({ ...prev, photos: combined }));
          });
        }}
      />
    </Button>

    {formData.photos?.length > 0 && (
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {formData.photos.map((img, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx} sx={{ position: "relative" }}>
            <Box
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                overflow: "hidden",
                height: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <img
                src={img}
                alt={`Photo ${idx + 1}`}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
              />
              <Button
                size="small"
                sx={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  minWidth: "24px",
                  padding: 0,
                  fontSize: "1rem",
                  lineHeight: 1,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                  width: 28,
                  height: 28,
                  minHeight: 0,
                }}
                onClick={() => {
                  const updated = formData.photos.filter((_, i) => i !== idx);
                  setFormData((prev) => ({ ...prev, photos: updated }));
                }}
              >
                ×
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    )}
  </Grid>
</Grid>





          {/* Botón generar PDF */}
          <Button
            type="button"
            fullWidth
            variant="contained"
            disabled={isGenerating}
            sx={{
              mt: 2,
              backgroundColor: "#231f20",
              "&:hover": { backgroundColor: "#4a4a4a" },
            }}
            onClick={(e) => {
              e.preventDefault(); // <- esto evita que el form se envíe/reinicie
              handleSubmit();
            }}
          >
            {isGenerating ? "Generating PDF..." : "Generate PDF"}
          </Button>

          {/* Botón descargar PDF */}
          {submitted && downloadUrl && (
            <Box sx={{ mt: 2 }}>
              <Button
                component="a"
                href={downloadUrl}
                download={`${formData.reference || "project"}-specification.pdf`}
                variant="contained"
                fullWidth
                sx={{
                  mt: 2,
                  backgroundColor: "#0072ce",
                  "&:hover": { backgroundColor: "#005bb5" },
                }}
              >
                Download PDF
              </Button>
            </Box>
          )}
        </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default FastCoatTop;