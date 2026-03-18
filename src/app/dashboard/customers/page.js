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

export default function CustomersPage() {


    const router = useRouter();

  // Dummy Data (you can replace with API later)
  const customers = [
    { id: 1, name: "Aman Sharma", email: "aman@gmail.com", phone: "9876543210", city: "Delhi", status: "Active" },
    { id: 2, name: "Riya Verma", email: "riya@gmail.com", phone: "9123456780", city: "Mumbai", status: "Inactive" },
    { id: 3, name: "Karan Singh", email: "karan@gmail.com", phone: "9988776655", city: "Chandigarh", status: "Active" },
    { id: 4, name: "Neha Gupta", email: "neha@gmail.com", phone: "9090909090", city: "Ludhiana", status: "Active" },
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
        <Typography variant="h4">Customers</Typography>

        <Button variant="contained" onClick={()=>router.push("/dashboard/customers/add")}>
          + Add Customer
        </Button>
      </Box>

      {/* SEARCH */}
      <TextField
        placeholder="Search customers..."
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
              <TableCell>Customer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map((cust) => (
              <TableRow key={cust.id} hover>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar>
                      {cust.name.charAt(0)}
                    </Avatar>
                    {cust.name}
                  </Box>
                </TableCell>

                <TableCell>{cust.email}</TableCell>
                <TableCell>{cust.phone}</TableCell>
                <TableCell>{cust.city}</TableCell>

                <TableCell>
                  <Chip
                    label={cust.status}
                    color={cust.status === "Active" ? "success" : "default"}
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