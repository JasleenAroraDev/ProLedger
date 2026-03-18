"use client";
import { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box
} from "@mui/material";

export default function CompanyForm() {

  const [formData, setFormData] = useState({
    companyName: "",
    businessType: "",
    industry: "",
    country: "",
    state: "",
    city: "",
    currency: "",
    timezone: "",
    financialYearStart: "",
    logo: null,
    gstNumber: "",
    panNumber: "",
    address: "",
    phone: "",
    website: ""
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      setFormData({
        ...formData,
        logo: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Full Company Data:", formData);
  };

  const businessTypes = [
    "Manufacturer",
    "Trading Company",
    "Service Provider",
    "Retail",
    "Distributor",
    "Other"
  ];

  const industries = [
    "Textile",
    "Food",
    "Automobile",
    "Electronics",
    "Construction",
    "IT Services",
    "Healthcare",
    "Education",
    "Other"
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        py: 6
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "20px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff"
          }}
        >

          <Typography variant="h4" gutterBottom fontWeight="bold">
            Company Setup
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>

            {/* ---------- Basic Info ---------- */}
            <Typography variant="h6" sx={{ mt: 2, color: "#cbd5f5" }}>
              Basic Company Info
            </Typography>

            <TextField label="Company Name" name="companyName" fullWidth required margin="normal" value={formData.companyName} onChange={handleChange} sx={inputStyle} />

            <TextField select label="Business Type" name="businessType" fullWidth required margin="normal" value={formData.businessType} onChange={handleChange} sx={inputStyle}>
              {businessTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>

            <TextField select label="Industry" name="industry" fullWidth required margin="normal" value={formData.industry} onChange={handleChange} sx={inputStyle}>
              {industries.map((ind) => (
                <MenuItem key={ind} value={ind}>{ind}</MenuItem>
              ))}
            </TextField>

            <TextField label="Country" name="country" fullWidth required margin="normal" value={formData.country} onChange={handleChange} sx={inputStyle} />

            <TextField label="State" name="state" fullWidth required margin="normal" value={formData.state} onChange={handleChange} sx={inputStyle} />

            <TextField label="City" name="city" fullWidth required margin="normal" value={formData.city} onChange={handleChange} sx={inputStyle} />

            <TextField label="Currency" name="currency" fullWidth required margin="normal" value={formData.currency} onChange={handleChange} sx={inputStyle} />

            <TextField label="Time Zone" name="timezone" fullWidth required margin="normal" value={formData.timezone} onChange={handleChange} sx={inputStyle} />

            <TextField type="date" label="Financial Year Start" name="financialYearStart" fullWidth margin="normal" InputLabelProps={{ shrink: true }} value={formData.financialYearStart} onChange={handleChange} sx={inputStyle} />

            {/* ---------- Company Details ---------- */}
            <Typography variant="h6" sx={{ mt: 4, color: "#cbd5f5" }}>
              Company Details
            </Typography>

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                mt: 2,
                borderColor: "#475569",
                color: "#cbd5f5",
                "&:hover": { borderColor: "#6366f1" }
              }}
            >
              Upload Company Logo
              <input type="file" hidden name="logo" accept="image/*" onChange={handleChange} />
            </Button>

            <TextField label="GST Number" name="gstNumber" fullWidth margin="normal" value={formData.gstNumber} onChange={handleChange} sx={inputStyle} />

            <TextField label="PAN Number" name="panNumber" fullWidth margin="normal" value={formData.panNumber} onChange={handleChange} sx={inputStyle} />

            <TextField label="Company Address" name="address" fullWidth multiline rows={3} margin="normal" value={formData.address} onChange={handleChange} sx={inputStyle} />

            <TextField label="Phone" name="phone" fullWidth margin="normal" value={formData.phone} onChange={handleChange} sx={inputStyle} />

            <TextField label="Website" name="website" fullWidth margin="normal" value={formData.website} onChange={handleChange} sx={inputStyle} />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: "12px",
                fontWeight: "bold",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
              }}
            >
              Save & Continue
            </Button>

          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

/* 🔥 Modern Input Styling */
const inputStyle = {
  input: { color: "#fff" },
  label: { color: "#94a3b8" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#475569" },
    "&:hover fieldset": { borderColor: "#6366f1" },
    "&.Mui-focused fieldset": { borderColor: "#8b5cf6" }
  }
};