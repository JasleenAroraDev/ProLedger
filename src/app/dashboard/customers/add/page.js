// "use client";

// import React, { useEffect,useState } from "react";
// import Alert from "@mui/material/Alert";
// import {
//   Box,
//   Typography,
//   Paper,
//   TextField,
//   Button,
//   MenuItem,
//   CircularProgress
// } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";


// export default function CustomerForm() {
//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       customerName: "",
//       email: "",
//       phone: "",
//       gstNumber: "",
//       city: "",
//       status: "Active",
//       address: "",
      
      
//     },
//   });

//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//  const[recUserId, setRecUserId]= useState(null); 


//     useEffect(() => {
//     const testToken = async () => {
//       try {
//         const resToken = localStorage.getItem("Token");

//         if (!resToken) {
//           router.push("/signin");
//         }

//         const res = await axios.post("/api/jwt_verify", { resToken });

//         console.log("This is my responce",res);

//         console.log("This is your responce with id", res.data.received_id);

//         setRecUserId(res.data.received_id);

//         if (!res.data.valid) {
//            console.log("Valid Token",res.data.valid);
//           router.push("/signin");
         
//         }
        
//       } catch (err) {
//         console.log("error", err);
//       }
//     };

//     testToken();
//   }, []);

//   const onSubmit = async (data) => {

    
//     try {
//       setLoading(true);
//       setSuccess("");
//       setError("");

//       console.log("DATA:", data);
      


// await axios.post("/api/customers_api", {
//   ...data,
//   userId: recUserId
// });

//       setSuccess("Customer added successfully ");

//       reset();

//     } catch (err) {
//       console.log(err);

//       if (err.response?.status === 409) {
//         setError(err.response.data.message);
//       }

//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         style={{
//           maxWidth: "600px",
//           margin: "3rem auto",
//         }}
//       >
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h5" gutterBottom>
//             Add Customer
//           </Typography>

//           {success && <Alert severity="success">{success}</Alert>}
//           {error && <Alert severity="error">{error}</Alert>}

//           {/* Vendor Name */}
//           <Controller
//             name="customerName"
//             control={control}
//             rules={{ required: "Customer Name is required" }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Customer Name"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.customerName}
//                 helperText={errors.customerName?.message}
//                 disabled={loading}
//               />
//             )}
//           />

//           {/* Email */}
//           <Controller
//             name="email"
//             control={control}
//             rules={{
//               required: "Email is required",
//               pattern: {
//                 value: /^\S+@\S+\.\S+$/,
//                 message: "Invalid email",
//               },
//             }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Email"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.email}
//                 helperText={errors.email?.message}
//                 disabled={loading}
//               />
//             )}
//           />

//           {/* Phone */}
//           <Controller
//             name="phone"
//             control={control}
//             rules={{
//               required: "Phone is required",
//               minLength: {
//                 value: 10,
//                 message: "Enter valid 10 digit number",
//               },
//             }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Phone Number"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.phone}
//                 helperText={errors.phone?.message}
//                 disabled={loading}
//               />
//             )}
//           />

//           {/* GST Number */}
//           <Controller
//             name="gstNumber"
//             control={control}
//             rules={{
//               required: "GST Number is required",
//               minLength: {
//                 value: 15,
//                 message: "GST must be 15 characters",
//               },
//             }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="GST Number"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.gstNumber}
//                 helperText={errors.gstNumber?.message}
//                 disabled={loading}
//               />
//             )}
//           />

//           {/* City */}
//           <Controller
//             name="city"
//             control={control}
//             rules={{ required: "City is required" }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="City"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.city}
//                 helperText={errors.city?.message}
//                 disabled={loading}
//               />
//             )}
//           />

//           {/* Status */}
//           <Controller
//             name="status"
//             control={control}
//             rules={{ required: "Status is required" }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 select
//                 label="Status"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.status}
//                 helperText={errors.status?.message}
//                 disabled={loading}
//               >
//                 <MenuItem value="Active">Active</MenuItem>
//                 <MenuItem value="Inactive">Inactive</MenuItem>
//               </TextField>
//             )}
//           />

//           {/* Address */}
//           <Controller
//             name="address"
//             control={control}
//             rules={{ required: "Address is required" }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Address"
//                 multiline
//                 rows={3}
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.address}
//                 helperText={errors.address?.message}
//                 disabled={loading}
//               />
//             )}
//           />

//           {/* Submit */}
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{ mt: 2 }}
//             disabled={loading}
//           >

            
//             {loading ? <CircularProgress size={24} /> : "Add Customer"}
//           </Button>
//         </Paper>
//       </form>
//     </Box>
//   );
// }






"use client";

