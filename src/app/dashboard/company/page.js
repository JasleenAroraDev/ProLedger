"use client";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
  Button
} from "@mui/material";

export default function CompanyPage() {

  const company = {
    name: "ABC Pvt Ltd",
    gst: "22AAAAA0000A1Z5",
    pan: "AAAAA0000A",
    phone: "+91 9876543210",
    email: "info@abc.com",
    website: "www.abc.com",
    address: "Model Town, Ludhiana, Punjab",
  };

  return (
    <Box>

      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Company</Typography>

        <Button variant="contained">
          Edit Details
        </Button>
      </Box>

      {/* COMPANY CARD */}
      <Paper sx={{ p: 4, borderRadius: 3 }}>

        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
          <Avatar sx={{ width: 70, height: 70 }}>
            A
          </Avatar>

          <Typography variant="h5">{company.name}</Typography>
        </Box>

        <Grid container spacing={2}>

          <Grid item xs={6}>
            <Typography><b>GST Number:</b> {company.gst}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography><b>PAN Number:</b> {company.pan}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography><b>Phone:</b> {company.phone}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography><b>Email:</b> {company.email}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography><b>Website:</b> {company.website}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography><b>Address:</b> {company.address}</Typography>
          </Grid>

        </Grid>

      </Paper>

    </Box>
  );
}