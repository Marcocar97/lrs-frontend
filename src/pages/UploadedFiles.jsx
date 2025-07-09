import React, { useEffect, useState } from "react";
import { Box, Typography, Link, CircularProgress } from "@mui/material";

const UploadedFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.liquidwaterproofingacademy.com/api/list")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching files:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        📂 Archivos PDF Generados
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : files.length === 0 ? (
        <Typography>No hay archivos disponibles.</Typography>
      ) : (
        files.map((url, i) => (
          <Box key={i} sx={{ my: 1 }}>
            <Link href={url} target="_blank" rel="noopener">
              {url.split("/").pop()}
            </Link>
          </Box>
        ))
      )}
    </Box>
  );
};

export default UploadedFiles;
