// "use client";

// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   Avatar,
//   Button
// } from "@mui/material";

// export default function CompanyPage() {

//   const company = {
//     name: "ABC Pvt Ltd",
//     gst: "22AAAAA0000A1Z5",
//     pan: "AAAAA0000A",
//     phone: "+91 9876543210",
//     email: "info@abc.com",
//     website: "www.abc.com",
//     address: "Model Town, Ludhiana, Punjab",
//   };

//   return (
//     <Box>

//       {/* HEADER */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
//         <Typography variant="h4">Company</Typography>

//         <Button variant="contained">
//           Edit Details
//         </Button>
//       </Box>

//       {/* COMPANY CARD */}
//       <Paper sx={{ p: 4, borderRadius: 3 }}>

//         <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
//           <Avatar sx={{ width: 70, height: 70 }}>
//             A
//           </Avatar>

//           <Typography variant="h5">{company.name}</Typography>
//         </Box>

//         <Grid container spacing={2}>

//           <Grid item xs={6}>
//             <Typography><b>GST Number:</b> {company.gst}</Typography>
//           </Grid>

//           <Grid item xs={6}>
//             <Typography><b>PAN Number:</b> {company.pan}</Typography>
//           </Grid>

//           <Grid item xs={6}>
//             <Typography><b>Phone:</b> {company.phone}</Typography>
//           </Grid>

//           <Grid item xs={6}>
//             <Typography><b>Email:</b> {company.email}</Typography>
//           </Grid>

//           <Grid item xs={6}>
//             <Typography><b>Website:</b> {company.website}</Typography>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography><b>Address:</b> {company.address}</Typography>
//           </Grid>

//         </Grid>

//       </Paper>

//     </Box>
//   );
// }


// "use client";
// import React, { useState, useEffect } from "react";

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
// import DeleteIcon from "@mui/icons-material/Delete";
// import CircularProgress from "@mui/material/CircularProgress";
// import Alert from "@mui/material/Alert";

// import { useRouter } from "next/navigation";
// import axios from "axios";
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

// export default function CompaniesPage() {

//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [deleteLoading, setDeleteLoading] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [companies, setCompanies] = useState([]);
//   const [search, setSearch] = useState("");

//   const router = useRouter();

//   const fetchCompanies = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.post("/api/view_company_api", { search });

//       console.log("Company Data:", res.data.data);

//       setCompanies(res.data.data);

//     } catch (err) {
//       console.log("Error fetching companies:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, [search]);

//   const onDelete = async (id) => {
//     try {
//       setSuccess("");
//       setError("");
//       setDeleteLoading(true);

//       const res = await axios.post("/api/company_delete_api", { id });

//       if (res) {
//         setSuccess("Company Deleted Successfully");
//       }

//       fetchCompanies();

//     } catch (err) {
//       setError("Something went wrong");
//     } finally {
//       setDeleteLoading(false);
//     }
//   };

//   return (
//     <Box>

//       {success && <Alert severity="success">{success}</Alert>}
//       {error && <Alert severity="error">{error}</Alert>}

//       {/* HEADER */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           mb: 3
//         }}
//       >
//         <Typography variant="h4">Companies</Typography>

       
//       </Box>

//       {/* SEARCH */}
//       <TextField
//         placeholder="Search companies..."
//         fullWidth
//         sx={{ mb: 3 }}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//         }}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* TABLE */}
//       <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>

//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center" }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <Table>

//             <TableHead sx={{ bgcolor: "#f1f5f9" }}>
//               <TableRow>
//                 <TableCell>Company Name</TableCell>
//                 <TableCell>Email</TableCell>
//                 <TableCell>Phone</TableCell>
//                 <TableCell>City</TableCell>
//                 <TableCell>Industry</TableCell>
//                 <TableCell>Business Type</TableCell>
//                 <TableCell>Action</TableCell>
//                 <TableCell>Delete</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {companies?.map((company) => (
//                 <TableRow key={company.id} hover>

//                   <TableCell>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                     
//                       {company.company_name}
//                     </Box>
//                   </TableCell>

//                   <TableCell>{company.company_email}</TableCell>
//                   <TableCell>{company.phone_number}</TableCell>
//                   <TableCell>{company.city}</TableCell>
//                   <TableCell>{company.industry}</TableCell>
//                   <TableCell>{company.business_type}</TableCell>

//                   <TableCell>
//                     <span
//                       onClick={() =>
//                         router.push(`/dashboard/company/edit?id=${company.id}`)
//                       }
//                       style={{ cursor: "pointer", color: "blue" }}
//                     >
//                       <RemoveRedEyeIcon/>
//                     </span>
//                   </TableCell>

