
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
import LoginIcon from "@mui/icons-material/Login";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

import { keyframes } from "@mui/system";

export default function SignUpForm() {
  const router = useRouter();

  const brand = {
    navy: "#f8fafc",

    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",
    emerald: "#0ea5e9",

    blueLight: "rgba(37,99,235,0.16)",
    cyanLight: "rgba(8,145,178,0.16)",
    emeraldLight: "rgba(14,165,233,0.16)",

    border: "rgba(255,255,255,0.18)",

    text: "#e0f2fe",
    muted: "#dbeafe",

    card: "rgba(255,255,255,0.14)",
    input: "rgba(255,255,255,0.22)",
  };

  const fadeUp = keyframes`
    from {
      opacity: 0;
      transform: translateY(18px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  const floatSoft = keyframes`
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-8px);
    }

    100% {
      transform: translateY(0);
    }
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
    width: "100%",

    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: brand.input,
      color: "#0f172a",
      fontWeight: 600,

      "& fieldset": {
        borderColor: "rgba(255,255,255,0.22)",
      },

      "&:hover fieldset": {
        borderColor: "#60a5fa",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#2563eb",
        borderWidth: "2px",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#1e3a8a",
      fontWeight: 600,
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#2563eb",
    },

    "& input": {
      color: "#0f172a",
    },

    "& .MuiFormHelperText-root": {
      color: "#dc2626",
    },
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      setSuccess("");
      setError("");

      const res = await axios.post("/api/signup_api", data);

      if (res.status === 200) {
        setSuccess("Signed up successfully");
        reset();
        router.push("/signin");
      }
    } catch (err) {
      if (err?.response?.status === 409) {
        setError("This email already exists!");
      } else {
        setError("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <ReceiptLongIcon />,
      title: "Billing",
      text: "Create invoices faster",
      color: "#2563eb",
      bg: "rgba(37,99,235,0.14)",
    },

    {
      icon: <AssessmentIcon />,
      title: "Reports",
      text: "View business insights",
      color: "#0891b2",
      bg: "rgba(8,145,178,0.14)",
    },

    {
      icon: <PeopleAltIcon />,
      title: "Customers",
      text: "Manage customer records",
      color: "#0284c7",
      bg: "rgba(2,132,199,0.14)",
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

        // LIGHT SKY BLUE BACKGROUND
        background:
          "linear-gradient(135deg, #e0f2fe 0%, #dbeafe 45%, #bae6fd 100%)",

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
      <Grid
        container
        spacing={{ xs: 3, md: 5 }}
        alignItems="center"
        sx={{
          width: "100%",
          maxWidth: "1180px",
          position: "relative",
          zIndex: 1,
          animation: `${fadeUp} 0.7s ease both`,
        }}
      >
        {/* LEFT SECTION */}

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Box
              sx={{
                width: "fit-content",
                p: 1.1,
                borderRadius: "14px",

                background: "rgba(255,255,255,0.45)",

                border: `1px solid rgba(255,255,255,0.5)`,

                backdropFilter: "blur(18px)",

                boxShadow: "0 12px 30px rgba(37,99,235,0.12)",
              }}
            >
              <img
                src="/proLedgerLogo.png"
                alt="ProLedger Logo"
                style={{
                  width: "260px",
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                }}
              />
            </Box>

            <Chip
              icon={<ShieldIcon />}
              label="Secure ERP Workspace"
              sx={{
                width: "fit-content",

                borderRadius: "10px",

                background: "rgba(255,255,255,0.45)",

                color: "#1e3a8a",

                fontWeight: 900,

                border: `1px solid rgba(255,255,255,0.5)`,

                "& .MuiChip-icon": {
                  color: "#2563eb",
                },
              }}
            />

            <Box>
              <Typography
                sx={{
                  fontSize: { xs: "2.3rem", md: "3.3rem" },
                  lineHeight: 1.05,
                  fontWeight: 900,
                  color: "#0f172a",
                  maxWidth: 610,
                }}
              >
                Create your ERP workspace for smarter business control.
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: "#334155",
                  fontSize: "1.05rem",
                  lineHeight: 1.8,
                  maxWidth: 560,
                }}
              >
                Start using ProLedger to manage billing, accounting,
                inventory, customers, suppliers, GST reports, and
                business analytics from one professional dashboard.
              </Typography>
            </Box>

            <Grid container spacing={1.5}>
              {features.map((item) => (
                <Grid item xs={12} sm={4} key={item.title}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1.8,

                      borderRadius: "14px",

                      border: `1px solid rgba(255,255,255,0.5)`,

                      background: "rgba(255,255,255,0.38)",

                      backdropFilter: "blur(16px)",

                      boxShadow:
                        "0 10px 25px rgba(37,99,235,0.08)",
                    }}
                  >
                    <Stack spacing={1}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,

                          borderRadius: "10px",

                          display: "grid",
                          placeItems: "center",

                          color: item.color,
                          backgroundColor: item.bg,
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

            <Paper
              elevation={0}
              sx={{
                p: 2,
                maxWidth: 560,

                borderRadius: "18px",

                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.20) 100%)",

                border: `1px solid rgba(255,255,255,0.5)`,

                backdropFilter: "blur(18px)",

                animation: `${floatSoft} 5s ease-in-out infinite`,

                boxShadow: "0 14px 40px rgba(37,99,235,0.10)",
              }}
            >
              <img
                src="/landingImage.png"
                alt="ERP Illustration"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
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

              p: { xs: 2.5, sm: 4 },

              borderRadius: "20px",

              background: "rgba(255,255,255,0.40)",

              border: `1px solid rgba(255,255,255,0.5)`,

              backdropFilter: "blur(18px)",

              boxShadow: "0 20px 60px rgba(37,99,235,0.12)",
            }}
          >
            <Stack spacing={1} sx={{ mb: 2.5, textAlign: "center" }}>
              <Chip
                icon={<CheckCircleIcon />}
                label="Start free"
                sx={{
                  mx: "auto",

                  width: "fit-content",

                  borderRadius: "10px",

                  backgroundColor: "rgba(37,99,235,0.12)",

                  color: "#1e3a8a",

                  fontWeight: 900,

                  "& .MuiChip-icon": {
                    color: "#2563eb",
                  },
                }}
              />

              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  color: "#0f172a",
                }}
              >
                Create Account
              </Typography>

              <Typography sx={{ color: "#475569" }}>
                Enter your details to activate your ERP dashboard.
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
                  message: "Minimum 6 characters",
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
                  value === passwordValue ||
                  "Passwords do not match",
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
                    rules={{
                      required: "Accept terms & conditions",
                    }}
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
                  <Typography sx={{ color: "#475569" }}>
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
              fullWidth
              onClick={handleSubmit(onSubmit)}
              endIcon={<ArrowForwardIcon />}
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,

                borderRadius: "12px",

                fontWeight: 900,

                textTransform: "none",

                color: "#ffffff",

                background:
                  "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",

                boxShadow:
                  "0 14px 30px rgba(37, 99, 235, 0.20)",

                "&:hover": {
                  background:
                    "linear-gradient(135deg, #1d4ed8 0%, #0e7490 100%)",
                },
              }}
            >
              {loading
                ? "Creating account..."
                : "Create Account"}
            </Button>

            <Button
              fullWidth
              startIcon={<LoginIcon />}
              onClick={() => router.push("/signin")}
              sx={{
                mt: 1.5,
                py: 1.3,

                borderRadius: "12px",

                textTransform: "none",

                fontWeight: 800,

                color: "#0f172a",

                backgroundColor: "rgba(255,255,255,0.22)",

                border: `1px solid rgba(255,255,255,0.4)`,

                "&:hover": {
                  backgroundColor:
                    "rgba(255,255,255,0.32)",

                  borderColor: brand.primary,
                },
              }}
            >
              Already have an account? Login
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