import React, { useEffect, useState } from "react";
import Alert from "@mui/material/Alert";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Stack,
  Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { keyframes } from "@mui/system";

export default function CustomerForm() {
  const router = useRouter();

  const brand = {
    navy: "#0f172a",
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",
    cyanDark: "#0e7490",
    blueLight: "#dbeafe",
    surface: "#ffffff",
    text: "#334155",
    muted: "#64748b",
    border: "#dbe5f0",
  };

  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(26px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const floatSoft = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0); }
  `;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      gstNumber: "",
      city: "",
      status: "Active",
      address: "",
    },
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recUserId, setRecUserId] = useState(null);

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      color: brand.navy,
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
        transform: "scale(1.01)",
      },
      "&.Mui-focused fieldset": {
        borderColor: brand.primary,
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      color: brand.muted,
      fontWeight: 600,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: brand.primary,
    },
  };

  useEffect(() => {
    const testToken = async () => {
      try {
        const resToken = localStorage.getItem("Token");

        if (!resToken) {
          router.push("/signin");
          return;
        }

        const res = await axios.post("/api/jwt_verify", { resToken });

        setRecUserId(res.data.received_id);

        if (!res.data.valid) {
          router.push("/signin");
        }
      } catch (err) {
        console.log("error", err);
        router.push("/signin");
      }
    };

    testToken();
  }, [router]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      await axios.post("/api/customers_api", {
        ...data,
        userId: recUserId,
      });

      setSuccess("Customer added successfully");
      reset();
    } catch (err) {
      console.log(err);

      if (err.response?.status === 409) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: 2,
        py: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 620,
          p: { xs: 2.5, sm: 4 },
          borderRadius: "8px",
          background: "rgba(255,255,255,0.95)",
          border: `1px solid ${brand.blueLight}`,
          boxShadow: "0 34px 90px rgba(15, 23, 42, 0.14)",
          backdropFilter: "blur(18px)",
          position: "relative",
          zIndex: 1,
          animation: `${fadeUp} 0.7s ease both, ${floatSoft} 5s ease-in-out 0.8s infinite`,
        }}
      >
        <Stack spacing={1} sx={{ mb: 2.5, textAlign: "center" }}>
          <Chip
            icon={<PersonAddAltIcon />}
            label="New Customer"
            sx={{
              mx: "auto",
              width: "fit-content",
              borderRadius: "8px",
              backgroundColor: brand.blueLight,
              color: brand.primaryDark,
              fontWeight: 900,
              "& .MuiChip-icon": {
                color: brand.primary,
              },
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: brand.navy,
            }}
          >
            Add Customer
          </Typography>

          <Typography sx={{ color: brand.muted }}>
            Fill customer details for billing and records.
          </Typography>
        </Stack>

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

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="customerName"
            control={control}
            rules={{ required: "Customer Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Customer Name"
                fullWidth
                margin="normal"
                error={!!errors.customerName}
                helperText={errors.customerName?.message}
                disabled={loading}
                sx={inputStyle}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={loading}
                sx={inputStyle}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone is required",
              minLength: {
                value: 10,
                message: "Enter valid 10 digit number",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                disabled={loading}
                sx={inputStyle}
              />
            )}
          />

          <Controller
            name="gstNumber"
            control={control}
            rules={{
              required: "GST Number is required",
              minLength: {
                value: 15,
                message: "GST must be 15 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="GST Number"
                fullWidth
                margin="normal"
                error={!!errors.gstNumber}
                helperText={errors.gstNumber?.message}
                disabled={loading}
                sx={inputStyle}
              />
            )}
          />

          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                margin="normal"
                error={!!errors.city}
                helperText={errors.city?.message}
                disabled={loading}
                sx={inputStyle}
              />
            )}
          />

          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Status"
                fullWidth
                margin="normal"
                error={!!errors.status}
                helperText={errors.status?.message}
                disabled={loading}
                sx={inputStyle}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                error={!!errors.address}
                helperText={errors.address?.message}
                disabled={loading}
                sx={inputStyle}
              />
            )}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            endIcon={!loading && <ArrowForwardIcon />}
            sx={{
              mt: 3,
              py: 1.55,
              borderRadius: "8px",
              fontWeight: 900,
              textTransform: "none",
              color: "#ffffff",
              background: "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
              boxShadow: "0 18px 38px rgba(37, 99, 235, 0.28)",
              transition: "all 0.28s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 24px 48px rgba(37, 99, 235, 0.36)",
                background:
                  "linear-gradient(135deg, #1d4ed8 0%, #0e7490 100%)",
              },
              "&.Mui-disabled": {
                color: "#ffffff",
                background: "#94a3b8",
              },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              "Add Customer"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}