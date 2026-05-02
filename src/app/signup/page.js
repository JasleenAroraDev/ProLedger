// "use client";
// import React, { useState } from "react";
// import Alert from '@mui/material/Alert';

// import {
//   TextField,
//   Button,
//   FormControlLabel,
//   Checkbox,
//   FormGroup,
//   Typography,
// } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";

// import axios from "axios";
// import {useRouter} from 'next/navigation';

// export default function SignUpForm() {

//     const router = useRouter();

//   const {
//     control,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       fullName: "",
//       email: "",
//       phoneNumber: "",
//       password: "",
//       confirmPassword: "",
//       terms: false,
//     },
//   });

//   const [loading, setLoading] = useState(false);

//   const [success, setSuccess]= useState("");

//   const [error, setError] = useState("");

  

//   const passwordValue = watch("password");

//   const onSubmit = async (data) => {
//     setLoading(true);

//      try{
//       setSuccess('');
//       setError('');

//     setLoading(true);

//     const res = await axios.post("/api/signup_api",data);

//     console.log("This is my response ",res);

//   if(res.status==200)
//   {
//   setSuccess("Signed up Successfully");
//     reset();
//      router.push('/signin');
//   }

//     }
//     catch(err){
//      console.log("This is your error ",err);
     
// if(err.status==409)
// {
//   setError("This email is already Exists!!");
// }
// else{
//       setError("Signup FAiled");
// }
//     }
//     finally{
//       setLoading(false);
//     }
//   };
  
  
//   return (
//     <>

    


//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       style={{
//         maxWidth: "600px",
//         margin: "8rem auto",
//         padding: "2rem",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//       }}
//     >

//       {success && <Alert severity="success">{success}</Alert>}

//      {error && <Alert severity="error">{error}</Alert>}

//       <Typography variant="h5" gutterBottom>
//         Sign Up
//       </Typography>

//       {/* Full Name */}
//       <Controller
//         name="fullName"
//         control={control}
//         rules={{ required: "Full Name is required" }}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label="Full Name"
//             fullWidth
//             margin="normal"
//             error={!!errors.fullName}
//             helperText={errors.fullName?.message}
//           />
//         )}
//       />

//       {/* Email */}
//       <Controller
//         name="email"
//         control={control}
//         rules={{
//           required: "Email is required",
//           pattern: {
//             value: /^\S+@\S+\.\S+$/,
//             message: "Invalid email format",
//           },
//         }}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label="Email Address"
//             fullWidth
//             margin="normal"
//             error={!!errors.email}
//             helperText={errors.email?.message}
//           />
//         )}
//       />

//        <Controller
//         name="phoneNumber"
//         control={control}
//         rules={{
//           required: "Phone Number is required",
        
//         }}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label="Phone Number"
//             fullWidth
//             margin="normal"
//             error={!!errors.phoneNumber}
//             helperText={errors.phoneNumber?.message}
//           />
//         )}
//       />

//       {/* Password */}
//       <Controller
//         name="password"
//         control={control}
//         rules={{
//           required: "Password is required",
//           minLength: {
//             value: 6,
//             message: "Password must be at least 6 characters",
//           },
//         }}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             error={!!errors.password}
//             helperText={errors.password?.message}
//           />
//         )}
//       />

//       {/* Confirm Password */}
//       <Controller
//         name="confirmPassword"
//         control={control}
//         rules={{
//           required: "Confirm your password",
//           validate: (value) =>
//             value === passwordValue || "Passwords do not match",
//         }}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label="Confirm Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             error={!!errors.confirmPassword}
//             helperText={errors.confirmPassword?.message}
//           />
//         )}
//       />

//       {/* Terms & Conditions */}
//       <FormGroup>
//         <FormControlLabel
//           control={
//             <Controller
//               name="terms"
//               control={control}
//               rules={{ required: "You must accept the terms" }}
//               render={({ field }) => (
//                 <Checkbox
//                   {...field}
//                   checked={field.value}
//                 />
//               )}
//             />
//           }
//           label="I agree to the Terms & Conditions"
//         />
//         {errors.terms && (
//           <Typography color="error">
//             {errors.terms.message}
//           </Typography>
//         )}
//       </FormGroup>

