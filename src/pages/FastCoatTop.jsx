import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import PdfDocumentFasCoatTop from "../components/PdfDocumentFasCoatTop";
import { FULLY_PRIMED_SURFACES } from "../components/fastCoatTopContent";

const SURFACES = [
  "Fibre Cement",
  "Concrete",
  "Existing Coatings",
  "Single-Ply",
  "VCL",
  "Asphalt",
  "Felt",
  "GRP",
  "Metal",
  "Timber",
];

const COUNTS = ["TBC", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10+"];

const INITIAL_FORM_DATA = {
  lrsReference: "",
  reference: "",
  date: "",
  roofSize: "",
  attention: "",
  preparedBy: "Paul Jones",
  preparedByRole: "Technical Manager",
  preparedByPhone: "T: 01948 841 877",
  preparedByEmail: "E: paul.jones@lrs-systems.co.uk",
  guarantee: "20-year",
  surface: "Timber",
  image: null,
  photos: [],
  roofType: "Existing Overlay",
  uValue: "",
  roofBuildUp: "",
  outlets: "TBC",
  skylights: "TBC",
  acUnits: "TBC",
  existingCoatings: "No",
  pondingWater: "No",
  trafficCoat: "No",
};

const REQUIRED_FIELDS = [
  "reference",
  "date",
  "attention",
  "preparedBy",
  "guarantee",
  "surface",
  "roofType",
  "outlets",
  "skylights",
  "acUnits",
  "existingCoatings",
  "pondingWater",
  "trafficCoat",
];

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const FastCoatTop = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [attempted, setAttempted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  const isFullyPrimed = useMemo(
    () => FULLY_PRIMED_SURFACES.includes(formData.surface),
    [formData.surface],
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user) return;
    setFormData((current) => ({
      ...current,
      preparedBy: user.name || current.preparedBy,
      preparedByRole: user.role || current.preparedByRole,
      preparedByPhone: user.phone || current.preparedByPhone,
      preparedByEmail: user.email
        ? user.email.startsWith("E:")
          ? user.email
          : "E: " + user.email
        : current.preparedByEmail,
    }));
  }, []);

  const setField = (name, value) => {
    setReady(false);
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const fieldError = (name) =>
    attempted && REQUIRED_FIELDS.includes(name) && !String(formData[name] || "").trim();

  const validate = () =>
    REQUIRED_FIELDS.every((name) => String(formData[name] || "").trim());
/*
  const sendNotification = async () => {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: "service_8qd27im",
        template_id: "template_mp9prl8",
        user_id: "q8SYdWtSShPPbGI8c",
        template_params: {
          notice: "A new FastCoat TopCoat specification PDF was generated.",
        },
      }),
    });
    if (!response.ok) {
      throw new Error("Email notification failed");
    }
  };

  */

  const uploadPdf = async () => {
    const blob = await pdf(<PdfDocumentFasCoatTop {...formData} />).toBlob();
    const filename = (formData.reference || "FastCoat-TopCoat") + ".pdf";
    const uploadData = new FormData();
    uploadData.append("file", new File([blob], filename, { type: "application/pdf" }));

    const response = await fetch(
      "https://api.liquidwaterproofingacademy.com/api/upload",
      { method: "POST", body: uploadData },
    );
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error("Upload failed (" + response.status + "): " + body);
    }
  };

  const handleSubmit = async () => {
    setAttempted(true);
    setReady(false);
    if (!validate()) return;

    setBusy(true);
    try {
      await uploadPdf();
      await sendNotification();
      setReady(true);
    } catch (error) {
      console.error("FastCoat TopCoat PDF generation failed:", error);
      alert("There was a problem generating, uploading, or notifying the new PDF.");
    } finally {
      setBusy(false);
    }
  };

  const handleRoofImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setField("image", await readFileAsDataUrl(file));
  };

  const handlePhotos = async (event) => {
    const selected = Array.from(event.target.files || []).slice(0, 4);
    const photos = await Promise.all(selected.map(readFileAsDataUrl));
    setField("photos", photos);
  };

  const formatRoofSize = () => {
    const formatted = formData.roofSize
      .replace(/m²/g, "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => value + " m²")
      .join(", ");
    setField("roofSize", formatted);
  };

  return (
    <Container disableGutters sx={{ width: "100%", px: { xs: 2, sm: 4 } }}>
      <Paper
        elevation={3}
        sx={{ mt: 8, mb: 5, p: { xs: 3, sm: 5 }, borderRadius: 3, width: "100%" }}
      >
        <Box
          sx={{
            backgroundColor: "#289838",
            minHeight: 60,
            borderRadius: 2,
            mb: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" color="white" fontWeight="bold">
            FastCoat TopCoat
          </Typography>
        </Box>

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Installation Specification Generator
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Fill in the information below to generate your PDF.
        </Typography>

        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="LRS Reference"
                value={formData.lrsReference}
                onChange={(event) => setField("lrsReference", event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                required
                size="small"
                margin="normal"
                label="Project Reference"
                value={formData.reference}
                onChange={(event) => setField("reference", event.target.value)}
                error={fieldError("reference")}
                helperText={fieldError("reference") ? "This field is required" : ""}
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                required
                size="small"
                margin="normal"
                label="Date"
                type="date"
                value={formData.date}
                onChange={(event) => setField("date", event.target.value)}
                InputLabelProps={{ shrink: true }}
                error={fieldError("date")}
                helperText={fieldError("date") ? "This field is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                size="small"
                margin="normal"
                label="Roof size (m²)"
                value={formData.roofSize}
                onChange={(event) => setField("roofSize", event.target.value)}
                onBlur={formatRoofSize}
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                required
                size="small"
                margin="normal"
                label="For the attention of"
                value={formData.attention}
                onChange={(event) => setField("attention", event.target.value)}
                error={fieldError("attention")}
                helperText={fieldError("attention") ? "This field is required" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                disabled
                required
                size="small"
                margin="normal"
                label="Prepared by"
                value={formData.preparedBy}
              />
            </Grid>

            <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                select
                required
                size="small"
                margin="normal"
                label="Guarantee"
                value={formData.guarantee}
                onChange={(event) => setField("guarantee", event.target.value)}
              >
                <MenuItem value="20-year">20-Year Guarantee</MenuItem>
                <MenuItem value="25-year">25-Year Guarantee</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                select
                required
                size="small"
                margin="normal"
                label="Surface Type"
                value={formData.surface}
                onChange={(event) => setField("surface", event.target.value)}
              >
                {SURFACES.map((surface) => (
                  <MenuItem key={surface} value={surface}>
                    {surface}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Paper
                variant="outlined"
                sx={{
                  p: 1.5,
                  color: isFullyPrimed ? "#1b5e20" : "#555555",
                  backgroundColor: isFullyPrimed ? "#f1f8e9" : "#fafafa",
                }}
              >
                <Typography variant="body2">
                  {isFullyPrimed
                    ? "Fully primed surface: the MS 2-Part Primer specification will be included."
                    : "Non-fully-primed surface: the MS 2-Part Primer specification will not be included."}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <TextField
                fullWidth
                select
                required
                size="small"
                margin="normal"
                label="Roof Type"
                value={formData.roofType}
                onChange={(event) => {
                  const roofType = event.target.value;
                  setFormData((current) => ({
                    ...current,
                    roofType,
                    uValue: roofType === "Warm Roof" ? current.uValue : "",
                  }));
                  setReady(false);
                }}
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
                size="small"
                margin="normal"
                label="U Value Needed"
                disabled={formData.roofType !== "Warm Roof"}
                value={formData.uValue}
                onChange={(event) => setField("uValue", event.target.value)}
              >
                {["0.11W/m²K", "0.15Wm²K", "0.16W/m²K", "0.18W/m²K"].map(
                  (option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ),
                )}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={3}
                size="small"
                margin="normal"
                label="Roof Build Up"
                value={formData.roofBuildUp}
                onChange={(event) => setField("roofBuildUp", event.target.value)}
              />
            </Grid>

            {[
              ["Outlets", "outlets"],
              ["Skylights", "skylights"],
              ["AC Units", "acUnits"],
            ].map(([label, name]) => (
              <Grid key={name} item xs={12} sm={4} sx={{ flexGrow: 1 }}>
                <TextField
                  fullWidth
                  select
                  required
                  size="small"
                  margin="normal"
                  label={label}
                  value={formData[name]}
                  onChange={(event) => setField(name, event.target.value)}
                >
                  {COUNTS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ))}

            {[
              ["Existing Coatings", "existingCoatings"],
              ["Ponding Water", "pondingWater"],
              ["Traffic Coat", "trafficCoat"],
            ].map(([label, name]) => (
              <Grid key={name} item xs={12} sm={4} sx={{ flexGrow: 1 }}>
                <TextField
                  fullWidth
                  select
                  required
                  size="small"
                  margin="normal"
                  label={label}
                  value={formData[name]}
                  onChange={(event) => setField(name, event.target.value)}
                >
                  {["Yes", "No"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ))}

            <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <Button component="label" fullWidth variant="outlined" sx={{ mt: 2 }}>
                Upload Roof Specification Image
                <input type="file" hidden accept="image/*" onChange={handleRoofImage} />
              </Button>
              {formData.image ? (
                <Box
                  component="img"
                  src={formData.image}
                  alt="Roof specification preview"
                  sx={{ mt: 1.5, width: "100%", maxHeight: 220, objectFit: "contain" }}
                />
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6} sx={{ flexGrow: 1 }}>
              <Button component="label" fullWidth variant="outlined" sx={{ mt: 2 }}>
                Upload Photographs (maximum 4)
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handlePhotos}
                />
              </Button>
              {formData.photos.length ? (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                  {formData.photos.length} photograph(s) selected
                </Typography>
              ) : null}
            </Grid>
          </Grid>

          <Button
            fullWidth
            variant="contained"
            disabled={busy}
            onClick={handleSubmit}
            sx={{
              mt: 4,
              py: 1.4,
              backgroundColor: "#289838",
              "&:hover": { backgroundColor: "#1f7a2d" },
            }}
          >
            {busy ? "Generating PDF..." : "Generate and Send PDF"}
          </Button>

          {ready ? (
            <Box sx={{ mt: 2 }}>
              <PDFDownloadLink
                document={<PdfDocumentFasCoatTop {...formData} />}
                fileName={(formData.reference || "FastCoat-TopCoat") + ".pdf"}
                style={{ textDecoration: "none" }}
              >
                {({ loading }) => (
                  <Button fullWidth variant="outlined" color="success" disabled={loading}>
                    {loading ? "Preparing download..." : "Download PDF"}
                  </Button>
                )}
              </PDFDownloadLink>
            </Box>
          ) : null}
        </Box>
      </Paper>
    </Container>
  );
};

export default FastCoatTop;
