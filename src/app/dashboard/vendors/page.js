"use client";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Button
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import {useRouter} from "next/navigation";

export default function VendorsPage() {

    const router = useRouter();

  const vendors = [
    { id: 1, name: "Tech Supplies", email: "tech@gmail.com", phone: "9876500000", city: "Delhi", status: "Active" },
    { id: 2, name: "Office Mart", email: "office@gmail.com", phone: "9123400000", city: "Mumbai", status: "Active" },
    { id: 3, name: "Raw Materials Co.", email: "raw@gmail.com", phone: "9988700000", city: "Chandigarh", status: "Inactive" },
    { id: 4, name: "Global Traders", email: "global@gmail.com", phone: "9090900000", city: "Ludhiana", status: "Active" },
  ];

  return (
    <Box>

      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
        }}
      >
        <Typography variant="h4">Vendors</Typography>

        <Button variant="contained" onClick={()=>router.push("/dashboard/vendors/add")}>
          + Add Vendor
        </Button>
      </Box>

      {/* SEARCH */}
      <TextField
        placeholder="Search vendors..."
        fullWidth
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* TABLE */}
      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Table>

          <TableHead sx={{ bgcolor: "#f1f5f9" }}>
            <TableRow>
              <TableCell>Vendor</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {vendors.map((vendor) => (
              <TableRow key={vendor.id} hover>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar>
                      {vendor.name.charAt(0)}
                    </Avatar>
                    {vendor.name}
                  </Box>
                </TableCell>

                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.phone}</TableCell>
                <TableCell>{vendor.city}</TableCell>

                <TableCell>
                  <Chip
                    label={vendor.status}
                    color={vendor.status === "Active" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </Paper>

    </Box>
  );
}