// "use client";
// import React, {useState} from "react";

// import {
//   Box,
//   Typography,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Chip,
//   Avatar,
//   TextField,
//   InputAdornment,
//   Button,
//   CircularProgress
// } from "@mui/material";
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import DeleteIcon from '@mui/icons-material/Delete';

// import SearchIcon from "@mui/icons-material/Search";

// import {useRouter} from "next/navigation";

// import axios from 'axios';
// import { useEffect } from "react";
// import Alert from "@mui/material/Alert";

// export default function CustomersPage() {

  
// const [customers, setCustomers]=useState([]);
// const [search, setSearch]=useState("");
// const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//     const [deleteLoading, setDeleteLoading] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const router = useRouter();

//       const fetchCustomer = async () => {

//     try{
//        setLoading(true);


//       console.log("value of search ",search);

//       const res = await axios.post("/api/view_customer_api",{search});

//      console.log("This is your data", res.data.data);

//      setCustomers(res.data.data);
  
//   }
//   catch(err){
//     console.log("Error fetching vendor:", err);
//   }
//   finally{
//     setLoading(false);
//   }
// }

//      useEffect(() => {

//   fetchCustomer();


// }, [search]);

// const onDelete = async(id)=>{

//   try{
//     setDeleteLoading(true);
//       setSuccess("");
//       setError("");

//   console.log("This is id",id);
  

//   const res= await axios.post("/api/customer_delete_api",{id});

//   console.log("This is my result",res);

//   if(res){
//       setSuccess("Customer Delete Successfully ");

//   }
//   fetchCustomer();
// } catch(err){
//   setError("Something Went wrong");

// }
// finally{
//   setDeleteLoading(false);
// }

//           {success && <Alert severity="success">{success}</Alert>}
//           {error && <Alert severity="error">{error}</Alert>}

// }

//   // const vendors = [
//   //   { id: 1, name: "Tech Supplies", email: "tech@gmail.com", phone: "9876500000", city: "Delhi", status: "Active" },
//   //   { id: 2, name: "Office Mart", email: "office@gmail.com", phone: "9123400000", city: "Mumbai", status: "Active" },
//   //   { id: 3, name: "Raw Materials Co.", email: "raw@gmail.com", phone: "9988700000", city: "Chandigarh", status: "Inactive" },
//   //   { id: 4, name: "Global Traders", email: "global@gmail.com", phone: "9090900000", city: "Ludhiana", status: "Active" },
//   // ];

//   return (
//     <Box>

//       {/* HEADER */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3
//         }}
//       >
//         <Typography variant="h4">Customers</Typography>

//         <Button variant="contained" onClick={()=>router.push("/dashboard/customers/add")}>
//           + Add Customer
//         </Button>
//       </Box>

//       {/* SEARCH */}
//       <TextField
//         placeholder="Search customers..."
//         fullWidth
//         sx={{ mb: 3 }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//         }}
//         onChange={(e)=>
//           setSearch(e.target.value)
//         }
//       />

//       {/* TABLE */}
//       <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>

//         {loading ? <Box sx={{ display: "flex", justifyContent: "center", }}>
//   <CircularProgress />
// </Box> : 

//         <Table>

//           <TableHead sx={{ bgcolor: "#f1f5f9" }}>
//             <TableRow>
//               <TableCell>Customer</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>City</TableCell>
//               <TableCell>Status</TableCell>
//               <TableCell>Address</TableCell>
//               <TableCell>Action</TableCell>
//               <TableCell>Delete</TableCell>

//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {customers?.map((customer) => (
//               <TableRow key={customer.id} hover>

//                 <TableCell>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <Avatar>
//                       {customer.customer_name.charAt(0)}
//                     </Avatar>
//                     {customer.customer_name}
//                   </Box>
//                 </TableCell>

//                 <TableCell>{customer.email}</TableCell>
//                 <TableCell>{customer.phone_number}</TableCell>
//                 <TableCell>{customer.city}</TableCell>

//                 <TableCell>
//                   <Chip
//                     label={customer.status}
//                     color={customer.status === "Active" ? "success" : "default"}
//                     size="small"
//                   />
//                 </TableCell>

//                  <TableCell>{customer.address}</TableCell>
//                  <TableCell>
//                    <span onClick={() => router.push(`/dashboard/customers/edit?id=${customer.id}`)}
//                     style={{ cursor: "pointer" , color:"blue"}}>
//           <RemoveRedEyeIcon/>
//         </span>
//                  </TableCell>
//                  <TableCell>
//                   <span onClick={() => onDelete(customer.id)} style={{ cursor: "pointer", color:"red" }}> {deleteLoading ? <CircularProgress /> : <DeleteIcon/>}</span>
//                  </TableCell>

//               </TableRow>

//             ))}
//           </TableBody>

//         </Table>

//       }
//       </Paper>

