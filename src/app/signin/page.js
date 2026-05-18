// "use client";
// import React, { useState } from "react";
// import { TextField, Button, Typography } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
// import Alert from '@mui/material/Alert';

// import {useRouter} from 'next/navigation';

// const SignInForm = () => {

//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//    const [success, setSuccess]= useState("");
//   const [error, setError] = useState("");
     

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });


//   const onSubmit = async (data)=>{

//     try{

//     setSuccess('');
//       setError('');

//     setLoading(true);

//     const res = await axios.post("/api/signin_api", data);

    

//     const gotToken = res.data.generatedToken;

//     console.log ("This is my token", gotToken);

//     localStorage.setItem("Token",gotToken);

//     if(res.status==200)
//   {
//   setSuccess("Signed up Successfully");

//      router.push('/dashboard');
//   }

 
    
//   }


//   catch(err){
//      if(err.status==401)
// {
//   setError("Invalid password");
// }
// else{
//       setError("Signin Failed");
// }
//   }

//   finally{
//     setLoading(false);
//   }
//   }
  
//   return (
// <>
    
  
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       style={{
//         maxWidth: "600px",
//         margin: "10rem auto",
//         padding: "2rem",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//       }}
//     >


//     {success && <Alert severity="success">{success}</Alert>}
    
//     {error && <Alert severity="error">{error}</Alert>}

//       <Typography variant="h5" gutterBottom>
//         Sign In
//       </Typography>

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

//       {/* Submit Button */}
//       <Button
//         type="submit"
//         variant="contained"
//         fullWidth
//         sx={{ mt: 2, backgroundColor: "#5d5877", color: "black" }}
//         disabled={loading}
//       >
//         {loading ? "Signing in..." : "SIGN IN"}
//       </Button>
//     </form>
//     </>
    
//   );
// };

// export default SignInForm;




"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  Stack,
  Chip,
  Alert,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import LoginIcon from "@mui/icons-material/Login";
import ShieldIcon from "@mui/icons-material/Shield";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

import { keyframes } from "@mui/system";

const SignInForm = () => {
  const router = useRouter();

  const brand = {
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",

    border: "rgba(255,255,255,0.45)",

    text: "#334155",
    muted: "#475569",

    input: "rgba(255,255,255,0.55)",
  };

  // ANIMATIONS

  const fadeUp = keyframes`
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const floatSoft = keyframes`
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0px);
    }
  `;

  const pulseGlow = keyframes`
    0% {
      box-shadow: 0 0 0 rgba(37,99,235,0.15);
    }
    50% {
      box-shadow: 0 0 35px rgba(37,99,235,0.28);
    }
    100% {
      box-shadow: 0 0 0 rgba(37,99,235,0.15);
    }
  `;

  const slideLeft = keyframes`
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  `;

  const zoomIn = keyframes`
    from {
      opacity: 0;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  `;

  const rotateSoft = keyframes`
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(4deg);
    }
    100% {
      transform: rotate(0deg);
    }
  `;

  const shimmer = keyframes`
    0% {
      background-position: -400px 0;
    }
    100% {
      background-position: 400px 0;
    }
  `;

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "14px",
      backgroundColor: brand.input,
      color: "#0f172a",
      fontWeight: 600,

      transition: "0.3s ease",

      "& fieldset": {
        borderColor: "rgba(255,255,255,0.55)",
      },

      "&:hover": {
        transform: "translateY(-2px)",
      },

      "&:hover fieldset": {
        borderColor: "#60a5fa",
      },

      "&.Mui-focused": {
        transform: "scale(1.01)",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#2563eb",
        borderWidth: "2px",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#1e3a8a",
      fontWeight: 700,
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#2563eb",
    },

    "& input": {
      color: "#0f172a",
    },
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      const res = await axios.post("/api/signin_api", data);

      const gotToken = res.data.generatedToken;

      localStorage.setItem("Token", gotToken);

      if (res.status === 200) {
        setSuccess("Signed in successfully");
        router.push("/dashboard");
      }
    } catch (err) {
      if (err?.response?.status === 401) {
        setError("Invalid password");
      } else {
        setError("Signin failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <ReceiptLongIcon />,
      title: "Invoices",
      text: "Generate invoices instantly",
      color: "#2563eb",
      bg: "rgba(37,99,235,0.12)",
    },

    {
      icon: <AccountBalanceWalletIcon />,
      title: "Finance",
      text: "Track expenses & GST",
      color: "#0891b2",
      bg: "rgba(8,145,178,0.12)",
    },

    {
      icon: <Inventory2Icon />,
      title: "Inventory",
      text: "Manage stock smartly",
      color: "#0284c7",
      bg: "rgba(2,132,199,0.12)",
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",

        px: 2,
        py: { xs: 4, md: 6 },

        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        position: "relative",
        overflow: "hidden",

        background:
          "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 45%, #bae6fd 100%)",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,

          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)",

          backgroundSize: "42px 42px",
        },
      }}
    >
      {/* FLOATING CIRCLES */}

      <Box
        sx={{
          position: "absolute",
          width: 240,
          height: 240,
          borderRadius: "50%",
          background: "rgba(37,99,235,0.10)",
          top: -60,
          left: -60,
          filter: "blur(20px)",
          animation: `${floatSoft} 6s ease-in-out infinite`,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(8,145,178,0.10)",
          bottom: -80,
          right: -80,
          filter: "blur(25px)",
          animation: `${floatSoft} 8s ease-in-out infinite`,
        }}
      />

      <Grid
        container
        spacing={{ xs: 3, md: 5 }}
        alignItems="center"
        sx={{
          width: "100%",
          maxWidth: "1180px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* LEFT SECTION */}

        <Grid item xs={12} md={6}>
          <Stack
            spacing={3}
            sx={{
              animation: `${fadeUp} 0.8s ease`,
            }}
          >
            {/* LOGO */}

            <Box
              sx={{
                width: "fit-content",
                p: 1.1,
                borderRadius: "18px",

                background: "rgba(255,255,255,0.45)",

                border: `1px solid ${brand.border}`,

                backdropFilter: "blur(18px)",

                boxShadow: "0 12px 30px rgba(37,99,235,0.10)",

                animation: `${zoomIn} 1s ease`,
              }}
            >
              <img
                src="/proLedgerLogo.png"
                alt="logo"
                style={{
                  width: "260px",
                  maxWidth: "100%",
                  display: "block",
                }}
              />
            </Box>

            {/* CHIP */}

            <Chip
              icon={<ShieldIcon />}
              label="Secure ERP Login"
              sx={{
                width: "fit-content",

                borderRadius: "12px",

                background: "rgba(255,255,255,0.45)",

                color: "#1e3a8a",

                fontWeight: 900,

                border: `1px solid ${brand.border}`,

                animation: `${pulseGlow} 3s infinite`,
              }}
            />

            {/* TITLE */}

            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "2.3rem", md: "3.4rem" },
                  lineHeight: 1.05,
                  fontWeight: 900,
                  color: "#0f172a",
                  maxWidth: 620,

                  animation: `${slideLeft} 1s ease`,
                }}
              >
                Welcome back to your smart ERP workspace.
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: "#475569",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  maxWidth: 560,
                }}
              >
                Manage invoices, accounts, inventory, GST reports,
                customers and business analytics from one modern dashboard.
              </Typography>
            </Box>

            {/* FEATURES */}

            <Grid container spacing={1.5}>
              {features.map((item, index) => (
                <Grid item xs={12} sm={4} key={item.title}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,

                      borderRadius: "18px",

                      border: `1px solid rgba(255,255,255,0.5)`,

                      background: "rgba(255,255,255,0.35)",

                      backdropFilter: "blur(18px)",

                      boxShadow:
                        "0 10px 25px rgba(37,99,235,0.08)",

                      transition: "0.35s ease",

                      animation: `${fadeUp} ${0.8 + index * 0.2}s ease`,

                      "&:hover": {
                        transform: "translateY(-8px) scale(1.03)",
                        boxShadow:
                          "0 18px 40px rgba(37,99,235,0.16)",
                      },
                    }}
                  >
                    <Stack spacing={1.2}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,

                          borderRadius: "12px",

                          display: "grid",
                          placeItems: "center",

                          color: item.color,
                          backgroundColor: item.bg,

                          animation: `${rotateSoft} 5s ease-in-out infinite`,
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Box>
                        <Typography
                          fontWeight={800}
                          sx={{ color: "#0f172a" }}
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{ color: "#475569" }}
                        >
                          {item.text}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {/* IMAGE */}

            <Paper
              elevation={0}
              sx={{
                p: 2,
                maxWidth: 560,

                borderRadius: "22px",

                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.22) 100%)",

                border: `1px solid rgba(255,255,255,0.5)`,

                backdropFilter: "blur(18px)",

                animation: `${floatSoft} 5s ease-in-out infinite`,

                boxShadow: "0 14px 40px rgba(37,99,235,0.10)",

                overflow: "hidden",

                position: "relative",

                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                  backgroundSize: "400px 100%",
                  animation: `${shimmer} 4s linear infinite`,
                },
              }}
            >
              <img
                src="/landingImage.png"
                alt="ERP Illustration"
                style={{
                  width: "100%",
                  display: "block",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </Paper>
          </Stack>
        </Grid>

        {/* RIGHT SECTION */}

        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 520,

              ml: { xs: "auto", md: "auto" },
              mr: "auto",

              p: { xs: 3, sm: 4 },

              borderRadius: "24px",

              background: "rgba(255,255,255,0.40)",

              border: `1px solid rgba(255,255,255,0.55)`,

              backdropFilter: "blur(18px)",

              boxShadow: "0 20px 60px rgba(37,99,235,0.12)",

              animation: `${zoomIn} 0.9s ease`,
            }}
          >
            <Stack spacing={1} sx={{ mb: 2.5, textAlign: "center" }}>
              <Chip
                icon={<CheckCircleIcon />}
                label="Welcome Back"
                sx={{
                  mx: "auto",

                  width: "fit-content",

                  borderRadius: "10px",

                  backgroundColor: "rgba(37,99,235,0.12)",

                  color: "#1e3a8a",

                  fontWeight: 900,

                  animation: `${pulseGlow} 3s infinite`,
                }}
              />

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: "#0f172a",
                }}
              >
                Sign In
              </Typography>

              <Typography sx={{ color: "#475569" }}>
                Access your ProLedger dashboard.
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

            {/* EMAIL */}

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
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

            {/* PASSWORD */}

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
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

            {/* BUTTON */}

            <Button
              fullWidth
              onClick={handleSubmit(onSubmit)}
              endIcon={<ArrowForwardIcon />}
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.6,

                borderRadius: "14px",

                fontWeight: 900,

                textTransform: "none",

                color: "#ffffff",

                background:
                  "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",

                boxShadow:
                  "0 14px 30px rgba(37, 99, 235, 0.20)",

                transition: "0.35s ease",

                "&:hover": {
                  transform: "translateY(-4px) scale(1.01)",

                  background:
                    "linear-gradient(135deg, #1d4ed8 0%, #0e7490 100%)",

                  boxShadow:
                    "0 22px 45px rgba(37,99,235,0.28)",
                },
              }}
            >
              {loading ? "Signing in..." : "Open Dashboard"}
            </Button>

            {/* SIGNUP */}

            <Button
              fullWidth
              startIcon={<LoginIcon />}
              onClick={() => router.push("/signup")}
              sx={{
                mt: 1.5,
                py: 1.4,

                borderRadius: "14px",

                textTransform: "none",

                fontWeight: 800,

                color: "#0f172a",

                backgroundColor: "rgba(255,255,255,0.25)",

                border: `1px solid rgba(255,255,255,0.4)`,

                transition: "0.3s ease",

                "&:hover": {
                  backgroundColor:
                    "rgba(255,255,255,0.38)",

                  transform: "translateY(-3px)",

                  borderColor: brand.primary,
                },
              }}
            >
              Create New Account
            </Button>

            {/* BOTTOM INFO */}

            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 3 }}
            >
              <TrendingUpIcon
                sx={{
                  color: "#2563eb",
                  animation: `${floatSoft} 3s infinite`,
                }}
              />

              <Typography
                sx={{
                  color: "#475569",
                  fontWeight: 700,
                }}
              >
                Smart business management platform
              </Typography>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInForm;