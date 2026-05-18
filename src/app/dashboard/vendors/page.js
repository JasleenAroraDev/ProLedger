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
//   Button
// } from "@mui/material";

// import SearchIcon from "@mui/icons-material/Search";

// import {useRouter} from "next/navigation";

// import axios from 'axios';
// import { useEffect } from "react";
// import DeleteIcon from "@mui/icons-material/Delete";
// import CircularProgress from "@mui/material/CircularProgress";
// import Alert from "@mui/material/Alert";
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';



// export default function VendorsPage() {

// const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [loading, setLoading] = useState(false);
// const [vendors, setVendors]=useState([]);
// const [search, setSearch]=useState("");

//     const router = useRouter();
//      const fetchVendor = async () => {

//     try{
//       setLoading(true);


//       const res = await axios.post("/api/view_vendor_api",{search});

//      console.log("This is your data", res.data.data);

//      setVendors(res.data.data);
  
//   }
//   catch(err){
//     console.log("Error fetching vendor:", err);
//   }
//   finally{
//     setLoading(false);
//   }
// }

//      useEffect(() => {
 
//   fetchVendor();


// }, [search]);

// const onDelete = async(id)=>{

//   try{
    
//       setSuccess("");
//       setError("");
//       setDeleteLoading(true);

//   console.log("This is id",id);
  

//   const res= await axios.post("/api/Vendor_delete_api",{id});

//   console.log("This is my result",res);

//   if(res){
//       setSuccess("Vendor Delete Successfully ");

//   }
//   fetchVendor();
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
//         <Typography variant="h4">Vendors</Typography>

//         <Button variant="contained" onClick={()=>router.push("/dashboard/vendors/add")}>
//           + Add Vendor
//         </Button>
//       </Box>

//       {/* SEARCH */}
//       <TextField
//         placeholder="Search vendors..."
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
//           <CircularProgress />
//         </Box> : 
//         <Table>

//           <TableHead sx={{ bgcolor: "#f1f5f9" }}>
//             <TableRow>
//               <TableCell>Vendor</TableCell>
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
//             {vendors?.map((vendor) => (
//               <TableRow key={vendor.id} hover>

//                 <TableCell>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                     <Avatar>
//                       {vendor.vendor_name.charAt(0)}
//                     </Avatar>
//                     {vendor.vendor_name}
//                   </Box>
//                 </TableCell>

//                 <TableCell>{vendor.email}</TableCell>
//                 <TableCell>{vendor.phone_number}</TableCell>
//                 <TableCell>{vendor.city}</TableCell>

//                 <TableCell>
//                   <Chip
//                     label={vendor.status}
//                     color={vendor.status === "Active" ? "success" : "default"}
//                     size="small"
//                   />
//                 </TableCell>

//                  <TableCell>{vendor.address}</TableCell>
//                  <TableCell>
//                   <span onClick={() => router.push(`/dashboard/vendors/edit?id=${vendor.id}`)}
//                     style={{ cursor: "pointer", color: "blue" }}>
//                    <RemoveRedEyeIcon/>
//                 </span>
//               </TableCell>

//               <TableCell>
//                   <span onClick={() => onDelete(vendor.id)} style={{ cursor: "pointer", color:"red" }}> {deleteLoading ? <CircularProgress /> : <DeleteIcon/>}</span>
//                  </TableCell>
                         

//               </TableRow>
//             ))}
//           </TableBody>

//         </Table>
// }
//       </Paper>


//     </Box>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
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
  Alert,
  Stack,
  IconButton,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import StoreIcon from "@mui/icons-material/Store";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";
import axios from "axios";
import { keyframes } from "@mui/system";

