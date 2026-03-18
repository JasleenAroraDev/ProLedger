"use client";
import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Stack,
  InputAdornment,
  Link
} from "@mui/material";
import { useRouter } from "next/navigation";

import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LockIcon from "@mui/icons-material/Lock";

export default function SignUp() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log("Form Data:", formData);

    router.push("/create_company");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: "20px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff",
          }}
        >
          <Stack spacing={3}>

            {/* Title */}
            <Box textAlign="center">
              <Typography variant="h4" fontWeight="bold">
                Create Account 🚀
              </Typography>
              <Typography sx={{ color: "#94a3b8", mt: 1 }}>
                Start your journey with ProLedger ERP
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>

              <TextField
                label="Full Name"
                name="fullName"
                fullWidth
                required
                margin="normal"
                value={formData.fullName}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: "#94a3b8" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle}
              />

              <TextField
                label="Work Email"
                name="email"
                type="email"
                fullWidth
                required
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: "#94a3b8" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle}
              />

              <TextField
                label="Mobile Number"
                name="mobile"
                type="tel"
                fullWidth
                required
                margin="normal"
                value={formData.mobile}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: "#94a3b8" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle}
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                required
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#94a3b8" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle}
              />

              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                fullWidth
                required
                margin="normal"
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon sx={{ color: "#94a3b8" }} />
                    </InputAdornment>
                  ),
                }}
                sx={inputStyle}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  py: 1.5,
                  borderRadius: "12px",
                  fontWeight: "bold",
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                }}
              >
                Sign Up
              </Button>

              <Box textAlign="center" mt={2}>
                <Typography sx={{ color: "#94a3b8" }}>
                  Already have an account?{" "}
                  <Link href="/signin" sx={{ color: "#6366f1" }}>
                    Login
                  </Link>
                </Typography>
              </Box>

            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}

/* Common Input Style */
const inputStyle = {
  input: { color: "#fff" },
  label: { color: "#94a3b8" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#475569" },
    "&:hover fieldset": { borderColor: "#6366f1" },
  },
};