//       {/* Submit Button */}
//       <Button
//         type="submit"
//         variant="contained"
//         fullWidth
//         sx={{ mt: 2, backgroundColor: "#5d5877", color: "black" }}
//         disabled={loading}
//       >
//         {loading ? "Creating account..." : "CREATE ACCOUNT"}
//       </Button>
//     </form>
//     </>
//   );
// }




"use client";

import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
  Paper,
  Box,
  Grid,
  Stack,
  Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import ShieldIcon from "@mui/icons-material/Shield";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LoginIcon from "@mui/icons-material/Login";
import { keyframes } from "@mui/system";

export default function SignUpForm() {
  const router = useRouter();

  const brand = {
    navy: "#0f172a",
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",
    emerald: "#059669",
    blueLight: "#dbeafe",
    surface: "#ffffff",
    text: "#334155",
    muted: "#64748b",
    border: "#dbe5f0",
  };

  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(28px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const floatSoft = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0); }
  `;

  const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.25); }
    70% { box-shadow: 0 0 0 12px rgba(37, 99, 235, 0); }
    100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
  `;

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const passwordValue = watch("password");

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      color: brand.navy,
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
    "& .MuiInputLabel-root": {
      color: brand.muted,
      fontWeight: 600,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: brand.primary,
    },
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      setSuccess("");
      setError("");

      const res = await axios.post("/api/signup_api", data);

      if (res.status == 200) {
        setSuccess("Signed up successfully");
        reset();
        router.push("/signin");
      }
    } catch (err) {
      if (err.status == 409) {
        setError("This email already exists!");
      } else {
        setError("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 12% 12%, rgba(37,99,235,0.14), transparent 30%), radial-gradient(circle at 88% 20%, rgba(8,145,178,0.14), transparent 28%), linear-gradient(135deg, #f8fafc 0%, #eef6ff 48%, #ecfeff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        py: { xs: 4, md: 6 },
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          maxWidth: "1140px",
          minHeight: { xs: "auto", md: "680px" },
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "rgba(255,255,255,0.86)",
          border: `1px solid ${brand.blueLight}`,
          boxShadow: "0 34px 90px rgba(15, 23, 42, 0.16)",
          backdropFilter: "blur(18px)",
          animation: `${fadeUp} 0.75s ease both`,
        }}
      >
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: { xs: "none", md: "flex" },
            position: "relative",
            overflow: "hidden",
            p: 4,
            color: "#ffffff",
            background:
              "linear-gradient(145deg, #0f172a 0%, #1d4ed8 58%, #0891b2 100%)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack spacing={3} sx={{ position: "relative", zIndex: 1 }}>
            <Box
              sx={{
                width: "fit-content",
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                p: 1.1,
              }}
            >
              <img
                src="/proLedgerLogo.png"
                alt="ProLedger Logo"
                style={{
                  width: "165px",
                  height: "auto",
                  display: "block",
                }}
              />
            </Box>

            <Chip
              icon={<ShieldIcon />}
              label="Secure ERP Signup"
              sx={{
                width: "fit-content",
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.13)",
                color: "#ffffff",
                fontWeight: 900,
                border: "1px solid rgba(255,255,255,0.22)",
                animation: `${pulse} 2.8s infinite`,
                "& .MuiChip-icon": { color: "#ffffff" },
              }}
            />

            <Typography
              sx={{
                fontSize: "2.35rem",
                lineHeight: 1.08,
                fontWeight: 900,
                letterSpacing: 0,
              }}
            >
              Start managing your business with a smarter ERP system.
            </Typography>

            <Typography sx={{ color: "#dbeafe", lineHeight: 1.7 }}>
              Create your ProLedger account to control billing, accounting,
              inventory, customers, suppliers, and reports from one dashboard.
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: 2,
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                animation: `${floatSoft} 4.8s ease-in-out infinite`,
              }}
            >
              <img
                src="/landingPhoto.png"
                alt="ERP Signup"
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </Paper>

            <Stack spacing={1.2}>
              {[
                {
                  icon: <TrendingUpIcon />,
                  text: "Live sales and profit tracking",
                },
                {
                  icon: <AccountBalanceIcon />,
                  text: "GST-ready accounting reports",
                },
                {
                  icon: <InventoryIcon />,
                  text: "Smart inventory management",
                },
              ].map((item) => (
                <Stack
                  key={item.text}
                  direction="row"
                  spacing={1.2}
                  alignItems="center"
                >
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      borderRadius: "8px",
                      display: "grid",
                      placeItems: "center",
                      backgroundColor: "rgba(255,255,255,0.14)",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography fontWeight={800}>{item.text}</Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              minHeight: { xs: "auto", md: "680px" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: { xs: 2.4, sm: 4, md: 5 },
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 540,
                mx: "auto",
              }}
            >
              <Stack spacing={1} sx={{ mb: 2.5, textAlign: "center" }}>
                <Typography
                  variant="h4"
                  fontWeight={900}
                  sx={{ color: brand.navy, letterSpacing: 0 }}
                >
                  Create Account
                </Typography>

                <Typography sx={{ color: brand.muted, lineHeight: 1.65 }}>
                  Sign up and access your modern ERP workspace.
                </Typography>
              </Stack>

              <Stack spacing={1.2}>
                {success && <Alert severity="success">{success}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
              </Stack>

              <Controller
                name="fullName"
                control={control}
                rules={{ required: "Full Name is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Full Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.fullName}
                    helperText={errors.fullName?.message}
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
                    message: "Invalid email format",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email Address"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    sx={inputStyle}
                  />
                )}
              />

              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: "Phone Number is required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    margin="normal"
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    sx={inputStyle}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    sx={inputStyle}
                  />
                )}
              />

              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  required: "Confirm your password",
                  validate: (value) =>
                    value === passwordValue || "Passwords do not match",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirm Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    sx={inputStyle}
                  />
                )}
              />

              <FormGroup sx={{ mt: 1 }}>
                <FormControlLabel
                  control={
                    <Controller
                      name="terms"
                      control={control}
                      rules={{ required: "You must accept the terms" }}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          checked={field.value}
                          sx={{
                            color: brand.primary,
                            "&.Mui-checked": {
                              color: brand.primary,
                            },
                          }}
                        />
                      )}
                    />
                  }
                  label={
                    <Typography sx={{ color: brand.text, fontWeight: 600 }}>
                      I agree to the Terms & Conditions
                    </Typography>
                  }
                />
                {errors.terms && (
                  <Typography color="error" variant="body2">
                    {errors.terms.message}
                  </Typography>
                )}
              </FormGroup>

              <Button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                fullWidth
                endIcon={<ArrowForwardIcon />}
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.55,
                  borderRadius: "8px",
                  fontWeight: 900,
                  textTransform: "none",
                  color: "#ffffff",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
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
                {loading ? "Creating account..." : "Create Account"}
              </Button>

              <Button
                fullWidth
                startIcon={<LoginIcon />}
                onClick={() => router.push("/signin")}
                sx={{
                  mt: 1.4,
                  py: 1.25,
                  borderRadius: "8px",
                  textTransform: "none",
                  fontWeight: 800,
                  color: brand.navy,
                  backgroundColor: "#ffffff",
                  border: `1px solid ${brand.border}`,
                  "&:hover": {
                    backgroundColor: "#f8fafc",
                    borderColor: brand.primary,
                  },
                }}
              >
                Already have an account? Login
              </Button>

              <Stack
                direction="row"
                spacing={0.8}
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 2.2 }}
              >
                <CheckCircleIcon sx={{ fontSize: 18, color: brand.emerald }} />
                <Typography
                  variant="body2"
                  sx={{ color: brand.muted, fontWeight: 700 }}
                >
                  Secure signup with encrypted business data
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
