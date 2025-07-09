import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Paper,
  MenuItem,
  CircularProgress,
  Link,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const dateOptions = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "This Week", value: "thisWeek" },
  { label: "This Month", value: "thisMonth" },
  { label: "Last 30 Days", value: "last30Days" },
  { label: "All", value: "all" },
];

const UploadedFiles = () => {
  const [files, setFiles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filterDate, setFilterDate] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.liquidwaterproofingacademy.com/api/list")
      .then((res) => res.json())
      .then((data) => {
        const filesWithDates = data.files.map((url) => ({
          url,
          name: url.split("/").pop(),
          date: getDateFromFilename(url),
        }));
        setFiles(filesWithDates);
        setFiltered(filesWithDates);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching files:", err);
        setLoading(false);
      });
  }, []);

  const getDateFromFilename = (url) => {
    const filename = url.split("/").pop();
    const timestamp = parseInt(filename.split("-")[0]);
    return isNaN(timestamp) ? null : new Date(timestamp);
  };

  const filterFiles = () => {
    const now = new Date();
    let filteredList = files;

    if (search.trim()) {
      filteredList = filteredList.filter((file) =>
        file.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    switch (filterDate) {
      case "today":
        filteredList = filteredList.filter((f) => isSameDay(f.date, now));
        break;
      case "yesterday":
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        filteredList = filteredList.filter((f) => isSameDay(f.date, yesterday));
        break;
      case "thisWeek":
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        filteredList = filteredList.filter((f) => f.date >= weekStart);
        break;
      case "thisMonth":
        filteredList = filteredList.filter(
          (f) => f.date.getMonth() === now.getMonth() && f.date.getFullYear() === now.getFullYear()
        );
        break;
      case "last30Days":
        const last30 = new Date(now);
        last30.setDate(now.getDate() - 30);
        filteredList = filteredList.filter((f) => f.date >= last30);
        break;
      default:
        break;
    }

    setFiltered(filteredList);
  };

  const isSameDay = (d1, d2) => {
    return (
      d1 &&
      d2 &&
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  useEffect(() => {
    filterFiles();
  }, [search, filterDate, files]);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        📂 Uploaded PDF Files
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          label="Search by name"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disabled>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Date Filter"
          select
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          sx={{ width: 200 }}
        >
          {dateOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : filtered.length === 0 ? (
        <Typography>No files found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((file, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  gap: 1,
                }}
              >
                <PictureAsPdfIcon sx={{ fontSize: 60, color: "#d32f2f" }} />
                <Typography
                  variant="body2"
                  sx={{
                    wordBreak: "break-word",
                    textAlign: "center",
                  }}
                >
                  {file.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {file.date ? file.date.toLocaleDateString() : "Unknown date"}
                </Typography>
                <Link
                  href={file.url}
                  target="_blank"
                  rel="noopener"
                  underline="hover"
                  sx={{ mt: 1 }}
                >
                  Download
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default UploadedFiles;
