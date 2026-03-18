"use client";

import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Grid,
  Paper
} from "@mui/material";
import { useRouter } from "next/navigation";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InventoryIcon from "@mui/icons-material/Inventory";

export default function Home() {
  const router = useRouter();

  const signup = () => router.push("/signup");
  const signin = () => router.push("/signin");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">

          {/* LEFT CONTENT */}
          <Grid item xs={12} md={6}>
            <Stack spacing={4}>

              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ lineHeight: 1.3}}
              >
                ProLedger - ERP Based Billing & Accounting System
              </Typography>

              <Typography variant="h6" sx={{ color: "#cbd5f5" }}>
                Smart Billing, Accounting & Inventory Management for Modern Businesses.
              </Typography>

              <Typography sx={{ color: "#94a3b8" }}>
                Manage sales, customers, stock, and financial reports in one
                powerful ERP system designed for growing businesses.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={signup}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "12px",
                    background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  }}
                >
                  Start Free Trial
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={signin}
                  sx={{
                    px: 4,
                    py: 1.5,
                    borderRadius: "12px",
                    color: "#fff",
                    borderColor: "#475569",
                  }}
                >
                  Login
                </Button>
              </Stack>

            </Stack>
          </Grid>

          {/* RIGHT SIDE CARD */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: "20px",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Stack spacing={3}>

                <Typography variant="h6" fontWeight="bold">
                  Why Choose ProLedger?
                </Typography>

                <Stack direction="row" spacing={2} alignItems="center">
                  <TrendingUpIcon sx={{ color: "#6366f1" }} />
                  <Typography>Real-time Sales & Profit Tracking</Typography>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <AccountBalanceIcon sx={{ color: "#22c55e" }} />
                  <Typography>Advanced Accounting & GST Ready</Typography>
                </Stack>

                <Stack direction="row" spacing={2} alignItems="center">
                  <InventoryIcon sx={{ color: "#f59e0b" }} />
                  <Typography>Smart Inventory Management</Typography>
                </Stack>

              </Stack>
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}