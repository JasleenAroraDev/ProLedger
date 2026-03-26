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
import axios from "axios";  

export default function AddCustomerPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    city: "",
    state: "",
    gstnumber: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

     console.log("Customer Data:", formData);

    const res =  await axios.post("/dashboard/api",formData);   

    console.log("Backend data:", res.data); 

   
    alert("Customer Added Successfully!");
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
          Add Customer
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Fill the details to create a new customer
        </Typography>
      </Box>

      {/* FORM */}
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>

          {/* STACK = single column */}
          <Stack spacing={3}>

            <TextField
              label="Full Name"
              name="name"
              fullWidth
              required
              value={formData.name}
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
              label="Phonenumber"
              name="phonenumber"
              fullWidth
              required
              value={formData.phonenumber}
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
             label="GST Number"
             name="gstnumber"
             fullWidth
             value={formData.gstnumber}
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
                Save Customer
              </Button>
            </Box>

          </Stack>

        </form>
      </Paper>

    </Box>
  );
}