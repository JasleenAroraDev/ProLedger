"use client";
import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Link,
  Stack,
  InputAdornment
} from "@mui/material";
import { useRouter } from "next/navigation";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";



export default function SignIn() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
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
                Welcome Back 👋
              </Typography>
              <Typography sx={{ color: "#94a3b8", mt: 1 }}>
                Login to your ProLedger ERP account
              </Typography>
            </Box>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit}>

              <TextField
                label="Email Address"
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
                sx={{
                  input: { color: "#fff" },
                  label: { color: "#94a3b8" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#475569" },
                    "&:hover fieldset": { borderColor: "#6366f1" },
                  },
                }}
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
                sx={{
                  input: { color: "#fff" },
                  label: { color: "#94a3b8" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "#475569" },
                    "&:hover fieldset": { borderColor: "#6366f1" },
                  },
                }}
              />

              <Button
              onClick={()=>router.push("/dashboard")}
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
                Sign In
              </Button>

              <Stack
                direction="row"
                justifyContent="space-between"
                mt={2}
              >
                <Link
                  href="/forgot-password"
                  underline="hover"
                  sx={{ color: "#94a3b8" }}
                >
                  Forgot Password?
                </Link>

                <Link
                  href="/signup"
                  underline="hover"
                  sx={{ color: "#6366f1" }}
                >
                  Create Account
                </Link>
              </Stack>

            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}