export default function VendorsPage() {
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

  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const floatSoft = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0); }
  `;

  const glowPulse = keyframes`
    0% { box-shadow: 0 0 0 rgba(37, 99, 235, 0.12); }
    50% { box-shadow: 0 18px 45px rgba(37, 99, 235, 0.18); }
    100% { box-shadow: 0 0 0 rgba(37, 99, 235, 0.12); }
  `;

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [search, setSearch] = useState("");

  const fetchVendor = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/view_vendor_api", { search });

      setVendors(res.data.data);
    } catch (err) {
      console.log("Error fetching vendor:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendor();
  }, [search]);

  const onDelete = async (id) => {
    try {
      setSuccess("");
      setError("");
      setDeletingId(id);

      const res = await axios.post("/api/Vendor_delete_api", { id });

      if (res) {
        setSuccess("Vendor deleted successfully");
      }

      fetchVendor();
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 3 },
        py: 3,
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef6ff 48%, #ecfeff 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.055) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          sx={{
            mb: 3,
            animation: `${fadeUp} 0.55s ease both`,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: brand.navy,
              }}
            >
              Vendors
            </Typography>

            <Typography sx={{ color: brand.muted, mt: 0.5 }}>
              Manage vendor records, contact details, and supplier status.
            </Typography>
          </Box>

          <Button
            onClick={() => router.push("/dashboard/vendors/add")}
            startIcon={<AddIcon />}
            sx={{
              px: 2.5,
              py: 1.2,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 900,
              color: "#ffffff",
              background: "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
              boxShadow: "0 14px 30px rgba(37, 99, 235, 0.22)",
              transition: "all 0.28s ease",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #1d4ed8 0%, #0e7490 100%)",
                transform: "translateY(-3px)",
                boxShadow: "0 20px 42px rgba(37, 99, 235, 0.32)",
              },
            }}
          >
            Add Vendor
          </Button>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            mb: 3,
            borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.92)",
            border: `1px solid ${brand.border}`,
            boxShadow: "0 14px 34px rgba(15, 23, 42, 0.08)",
            animation: `${fadeUp} 0.7s ease both`,
          }}
        >
          <TextField
            placeholder="Search vendors..."
            fullWidth
            value={search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: brand.primary }} />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                fontWeight: 600,
                transition: "0.28s ease",
                "& fieldset": {
                  borderColor: brand.border,
                },
                "&:hover": {
                  transform: "translateY(-2px)",
                },
                "&:hover fieldset": {
                  borderColor: brand.primary,
                },
                "&.Mui-focused": {
                  transform: "scale(1.005)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: brand.primary,
                  borderWidth: "2px",
                },
              },
            }}
          />
        </Paper>

        <Paper
          elevation={0}
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "rgba(255,255,255,0.96)",
            border: `1px solid ${brand.blueLight}`,
            boxShadow: "0 24px 70px rgba(15, 23, 42, 0.12)",
            animation: `${fadeUp} 0.85s ease both, ${glowPulse} 4s ease-in-out infinite`,
          }}
        >
          {loading ? (
            <Box
              sx={{
                minHeight: 260,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress sx={{ color: brand.primary }} />
            </Box>
          ) : (
            <Table>
              <TableHead
                sx={{
                  background:
                    "linear-gradient(135deg, #dbeafe 0%, #cffafe 100%)",
                }}
              >
                <TableRow>
                  {[
                    "Vendor",
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
                {vendors?.map((vendor, index) => (
                  <TableRow
                    key={vendor.id}
                    hover
                    sx={{
                      animation: `${fadeUp} 0.45s ease both`,
                      animationDelay: `${index * 0.04}s`,
                      transition: "0.25s ease",
                      "&:hover": {
                        backgroundColor: "#f8fafc",
                        transform: "scale(1.003)",
                      },
                    }}
                  >
                    <TableCell>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar
                          sx={{
                            bgcolor: brand.blueLight,
                            color: brand.primary,
                            fontWeight: 900,
                            animation: `${floatSoft} 3s ease-in-out infinite`,
                          }}
                        >
                          {vendor.vendor_name?.charAt(0)}
                        </Avatar>

                        <Typography fontWeight={800} color={brand.navy}>
                          {vendor.vendor_name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {vendor.email}
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {vendor.phone_number}
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {vendor.city}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={vendor.status}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          fontWeight: 900,
                          color:
                            vendor.status === "Active"
                              ? brand.emerald
                              : brand.muted,
                          backgroundColor:
                            vendor.status === "Active"
                              ? brand.emeraldLight
                              : "#f1f5f9",
                          transition: "0.25s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                          },
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {vendor.address}
                    </TableCell>

                    <TableCell>
                      <IconButton
                        onClick={() =>
                          router.push(`/dashboard/vendors/edit?id=${vendor.id}`)
                        }
                        sx={{
                          color: brand.primary,
                          backgroundColor: brand.blueLight,
                          borderRadius: "8px",
                          transition: "0.25s ease",
                          "&:hover": {
                            backgroundColor: "#bfdbfe",
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        onClick={() => onDelete(vendor.id)}
                        sx={{
                          color: "#dc2626",
                          backgroundColor: "#fee2e2",
                          borderRadius: "8px",
                          transition: "0.25s ease",
                          "&:hover": {
                            backgroundColor: "#fecaca",
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        {deletingId === vendor.id ? (
                          <CircularProgress size={22} color="inherit" />
                        ) : (
                          <DeleteIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}

                {vendors?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <Stack
                        alignItems="center"
                        spacing={1}
                        sx={{
                          py: 6,
                          color: brand.muted,
                          animation: `${fadeUp} 0.6s ease both`,
                        }}
                      >
                        <StoreIcon
                          sx={{
                            fontSize: 42,
                            color: brand.primary,
                            animation: `${floatSoft} 3s ease-in-out infinite`,
                          }}
                        />
                        <Typography fontWeight={800}>No vendors found</Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