//     </Box>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";

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
  Button,
  CircularProgress,
  Stack,
  IconButton,
  Alert,
} from "@mui/material";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function CustomersPage() {
  const router = useRouter();

  const brand = {
    navy: "#0f172a",
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",
    emerald: "#059669",
    blueLight: "#dbeafe",
    cyanLight: "#cffafe",
    emeraldLight: "#dcfce7",
    surface: "#ffffff",
    text: "#334155",
    muted: "#64748b",
    border: "#dbe5f0",
  };

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCustomer = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/view_customer_api", { search });

      setCustomers(res.data.data || []);
    } catch (err) {
      console.log("Error fetching customer:", err);
      setError("Failed to fetch customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, [search]);

  const onDelete = async (id) => {
    try {
      setDeleteLoading(true);
      setDeletingId(id);
      setSuccess("");
      setError("");

      const res = await axios.post("/api/customer_delete_api", { id });

      if (res) {
        setSuccess("Customer deleted successfully");
      }

      fetchCustomer();
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setDeleteLoading(false);
      setDeletingId(null);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef6ff 48%, #ecfeff 100%)",
        p: { xs: 2, md: 3 },
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.055) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Chip
              icon={<PeopleIcon />}
              label="Customer Management"
              sx={{
                mb: 1.2,
                borderRadius: "8px",
                backgroundColor: brand.blueLight,
                color: brand.primaryDark,
                fontWeight: 900,
                border: `1px solid ${brand.border}`,
                "& .MuiChip-icon": {
                  color: brand.primary,
                },
              }}
            />

            <Typography variant="h4" fontWeight={900} sx={{ color: brand.navy }}>
              Customers
            </Typography>

            <Typography sx={{ color: brand.muted, mt: 0.5 }}>
              Manage customer records, contact details, and activity status.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/dashboard/customers/add")}
            sx={{
              px: 2.6,
              py: 1.25,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 900,
              background: "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
              boxShadow: "0 18px 38px rgba(37, 99, 235, 0.24)",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #1d4ed8 0%, #0e7490 100%)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Add Customer
          </Button>
        </Stack>

        <Stack spacing={1.2} sx={{ mb: 2 }}>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.94)",
            border: `1px solid ${brand.border}`,
            boxShadow: "0 18px 50px rgba(15, 23, 42, 0.06)",
          }}
        >
          <TextField
            placeholder="Search customers by name, city, phone..."
            fullWidth
            value={search}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                fontWeight: 600,
                "& fieldset": {
                  borderColor: brand.border,
                },
                "&:hover fieldset": {
                  borderColor: brand.primary,
                },
                "&.Mui-focused fieldset": {
                  borderColor: brand.primary,
                  borderWidth: "2px",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: brand.primary }} />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Paper>

        <Paper
          elevation={0}
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "rgba(255,255,255,0.94)",
            border: `1px solid ${brand.border}`,
            boxShadow: "0 18px 50px rgba(15, 23, 42, 0.07)",
          }}
        >
          {loading ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1.5}
              sx={{ minHeight: 260 }}
            >
              <CircularProgress sx={{ color: brand.primary }} />
              <Typography sx={{ color: brand.muted, fontWeight: 800 }}>
                Loading customers...
              </Typography>
            </Stack>
          ) : (
            <Box sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead
                  sx={{
                    background:
                      "linear-gradient(135deg, #eff6ff 0%, #ecfeff 100%)",
                  }}
                >
                  <TableRow>
                    {[
                      "Customer",
                      "Email",
                      "Phone",
                      "City",
                      "Status",
                      "Address",
                      "Action",
                      "Delete",
                    ].map((head) => (
                      <TableCell
                        key={head}
                        sx={{
                          color: brand.navy,
                          fontWeight: 900,
                          borderBottom: `1px solid ${brand.border}`,
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {customers?.map((customer) => (
                    <TableRow
                      key={customer.id}
                      hover
                      sx={{
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "#f8fafc",
                        },
                      }}
                    >
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1.4}>
                          <Avatar
                            sx={{
                              width: 38,
                              height: 38,
                              fontWeight: 900,
                              background:
                                "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
                              boxShadow: "0 10px 20px rgba(37, 99, 235, 0.2)",
                            }}
                          >
                            {customer.customer_name?.charAt(0)}
                          </Avatar>

                          <Typography fontWeight={900} color={brand.navy}>
                            {customer.customer_name}
                          </Typography>
                        </Stack>
                      </TableCell>

                      <TableCell sx={{ color: brand.text }}>
                        {customer.email}
                      </TableCell>

                      <TableCell sx={{ color: brand.text }}>
                        {customer.phone_number}
                      </TableCell>

                      <TableCell sx={{ color: brand.text }}>
                        {customer.city}
                      </TableCell>

                      <TableCell>
                        <Chip
                          icon={
                            customer.status === "Active" ? (
                              <CheckCircleIcon />
                            ) : undefined
                          }
                          label={customer.status}
                          size="small"
                          sx={{
                            borderRadius: "8px",
                            fontWeight: 900,
                            backgroundColor:
                              customer.status === "Active"
                                ? brand.emeraldLight
                                : "#f1f5f9",
                            color:
                              customer.status === "Active"
                                ? brand.emerald
                                : brand.muted,
                            "& .MuiChip-icon": {
                              color: brand.emerald,
                            },
                          }}
                        />
                      </TableCell>

                      <TableCell sx={{ color: brand.text, maxWidth: 260 }}>
                        {customer.address}
                      </TableCell>

                      <TableCell>
                        <IconButton
                          onClick={() =>
                            router.push(
                              `/dashboard/customers/edit?id=${customer.id}`
                            )
                          }
                          sx={{
                            color: brand.primary,
                            backgroundColor: brand.blueLight,
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: "#bfdbfe",
                            },
                          }}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </TableCell>

                      <TableCell>
                        <IconButton
                          onClick={() => onDelete(customer.id)}
                          sx={{
                            color: "#dc2626",
                            backgroundColor: "#fee2e2",
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: "#fecaca",
                            },
                          }}
                        >
                          {deleteLoading && deletingId === customer.id ? (
                            <CircularProgress size={22} sx={{ color: "#dc2626" }} />
                          ) : (
                            <DeleteIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                  {!customers?.length && (
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Stack alignItems="center" sx={{ py: 5 }}>
                          <Typography fontWeight={900} color={brand.navy}>
                            No customers found
                          </Typography>
                          <Typography color={brand.muted}>
                            Try another search or add a new customer.
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
