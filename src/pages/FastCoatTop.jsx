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
import PdfDocumentFastCoatTop from "../components/PdfDocumentFastCoatTop";
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

const COUNTS = [
  "TBC",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10+",
];

const YES_NO_OPTIONS = ["Yes", "No"];

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
    attempted &&
    REQUIRED_FIELDS.includes(name) &&
    !String(formData[name] || "").trim();

  const errorText = (name) =>
    fieldError(name) ? "This field is required" : "";

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
    const blob = await pdf(
      <PdfDocumentFastCoatTop {...formData} />,
    ).toBlob();
    const filename = (formData.reference || "FastCoat-TopCoat") + ".pdf";
    const uploadData = new FormData();

    uploadData.append(
      "file",
      new File([blob], filename, { type: "application/pdf" }),
    );

    const response = await fetch(
      "https://api.liquidwaterproofingacademy.com/api/upload",
      { method: "POST", body: uploadData },
    );

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      throw new Error("Upload failed (" + response.status + "): " + body);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAttempted(true);
    setReady(false);

    if (!validate()) return;

    setBusy(true);

    try {
      await uploadPdf();

      /*
      await sendNotification();
      */

      setReady(true);
    } catch (error) {
      console.error("FastCoat TopCoat PDF generation failed:", error);
      alert("There was a problem generating or uploading the new PDF.");
    } finally {
      setBusy(false);
    }
  };

  const handleRoofImage = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setField("image", await readFileAsDataUrl(file));
    event.target.value = "";
  };

  const handlePhotos = async (event) => {
    const selected = Array.from(event.target.files || []);
    if (!selected.length) return;

    const newPhotos = await Promise.all(selected.map(readFileAsDataUrl));
    setReady(false);
    setFormData((current) => ({
      ...current,
      photos: [...current.photos, ...newPhotos].slice(0, 4),
    }));
    event.target.value = "";
  };

  const removePhoto = (indexToRemove) => {
    setReady(false);
    setFormData((current) => ({
      ...current,
      photos: current.photos.filter((_, index) => index !== indexToRemove),
    }));
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

  const changeRoofType = (event) => {
    const roofType = event.target.value;
    setReady(false);
    setFormData((current) => ({
      ...current,
      roofType,
      uValue: roofType === "Warm Roof" ? current.uValue : "",
    }));
  };

  return (
    <Container disableGutters sx={{ width: "100%", px: { xs: 2, sm: 4 } }}>
      <Paper
        elevation={3}
        sx={{
          mt: 8,
          mb: 5,
          p: { xs: 3, sm: 5 },
          borderRadius: 3,
          width: "100%",
        }}
      >
        <Box sx={{ width: "100%" }}>
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
              FastCoat TopCoat
            </Typography>
          </Box>

          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Installation Specification Generator
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Fill in the information below to generate your PDF.
          </Typography>

          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="LRS Reference"
                  value={formData.lrsReference}
                  onChange={(event) =>
                    setField("lrsReference", event.target.value)
                  }
                  size="small"
                  margin="normal"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Project Reference"
                  value={formData.reference}
                  onChange={(event) => setField("reference", event.target.value)}
                  size="small"
                  margin="normal"
                  error={fieldError("reference")}
                  helperText={errorText("reference")}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(event) => setField("date", event.target.value)}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  margin="normal"
                  error={fieldError("date")}
                  helperText={errorText("date")}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Roof size (m²)"
                  value={formData.roofSize}
                  onChange={(event) => setField("roofSize", event.target.value)}
                  onBlur={formatRoofSize}
                  size="small"
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  label="For the attention of"
                  value={formData.attention}
                  onChange={(event) => setField("attention", event.target.value)}
                  size="small"
                  margin="normal"
                  error={fieldError("attention")}
                  helperText={errorText("attention")}
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  required
                  disabled
                  label="Prepared by"
                  value={formData.preparedBy}
                  size="small"
                  margin="normal"
                  error={fieldError("preparedBy")}
                  helperText={errorText("preparedBy")}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  required
                  label="Guarantee"
                  value={formData.guarantee}
                  onChange={(event) => setField("guarantee", event.target.value)}
                  size="small"
                  margin="normal"
                  error={fieldError("guarantee")}
                  helperText={errorText("guarantee")}
                >
                  <MenuItem value="20-year">20-Year Guarantee</MenuItem>
                  <MenuItem value="25-year">25-Year Guarantee</MenuItem>
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  required
                  label="Surface Type"
                  value={formData.surface}
                  onChange={(event) => setField("surface", event.target.value)}
                  size="small"
                  margin="normal"
                  error={fieldError("surface")}
                  helperText={errorText("surface")}
                >
                  {SURFACES.map((surface) => (
                    <MenuItem key={surface} value={surface}>
                      {surface}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Paper
              variant="outlined"
              role="status"
              sx={{
                mt: 1,
                mb: 3,
                px: 2,
                py: 1.5,
                borderColor: isFullyPrimed ? "#81c784" : "#bdbdbd",
                borderLeft: "4px solid",
                borderLeftColor: isFullyPrimed ? "#289838" : "#757575",
                backgroundColor: isFullyPrimed ? "#f1f8e9" : "#fafafa",
                color: isFullyPrimed ? "#1b5e20" : "#555555",
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                {isFullyPrimed
                  ? "Fully primed surface: the MS 2-Part Primer specification will be included."
                  : "Non-fully-primed surface: the MS 2-Part Primer specification will not be included."}
              </Typography>
            </Paper>

            <Grid container sx={{ mb: 2 }}>
              <Grid size={12}>
                <Button component="label" fullWidth variant="outlined">
                  Upload an image for Roof Specification
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleRoofImage}
                  />
                </Button>

                {formData.image ? (
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      overflow: "hidden",
                      p: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={formData.image}
                      alt="Roof specification preview"
                      sx={{
                        maxWidth: "100%",
                        maxHeight: 240,
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                ) : null}
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  required
                  label="Roof Type"
                  value={formData.roofType}
                  onChange={changeRoofType}
                  size="small"
                  margin="normal"
                  error={fieldError("roofType")}
                  helperText={errorText("roofType")}
                >
                  {["Existing Overlay", "Warm Roof", "Inverted Roof"].map(
                    (option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ),
                  )}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  label="U Value Needed"
                  disabled={formData.roofType !== "Warm Roof"}
                  value={formData.uValue}
                  onChange={(event) => setField("uValue", event.target.value)}
                  size="small"
                  margin="normal"
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
            </Grid>

            <Grid container sx={{ mb: 1 }}>
              <Grid size={12}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Roof Build Up"
                  value={formData.roofBuildUp}
                  onChange={(event) => setField("roofBuildUp", event.target.value)}
                  size="small"
                  margin="normal"
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  required
                  label="Outlets"
                  value={formData.outlets}
                  onChange={(event) => setField("outlets", event.target.value)}
                  size="small"
                  margin="normal"
                  error={fieldError("outlets")}
                  helperText={errorText("outlets")}
                >
                  {COUNTS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  required
                  label="Skylights"
                  value={formData.skylights}
                  onChange={(event) => setField("skylights", event.target.value)}
                  size="small"
                  margin="normal"
                  error={fieldError("skylights")}
                  helperText={errorText("skylights")}
                >
                  {COUNTS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  required
                  label="AC Units"
                  value={formData.acUnits}
                  onChange={(event) => setField("acUnits", event.target.value)}
                  size="small"
                  margin="normal"
                  error={fieldError("acUnits")}
                  helperText={errorText("acUnits")}
                >
                  {COUNTS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  required
                  label="Existing Coatings"
                  value={formData.existingCoatings}
                  onChange={(event) =>
                    setField("existingCoatings", event.target.value)
                  }
                  size="small"
                  margin="normal"
                  error={fieldError("existingCoatings")}
                  helperText={errorText("existingCoatings")}
                >
                  {YES_NO_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mb: 1 }}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  required
                  label="Ponding Water"
                  value={formData.pondingWater}
                  onChange={(event) =>
                    setField("pondingWater", event.target.value)
                  }
                  size="small"
                  margin="normal"
                  error={fieldError("pondingWater")}
                  helperText={errorText("pondingWater")}
                >
                  {YES_NO_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  select
                  required
                  label="Traffic Coat"
                  value={formData.trafficCoat}
                  onChange={(event) => setField("trafficCoat", event.target.value)}
                  size="small"
                  margin="normal"
                  error={fieldError("trafficCoat")}
                  helperText={errorText("trafficCoat")}
                >
                  {YES_NO_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>

            <Grid container sx={{ mt: 2 }}>
              <Grid size={12}>
                <Button component="label" fullWidth variant="outlined">
                  Add Photographs (Max 4)
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handlePhotos}
                  />
                </Button>

                {formData.photos.length > 0 ? (
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    {formData.photos.map((photo, index) => (
                      <Grid
                        key={`${photo.slice(0, 32)}-${index}`}
                        size={{ xs: 12, sm: 6, md: 3 }}
                      >
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
                            p: 0.5,
                          }}
                        >
                          <Box
                            component="img"
                            src={photo}
                            alt={`Photograph ${index + 1}`}
                            sx={{
                              maxWidth: "100%",
                              maxHeight: "100%",
                              objectFit: "contain",
                            }}
                          />
                          <Button
                            type="button"
                            size="small"
                            aria-label={`Remove photograph ${index + 1}`}
                            onClick={() => removePhoto(index)}
                            sx={{
                              position: "absolute",
                              top: 4,
                              right: 4,
                              minWidth: 28,
                              width: 28,
                              height: 28,
                              p: 0,
                              fontSize: "1rem",
                              lineHeight: 1,
                              color: "#231f20",
                              backgroundColor: "#fff",
                              border: "1px solid #ccc",
                              borderRadius: "50%",
                              "&:hover": { backgroundColor: "#f5f5f5" },
                            }}
                          >
                            ×
                          </Button>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                ) : null}
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={busy}
              sx={{
                mt: 3,
                py: 1.2,
                backgroundColor: "#231f20",
                "&:hover": { backgroundColor: "#4a4a4a" },
              }}
            >
              {busy ? "Generating PDF..." : "Generate PDF"}
            </Button>

            {ready ? (
              <Box sx={{ mt: 2 }}>
                <PDFDownloadLink
                  document={<PdfDocumentFastCoatTop {...formData} />}
                  fileName={
                    (formData.reference || "FastCoat-TopCoat") +
                    "-specification.pdf"
                  }
                  style={{ textDecoration: "none" }}
                >
                  {({ loading }) => (
                    <Button
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      sx={{
                        backgroundColor: "#0072ce",
                        "&:hover": { backgroundColor: "#005bb5" },
                      }}
                    >
                      {loading ? "Preparing download..." : "Download PDF"}
                    </Button>
                  )}
                </PDFDownloadLink>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default FastCoatTop;