//                   <TableCell>
//                     <span
//                       onClick={() => onDelete(company.id)}
//                       style={{ cursor: "pointer", color: "red" }}
//                     >
//                       {deleteLoading ? <CircularProgress size={20} /> : <DeleteIcon />}
//                     </span>
//                   </TableCell>

//                 </TableRow>
//               ))}
//             </TableBody>

//           </Table>
//         )}
//       </Paper>
//     </Box>
//   );
// }




"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  Container,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

// import whapi from '@api/whapi';

export default function CompanyEdit() {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      companyName: "",
      businessType: "",
      industry: "",
      country: "India",
      state: "",
      city: "",
      gstNumber: "",
      panNumber: "",
      email: "",
      address: "",
      phone: "",
      website: "",
    },
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [companyId, setCompanyId] = useState(null);


  useEffect(() => {
    const viewEdit = async () => {
      try {
        const token = localStorage.getItem("Token");
        const res = await axios.post("/api/company_edit_api", { token });

     
        const data = res.data?.data ?? res.data?.[0];

        if (!data) {
          console.error("No company data found");
          setError("Failed to load company data.");
          return;
        }

        setCompanyId(data.id);
        setValue("companyName", data.company_name ?? "");
        setValue("businessType", data.business_type ?? "");
        setValue("industry", data.industry ?? "");
        setValue("country", data.country ?? "India");
        setValue("state", data.state ?? "");
        setValue("city", data.city ?? "");
        setValue("gstNumber", data.gst_number ?? "");
        setValue("panNumber", data.pan_number ?? "");
        setValue("address", data.company_address ?? "");
        setValue("email", data.company_email ?? "");
        setValue("phone", data.phone_number ?? "");
        setValue("website", data.company_website ?? "");
      } catch (err) {
        console.error("Error fetching company data:", err);
        setError("Failed to load company data.");
      }
    };

    viewEdit();
  }, [setValue]);

  const onSubmit = async (formData) => {
    setLoading(true);
    setSuccess("");
    setError("");


    try {
      if (!companyId) {
        setError("Company ID missing..");
        return; 
      }

      const payload = { ...formData, id: companyId };
      await axios.post("/api/company_update_api", payload);
      setSuccess("Company updated successfully");
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


//  const whatsapp_test = async ()=>{

// const options = {
//   method: 'POST',
//   url: 'https://gate.whapi.cloud/messages/document',
//   headers: {
//     accept: 'application/json',
//     'content-type': 'application/json',
//     authorization: 'Bearer hPuLvsumO0V5GaLzRenvFMxeHpmzlDef'
//   },
//   data: {
//     to: '917589914599', // 👈 receiver number
//     media: 'https://www.rd.usda.gov/sites/default/files/pdf-sample_0.pdf', // 👈 PDF public URL
//     filename: 'pdf-sample_0.pdf', // 👈 file name (optional but recommended)
//     caption: 'Here is your invoice 📄' // 👈 optional message
//   }
// };

// axios
//   .request(options)
//   .then(res => console.log(res.data))
//   .catch(err => console.error(err));
//  }

  const businessTypes = [
    "Manufacturer",
    "Trading Company",
    "Service Provider",
    "Retail",
    "Distributor",
    "Other",
  ];

  const industries = [
    "Textile", "Food", "Automobile", "Electronics",
    "Construction", "IT Services", "Healthcare", "Education", "Other",
  ];

  const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
    "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands",
    "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
    "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
  ];

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 4 }}>
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Typography variant="h5" gutterBottom>
          Edit Company
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Basic Company Info
          </Typography>

          <Controller
            name="companyName"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Company Name" fullWidth margin="normal" />
            )}
          />

          <Controller
            name="businessType"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Business Type" fullWidth margin="normal">
                {businessTypes.map((type) => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="industry"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Industry" fullWidth margin="normal">
                {industries.map((ind) => (
                  <MenuItem key={ind} value={ind}>{ind}</MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Country"
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            )}
          />

          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="State" fullWidth margin="normal">
                {statesOfIndia.map((s) => (
                  <MenuItem key={s} value={s}>{s}</MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="City" fullWidth margin="normal" />
            )}
          />

          <Typography variant="h6" sx={{ mt: 3 }}>
            Company Details
          </Typography>

          <Controller
            name="gstNumber"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="GST Number" fullWidth margin="normal" />
            )}
          />

          <Controller
            name="panNumber"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="PAN Number" fullWidth margin="normal" />
            )}
          />

          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Address" fullWidth multiline rows={3} margin="normal" />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Email" fullWidth margin="normal" />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Phone" fullWidth margin="normal" />
            )}
          />

          <Controller
            name="website"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Website" fullWidth margin="normal" />
            )}
          />

          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            {loading ? <CircularProgress size={24} /> : "Update Company"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}