// "use client";
// import React, { useState, useEffect } from "react";
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
// import { useRouter } from "next/navigation"; // ✅ FIX

// export default function ItemForm() {

//   const router = useRouter(); // ✅ FIX

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       p_id: "",
//       item_name: "",
//       item_unit: "",
//       item_sku: "",
//       userId:"",
    
//     },
//   });

//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [recUserId, setRecUserId] = useState("");


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
//   if (!recUserId) {
//     setError("User not authenticated properly");
//     return;}

//       const payload = {
//         ...data,
//           userId:recUserId,
//       };
//     try {
//       setLoading(true);
//       setSuccess("");
//       setError("");



//       await axios.post("/api/items_api", {payload}); 

//       setSuccess("Item added successfully");
//       reset();

//     } catch (err) {
//       console.log(err);
//       setError("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         style={{ maxWidth: "600px", margin: "3rem auto" }}
//       >
//         <Paper sx={{ p: 3, borderRadius: 3 }}>
//           <Typography variant="h5" gutterBottom>
//             Add Item
//           </Typography>

//           {success && <Alert severity="success">{success}</Alert>}
//           {error && <Alert severity="error">{error}</Alert>}

//           <Controller
//             name="item_name"
//             control={control}
//             rules={{ required: "Item Name is required" }}
//             render={({ field }) => (
//               <TextField {...field} label="Item Name" fullWidth margin="normal"
//                 error={!!errors.item_name}
//                 helperText={errors.item_name?.message}
//                 disabled={loading}
//               />
//             )}
//           />

//           <Controller
//             name="item_sku"
//             control={control}
//             rules={{ required: "Item SKU is required" }}
//             render={({ field }) => (
//               <TextField {...field} label="Item SKU" fullWidth margin="normal"
//                 error={!!errors.item_sku}
//                 helperText={errors.item_sku?.message}
//                 disabled={loading}
//               />
//             )}
//           />

//           <Controller
//             name="p_id"
//             control={control}
//             rules={{ required: "Product ID is required" }}
//             render={({ field }) => (
//               <TextField {...field} label="P ID" fullWidth margin="normal"
//                 error={!!errors.p_id}
//                 helperText={errors.p_id?.message}
//                 disabled={loading}
//               />
//             )}
//           />

//           <Controller
//             name="item_unit"
//             control={control}
//             rules={{ required: "Unit is required" }}
//             render={({ field }) => (
//               <TextField {...field} select label="Unit of Measure" fullWidth margin="normal"
//                 error={!!errors.item_unit}
//                 helperText={errors.item_unit?.message}
//                 disabled={loading}
//               >
//                 <MenuItem value="pcs">Pieces (PCS)</MenuItem>
//                 <MenuItem value="kgs">Kilograms (KGS)</MenuItem>
//                 <MenuItem value="gms">Grams (GMS)</MenuItem>
//               </TextField>
//             )}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             sx={{ mt: 2 }}
//             disabled={loading}
//           >
//             {loading ? <CircularProgress size={24} /> : "Add Item"}
//           </Button>

//         </Paper>
//       </form>
//     </Box>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
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
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { keyframes } from "@mui/system";

export default function ItemForm() {
  const router = useRouter();

  const brand = {
    navy: "#0f172a",
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",
    cyanDark: "#0e7490",
    amber: "#d97706",
    blueLight: "#dbeafe",
    amberLight: "#fef3c7",
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

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      p_id: "",
      item_name: "",
      item_unit: "",
      item_sku: "",
      userId: "",
    },
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recUserId, setRecUserId] = useState("");

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
    if (!recUserId) {
      setError("User not authenticated properly");
      return;
    }

    const payload = {
      ...data,
      userId: recUserId,
    };

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      await axios.post("/api/items_api", { payload });

      setSuccess("Item added successfully");
      reset();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
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
            icon={<InventoryIcon />}
            label="New Item"
            sx={{
              mx: "auto",
              width: "fit-content",
              borderRadius: "8px",
              backgroundColor: brand.amberLight,
              color: brand.amber,
              fontWeight: 900,
              "& .MuiChip-icon": {
                color: brand.amber,
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
            Add Item
          </Typography>

          <Typography sx={{ color: brand.muted }}>
            Add product SKU, unit, and product ID for inventory records.
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
            name="item_name"
            control={control}
            rules={{ required: "Item Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Item Name"
                fullWidth
                margin="normal"
                error={!!errors.item_name}
                helperText={errors.item_name?.message}
                disabled={loading}
                sx={inputStyle}
              />
            )}
          />

          <Controller
            name="item_sku"
            control={control}
            rules={{ required: "Item SKU is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Item SKU"
                fullWidth
                margin="normal"
                error={!!errors.item_sku}
                helperText={errors.item_sku?.message}
                disabled={loading}
                sx={inputStyle}
              />
            )}
          />

          <Controller
            name="p_id"
            control={control}
            rules={{ required: "Product ID is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="P ID"
                fullWidth
                margin="normal"
                error={!!errors.p_id}
                helperText={errors.p_id?.message}
                disabled={loading}
                sx={inputStyle}
              />
            )}
          />

          <Controller
            name="item_unit"
            control={control}
            rules={{ required: "Unit is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Unit of Measure"
                fullWidth
                margin="normal"
                error={!!errors.item_unit}
                helperText={errors.item_unit?.message}
                disabled={loading}
                sx={inputStyle}
              >
                <MenuItem value="pcs">Pieces (PCS)</MenuItem>
                <MenuItem value="kgs">Kilograms (KGS)</MenuItem>
                <MenuItem value="gms">Grams (GMS)</MenuItem>
              </TextField>
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
              "Add Item"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
