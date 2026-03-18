"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Stack
} from "@mui/material";

export default function AddVendorPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    country: "",
    status: "Active",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Vendor Data:", formData);

    // 👉 connect backend later
    alert("Vendor Added Successfully!");
  };

  return (
    <Box
      sx={{
        maxWidth: "900px",
        mx: "auto",
      }}
    >

      {/* HEADER */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={600}>
          Add Vendor
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fill the details to create a new vendor
        </Typography>
      </Box>

      {/* FORM */}
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>

          <Stack spacing={3}>

            <TextField
              label="Vendor Name"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              label="Company Name"
              name="company"
              fullWidth
              value={formData.company}
              onChange={handleChange}
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              label="Phone"
              name="phone"
              fullWidth
              required
              value={formData.phone}
              onChange={handleChange}
            />

            <TextField
              label="City"
              name="city"
              fullWidth
              value={formData.city}
              onChange={handleChange}
            />

            <TextField
              label="State"
              name="state"
              fullWidth
              value={formData.state}
              onChange={handleChange}
            />

            <TextField
              label="Country"
              name="country"
              fullWidth
              value={formData.country}
              onChange={handleChange}
            />

            <TextField
              select
              label="Status"
              name="status"
              fullWidth
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>

            <TextField
              label="Address"
              name="address"
              multiline
              rows={4}
              fullWidth
              value={formData.address}
              onChange={handleChange}
            />

            {/* BUTTONS */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
              <Button variant="outlined">
                Cancel
              </Button>

              <Button type="submit" variant="contained">
                Save Vendor
              </Button>
            </Box>

          </Stack>

        </form>
      </Paper>

    </Box>
  );
}