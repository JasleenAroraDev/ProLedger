
"use client";

import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Stack,
  Chip,
} from "@mui/material";

import { BarChart, PieChart } from "@mui/x-charts";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InsightsIcon from "@mui/icons-material/Insights";
import { keyframes } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const brand = {
    navy: "#0f172a",
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",
    cyanDark: "#0e7490",
    emerald: "#059669",
    amber: "#d97706",
    blueLight: "#dbeafe",
    cyanLight: "#cffafe",
    emeraldLight: "#dcfce7",
    amberLight: "#fef3c7",
    surface: "#ffffff",
    text: "#334155",
    muted: "#64748b",
    border: "#dbe5f0",
  };

  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(22px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const floatSoft = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0); }
  `;

  const shine = keyframes`
    0% { transform: translateX(-120%); }
    100% { transform: translateX(160%); }
  `;

  const pulseSoft = keyframes`
    0% { box-shadow: 0 0 0 rgba(37, 99, 235, 0.08); }
    50% { box-shadow: 0 0 34px rgba(37, 99, 235, 0.16); }
    100% { box-shadow: 0 0 0 rgba(37, 99, 235, 0.08); }
  `;

  const [recUserId, setRecUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState([
    {
      title: "Total Sales",
      value: 0,
      icon: <TrendingUpIcon />,
      color: "#2563eb",
      bg: "#dbeafe",
    },
    {
      title: "Total Customers",
      value: 0,
      icon: <PeopleIcon />,
      color: "#059669",
      bg: "#dcfce7",
    },
    {
      title: "Total Revenue",
      value: 0,
      icon: <CurrencyRupeeIcon />,
      color: "#d97706",
      bg: "#fef3c7",
    },
  ]);

  const [series, setSeries] = useState([
    {
      data: [
        { id: 0, value: 0, label: "Active", color: "#2563eb" },
        { id: 1, value: 0, label: "Inactive", color: "#0891b2" },
      ],
      innerRadius: 60,
    },
  ]);

  const [xaxis, setXaxis] = useState([
    {
      scaleType: "band",
      data: ["Jan", "Feb", "March", "April"],
    },
  ]);

  const [serie, setSerie] = useState([
    {
      data: [0, 0, 0, 0],
      color: "#2563eb",
    },
  ]);

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
        console.log(err);
        router.push("/signin");
      }
    };

    testToken();
  }, [router]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const res = await axios.post("/api/dashboard_api", {
          userId: recUserId,
        });

        if (res.data?.valid) {
          setStats([
            {
              title: "Total Sales",
              value: res.data.totalSale,
              icon: <TrendingUpIcon />,
              color: brand.primary,
              bg: brand.blueLight,
            },
            {
              title: "Total Customers",
              value: res.data.totalCustomers,
              icon: <PeopleIcon />,
              color: brand.emerald,
              bg: brand.emeraldLight,
            },
            {
              title: "Total Revenue",
              value: res.data.totalRevenue,
              icon: <CurrencyRupeeIcon />,
              color: brand.amber,
              bg: brand.amberLight,
            },
          ]);

          setSeries([
            {
              data: [
                {
                  id: 0,
                  value: Number(res.data.Active_user),
                  label: "Active",
                  color: brand.primary,
                },
                {
                  id: 1,
                  value: Number(res.data.inActive_user),
                  label: "Inactive",
                  color: brand.cyan,
                },
              ],
              innerRadius: 60,
            },
          ]);

          setXaxis([
            {
              scaleType: "band",
              data: res.data.sale_overview.map((item) => item.month),
            },
          ]);

          setSerie([
            {
              data: res.data.sale_overview.map((item) => Number(item.total)),
              color: brand.primary,
            },
          ]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (recUserId) {
      fetchDashboard();
    }
  }, [recUserId]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef6ff 48%, #ecfeff 100%)",
        p: { xs: 2, md: 3 },
        animation: `${fadeUp} 0.65s ease both`,
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.055) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 3, animation: `${fadeUp} 0.7s ease both` }}
        >
          <Box>
            <Chip
              icon={<AssessmentIcon />}
              label="ERP Analytics"
              sx={{
                mb: 1.2,
                borderRadius: "8px",
                backgroundColor: brand.blueLight,
                color: brand.primaryDark,
                fontWeight: 900,
                border: `1px solid ${brand.border}`,
                animation: `${pulseSoft} 3s ease-in-out infinite`,
                "& .MuiChip-icon": {
                  color: brand.primary,
                },
              }}
            />

            <Typography
              variant="h4"
              fontWeight={900}
              sx={{ color: brand.navy, letterSpacing: 0 }}
            >
              Business Dashboard
            </Typography>

            <Typography sx={{ color: brand.muted, mt: 0.5 }}>
              A live overview of sales, customers, revenue, and business movement.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Chip
              icon={<CheckCircleIcon />}
              label="Live Data"
              sx={{
                borderRadius: "8px",
                backgroundColor: brand.emeraldLight,
                color: brand.emerald,
                fontWeight: 900,
                animation: `${floatSoft} 3.2s ease-in-out infinite`,
                "& .MuiChip-icon": {
                  color: brand.emerald,
                },
              }}
            />

            <Chip
              icon={<InsightsIcon />}
              label="ERP Ready"
              sx={{
                borderRadius: "8px",
                backgroundColor: brand.cyanLight,
                color: brand.cyan,
                fontWeight: 900,
                animation: `${floatSoft} 3.6s ease-in-out infinite`,
                "& .MuiChip-icon": {
                  color: brand.cyan,
                },
              }}
            />
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          {stats.map((item, i) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  minHeight: 158,
                  borderRadius: "8px",
                  backgroundColor: "rgba(255,255,255,0.94)",
                  border: `1px solid ${brand.border}`,
                  boxShadow: "0 18px 50px rgba(15, 23, 42, 0.07)",
                  position: "relative",
                  overflow: "hidden",
                  animation: `${fadeUp} ${0.72 + i * 0.14}s ease both`,
                  transition: "all 0.28s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    borderColor: item.color,
                    boxShadow: "0 26px 66px rgba(15, 23, 42, 0.12)",
                  },
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${item.bg} 0%, transparent 58%)`,
                    opacity: 0.8,
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    width: "42%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.72), transparent)",
                    animation: `${shine} 4.4s ease-in-out infinite`,
                    pointerEvents: "none",
                  },
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ position: "relative", zIndex: 1 }}
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: brand.muted, fontWeight: 900 }}
                    >
                      {item.title}
                    </Typography>

                    {loading ? (
                      <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1.5 }}>
                        <CircularProgress
                          size={30}
                          thickness={5}
                          sx={{ color: item.color }}
                        />
                        <Typography
                          variant="body2"
                          sx={{ color: brand.muted, fontWeight: 800 }}
                        >
                          Loading...
                        </Typography>
                      </Stack>
                    ) : (
                      <Typography
                        variant="h3"
                        fontWeight={900}
                        sx={{ color: brand.navy, lineHeight: 1.15, mt: 0.5 }}
                      >
                        {item.value}
                      </Typography>
                    )}
                  </Box>

                  <Box
                    sx={{
                      width: 58,
                      height: 58,
                      borderRadius: "8px",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: item.bg,
                      color: item.color,
                      flexShrink: 0,
                      boxShadow: "0 14px 28px rgba(15, 23, 42, 0.08)",
                      animation: `${floatSoft} ${3.2 + i * 0.3}s ease-in-out infinite`,
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        size={24}
                        thickness={5}
                        sx={{ color: item.color }}
                      />
                    ) : (
                      item.icon
                    )}
                  </Box>
                </Stack>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: 5,
                    width: "100%",
                    background: `linear-gradient(90deg, ${item.color}, transparent)`,
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} sx={{ mt: 0.5 }}>
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.94)",
                border: `1px solid ${brand.blueLight}`,
                boxShadow: "0 18px 50px rgba(15, 23, 42, 0.07)",
                animation: `${fadeUp} 1s ease both`,
                transition: "all 0.28s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 24px 62px rgba(15, 23, 42, 0.1)",
                },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Box>
                  <Typography fontWeight={900} sx={{ color: brand.navy }}>
                    Sales Overview
                  </Typography>
                  <Typography variant="body2" sx={{ color: brand.muted }}>
                    Monthly sales performance
                  </Typography>
                </Box>

                <Chip
                  label={loading ? "Loading" : "Monthly"}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: brand.blueLight,
                    color: brand.primary,
                    fontWeight: 900,
                  }}
                />
              </Stack>

              {loading ? (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  spacing={1.5}
                  sx={{ height: 360 }}
                >
                  <CircularProgress
                    size={42}
                    thickness={5}
                    sx={{ color: brand.primary }}
                  />
                  <Typography sx={{ color: brand.muted, fontWeight: 800 }}>
                    Loading sales chart...
                  </Typography>
                </Stack>
              ) : (
                <BarChart
                  xAxis={xaxis}
                  series={serie}
                  height={360}
                  margin={{ left: 50, right: 20, top: 20, bottom: 45 }}
                />
              )}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                borderRadius: "8px",
                backgroundColor: "rgba(255,255,255,0.94)",
                border: `1px solid ${brand.cyanLight}`,
                boxShadow: "0 18px 50px rgba(15, 23, 42, 0.07)",
                animation: `${fadeUp} 1.12s ease both`,
                transition: "all 0.28s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 24px 62px rgba(15, 23, 42, 0.1)",
                },
              }}
            >
              <Box sx={{ mb: 2 }}>
                <Typography fontWeight={900} sx={{ color: brand.navy }}>
                  Customers Overview
                </Typography>
                <Typography variant="body2" sx={{ color: brand.muted }}>
                  Active vs inactive customers
                </Typography>
              </Box>

              {loading ? (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  spacing={1.5}
                  sx={{ height: 360 }}
                >
                  <CircularProgress
                    size={42}
                    thickness={5}
                    sx={{ color: brand.cyan }}
                  />
                  <Typography sx={{ color: brand.muted, fontWeight: 800 }}>
                    Loading customers chart...
                  </Typography>
                </Stack>
              ) : (
                <PieChart series={series} height={360} />
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
