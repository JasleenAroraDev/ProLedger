// "use client";
// import {
//   Box,
//   Typography,
//   Button,
//   Stack,
//   Container,
//   Grid,
//   Paper
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import InventoryIcon from "@mui/icons-material/Inventory";

// export default function Home() {
//   const router = useRouter();

//   const signup = () => router.push("/signup");
//   const signin = () => router.push("/signin");

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg,#0f172a,#1e293b)",
//         color: "#fff",
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={6} alignItems="center">

//           {/* LEFT CONTENT */}
//           <Grid item xs={12} md={6}>
//             <Stack spacing={4}>

//               <Typography
//                 variant="h3"
//                 fontWeight="bold"
//                 sx={{ lineHeight: 1.3}}
//               >
//                 ProLedger - ERP Based Billing & Accounting System
//               </Typography>

//               <Typography variant="h6" sx={{ color: "#cbd5f5" }}>
//                 Smart Billing, Accounting & Inventory Management for Modern Businesses.
//               </Typography>

//               <Typography sx={{ color: "#94a3b8" }}>
//                 Manage sales, customers, stock, and financial reports in one
//                 powerful ERP system designed for growing businesses.
//               </Typography>

//               <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={signup}
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     borderRadius: "12px",
//                     background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
//                   }}
//                 >
//                   Start Free Trial
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   size="large"
//                   onClick={signin}
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     borderRadius: "12px",
//                     color: "#fff",
//                     borderColor: "#475569",
//                   }}
//                 >
//                   Login
//                 </Button>
//               </Stack>

//             </Stack>
//           </Grid>

//           {/* RIGHT SIDE CARD */}
//           <Grid item xs={12} md={6}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 4,
//                 borderRadius: "20px",
//                 background: "rgba(255,255,255,0.05)",
//                 backdropFilter: "blur(12px)",
//                 border: "1px solid rgba(255,255,255,0.1)",
//               }}
//             >
//               <Stack spacing={3}>

//                 <Typography variant="h6" fontWeight="bold">
//                   Why Choose ProLedger?
//                 </Typography>

//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <TrendingUpIcon sx={{ color: "#6366f1" }} />
//                   <Typography>Real-time Sales & Profit Tracking</Typography>
//                 </Stack>

//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <AccountBalanceIcon sx={{ color: "#22c55e" }} />
//                   <Typography>Advanced Accounting & GST Ready</Typography>
//                 </Stack>

//                 <Stack direction="row" spacing={2} alignItems="center">
//                   <InventoryIcon sx={{ color: "#f59e0b" }} />
//                   <Typography>Smart Inventory Management</Typography>
//                 </Stack>

//               </Stack>
//             </Paper>
//           </Grid>

//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// "use client";
// import {
//   Box,
//   Typography,
//   Button,
//   Stack,
//   Container,
//   Grid,
//   Paper
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import { keyframes } from "@mui/system";

// export default function Home() {
//   const router = useRouter();

//   const signup = () => router.push("/signup");
//   const signin = () => router.push("/signin");

//   const fadeUp = keyframes`
//     from { opacity: 0; transform: translateY(15px); }
//     to { opacity: 1; transform: translateY(0); }
//   `;

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #fff1f2, #f4f4f5)",
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={6} alignItems="center">

          

//           {/* LEFT */}
//           <Grid item xs={12} md={6}>
//             <Stack spacing={4} sx={{ animation: `${fadeUp} 0.6s ease` }}>

//               <Typography
//                 variant="h3"
//                 fontWeight="700"
//                 sx={{
//                   lineHeight: 1.3,
//                   color: "#18181b"
//                 }}
//               >
//                 ProLedger - ERP Based Billing & Accounting System
//               </Typography>

//               <Typography variant="h6" sx={{ color: "#52525b" }}>
//                 Smart Billing, Accounting & Inventory Management for Modern Businesses.
//               </Typography>

//               <Typography sx={{ color: "#71717a" }}>
//                 Manage sales, customers, stock, and financial reports in one
//                 powerful ERP system designed for growing businesses.
//               </Typography>

//               <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={signup}
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     borderRadius: "10px",
//                     textTransform: "none",
//                     fontWeight: "600",
//                     background: "#fb7185", // soft rose
//                     boxShadow: "0 6px 18px rgba(251,113,133,0.25)",
//                     "&:hover": {
//                       background: "#f43f5e",
//                     }
//                   }}
//                 >
//                   Start Free Trial
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   size="large"
//                   onClick={signin}
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     borderRadius: "10px",
//                     textTransform: "none",
//                     color: "#3f3f46",
//                     borderColor: "#d4d4d8",
//                     "&:hover": {
//                       background: "#ffe4e6",
//                       borderColor: "#fb7185",
//                     }
//                   }}
//                 >
//                   Login
//                 </Button>
//               </Stack>

//             </Stack>
//           </Grid>

//           {/* RIGHT */}
//           <Grid item xs={12} md={6}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 4,
//                 borderRadius: "16px",
//                 background: "#fafafa",
//                 border: "1px solid #e4e4e7",
//                 boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
//                 animation: `${fadeUp} 0.8s ease`,
//               }}
//             >
//               <Stack spacing={3}>

//                 <Typography variant="h6" fontWeight="600" color="#18181b">
//                   Why Choose ProLedger?
//                 </Typography>

//                 <Stack
//                   direction="row"
//                   spacing={2}
//                   alignItems="center"
//                   sx={{
//                     p: 1.5,
//                     borderRadius: "10px",
//                     "&:hover": {
//                       background: "#ffe4e6"
//                     }
//                   }}
//                 >
//                   <TrendingUpIcon sx={{ color: "#fb7185" }} />
//                   <Typography color="#3f3f46">
//                     Real-time Sales & Profit Tracking
//                   </Typography>
//                 </Stack>

//                 <Stack
//                   direction="row"
//                   spacing={2}
//                   alignItems="center"
//                   sx={{
//                     p: 1.5,
//                     borderRadius: "10px",
//                     "&:hover": {
//                       background: "#ffe4e6"
//                     }
//                   }}
//                 >
//                   <AccountBalanceIcon sx={{ color: "#22c55e" }} />
//                   <Typography color="#3f3f46">
//                     Advanced Accounting & GST Ready
//                   </Typography>
//                 </Stack>

//                 <Stack
//                   direction="row"
//                   spacing={2}
//                   alignItems="center"
//                   sx={{
//                     p: 1.5,
//                     borderRadius: "10px",
//                     "&:hover": {
//                       background: "#ffe4e6"
//                     }
//                   }}
//                 >
//                   <InventoryIcon sx={{ color: "#f59e0b" }} />
//                   <Typography color="#3f3f46">
//                     Smart Inventory Management
//                   </Typography>
//                 </Stack>

//               </Stack>
//             </Paper>
//           </Grid>

//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// "use client";
// import {
//   Box,
//   Typography,
//   Button,
//   Stack,
//   Container,
//   Grid,
//   Paper
// } from "@mui/material";
// import { useRouter } from "next/navigation";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import { keyframes } from "@mui/system";

// export default function Home() {
//   const router = useRouter();

//   const signup = () => router.push("/signup");
//   const signin = () => router.push("/signin");

//   const fadeUp = keyframes`
//     from { opacity: 0; transform: translateY(15px); }
//     to { opacity: 1; transform: translateY(0); }
//   `;

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(135deg, #fff1f2, #f4f4f5)",
//         display: "flex",
//         alignItems: "center",
//       }}
//     >
//       <Container maxWidth="lg">
//         <Grid container spacing={6} alignItems="center">

//           {/* LEFT */}
//           <Grid item xs={12} md={6}>
//             <Stack spacing={4} sx={{ animation: `${fadeUp} 0.6s ease` }}>

//               {/* LOGO GRID */}
//               <Grid container>
//                 <Grid item xs={12}>
//                   <Box sx={{ display: "flex", alignItems: "center" }}>
//                     <img
//                       src="/proLedgerLogo.png"  
//                       alt="ProLedger Logo"
//                       style={{
//                         width: "180px",
//                         height: "auto",
//                         objectFit: "contain"
//                       }}
//                     />
//                   </Box>
//                 </Grid>
//               </Grid>

//               {/* HEADING */}
//               <Typography
//                 variant="h3"
//                 fontWeight="700"
//                 sx={{
//                   lineHeight: 1.3,
//                   color: "#18181b"
//                 }}
//               >
//                 ProLedger - ERP Based Billing & Accounting System
//               </Typography>

//               <Typography variant="h6" sx={{ color: "#52525b" }}>
//                 Smart Billing, Accounting & Inventory Management for Modern Businesses.
//               </Typography>

//               <Typography sx={{ color: "#71717a" }}>
//                 Manage sales, customers, stock, and financial reports in one
//                 powerful ERP system designed for growing businesses.
//               </Typography>

//               <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
//                 <Button
//                   variant="contained"
//                   size="large"
//                   onClick={signup}
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     borderRadius: "10px",
//                     textTransform: "none",
//                     fontWeight: "600",
//                     background: "#fb7185",
//                     boxShadow: "0 6px 18px rgba(251,113,133,0.25)",
//                     "&:hover": {
//                       background: "#f43f5e",
//                     }
//                   }}
//                 >
//                   Start Free Trial
//                 </Button>

//                 <Button
//                   variant="outlined"
//                   size="large"
//                   onClick={signin}
//                   sx={{
//                     px: 4,
//                     py: 1.5,
//                     borderRadius: "10px",
//                     textTransform: "none",
//                     color: "#3f3f46",
//                     borderColor: "#d4d4d8",
//                     "&:hover": {
//                       background: "#ffe4e6",
//                       borderColor: "#fb7185",
//                     }
//                   }}
//                 >
//                   Login
//                 </Button>
//               </Stack>

//             </Stack>
//           </Grid>

//           {/* RIGHT */}
//           <Grid item xs={12} md={6}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 4,
//                 borderRadius: "16px",
//                 background: "#fafafa",
//                 border: "1px solid #e4e4e7",
//                 boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
//                 animation: `${fadeUp} 0.8s ease`,
//               }}
//             >
//               <Stack spacing={3}>

//                 <Typography variant="h6" fontWeight="600" color="#18181b">
//                   Why Choose ProLedger?
//                 </Typography>

//                 <Stack
//                   direction="row"
//                   spacing={2}
//                   alignItems="center"
//                   sx={{
//                     p: 1.5,
//                     borderRadius: "10px",
//                     "&:hover": {
//                       background: "#ffe4e6"
//                     }
//                   }}
//                 >
//                   <TrendingUpIcon sx={{ color: "#fb7185" }} />
//                   <Typography color="#3f3f46">
//                     Real-time Sales & Profit Tracking
//                   </Typography>
//                 </Stack>

//                 <Stack
//                   direction="row"
//                   spacing={2}
//                   alignItems="center"
//                   sx={{
//                     p: 1.5,
//                     borderRadius: "10px",
//                     "&:hover": {
//                       background: "#ffe4e6"
//                     }
//                   }}
//                 >
//                   <AccountBalanceIcon sx={{ color: "#22c55e" }} />
//                   <Typography color="#3f3f46">
//                     Advanced Accounting & GST Ready
//                   </Typography>
//                 </Stack>

//                 <Stack
//                   direction="row"
//                   spacing={2}
//                   alignItems="center"
//                   sx={{
//                     p: 1.5,
//                     borderRadius: "10px",
//                     "&:hover": {
//                       background: "#ffe4e6"
//                     }
//                   }}
//                 >
//                   <InventoryIcon sx={{ color: "#f59e0b" }} />
//                   <Typography color="#3f3f46">
//                     Smart Inventory Management
//                   </Typography>
//                 </Stack>

//               </Stack>
//             </Paper>
//           </Grid>

//         </Grid>
//       </Container>
//     </Box>
//   );
// }

"use client";

import {
  Box,
  Typography,
  Button,
  Stack,
  Container,
  Grid,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InventoryIcon from "@mui/icons-material/Inventory";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LoginIcon from "@mui/icons-material/Login";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ShieldIcon from "@mui/icons-material/Shield";
import { keyframes } from "@mui/system";

export default function Home() {
  const router = useRouter();

  const signup = () => router.push("/signup");
  const signin = () => router.push("/signin");

  const brand = {
    navy: "#0f172a",
    navySoft: "#1e293b",
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",
    cyanLight: "#e0f7ff",
    emerald: "#059669",
    emeraldLight: "#dcfce7",
    amber: "#d97706",
    amberLight: "#fef3c7",
    blueLight: "#dbeafe",
    surface: "#ffffff",
    background: "#f8fafc",
    text: "#334155",
    muted: "#64748b",
    border: "#dbe5f0",
  };

  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const floatCard = keyframes`
    0% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
    100% { transform: translateY(0px); }
  `;

  const pulse = keyframes`
    0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.24); }
    70% { box-shadow: 0 0 0 12px rgba(37, 99, 235, 0); }
    100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
  `;

  const shine = keyframes`
    0% { transform: translateX(-140%); }
    100% { transform: translateX(140%); }
  `;

  const barGrow = keyframes`
    from { width: 0%; }
    to { width: var(--bar-width); }
  `;

  const features = [
    {
      icon: <TrendingUpIcon />,
      title: "Sales Growth",
      text: "Track billing, revenue, profit, and pending payments in real time.",
      color: brand.primary,
      bg: brand.blueLight,
    },
    {
      icon: <AccountBalanceIcon />,
      title: "Accounting Control",
      text: "Manage GST invoices, ledgers, expenses, and financial reports.",
      color: brand.emerald,
      bg: brand.emeraldLight,
    },
    {
      icon: <InventoryIcon />,
      title: "Inventory Power",
      text: "Control stock, purchases, suppliers, and low-stock alerts.",
      color: brand.amber,
      bg: brand.amberLight,
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 8% 12%, rgba(37,99,235,0.13), transparent 30%), radial-gradient(circle at 88% 18%, rgba(8,145,178,0.12), transparent 28%), linear-gradient(135deg, #f8fafc 0%, #eef6ff 45%, #ecfeff 100%)",
        display: "flex",
        alignItems: "center",
        py: { xs: 4, md: 7 },
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 7 }} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack spacing={3} sx={{ animation: `${fadeUp} 0.75s ease both` }}>
              <Box>
                <img
  src="/proLedgerLogo.png"
  alt="ProLedger Logo"
  style={{
    width: "350px",
    // height: "auto",
    // display: "block",
  }}
/>

              </Box>

              <Chip
                icon={<ShieldIcon />}
                label="Premium ERP Software for Smart Businesses"
                sx={{
                  width: "fit-content",
                  maxWidth: "100%",
                  borderRadius: "8px",
                  backgroundColor: brand.surface,
                  color: brand.primaryDark,
                  fontWeight: 900,
                  border: `1px solid ${brand.blueLight}`,
                  boxShadow: "0 12px 30px rgba(37, 99, 235, 0.12)",
                  animation: `${pulse} 2.6s infinite`,
                  px: 1,
                  "& .MuiChip-icon": {
                    color: brand.primary,
                  },
                }}
              />

              <Box>
                <Typography
                  variant="h2"
                  fontWeight={900}
                  sx={{
                    fontSize: { xs: "2.28rem", sm: "2.95rem", md: "3.72rem" },
                    lineHeight: 1.04,
                    letterSpacing: 0,
                    color: brand.navy,
                  }}
                >
                  Modern ERP for Billing, Accounting & Inventory
                </Typography>

                <Typography
                  sx={{
                    mt: 2.2,
                    color: brand.text,
                    fontSize: { xs: "1.02rem", md: "1.16rem" },
                    lineHeight: 1.75,
                    maxWidth: 570,
                  }}
                >
                  ProLedger gives your business a beautiful control center for
                  invoices, accounts, stock, customers, suppliers, GST reports,
                  and complete business analytics.
                </Typography>
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.6}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={signup}
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    px: 3.8,
                    py: 1.5,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 900,
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
                  }}
                >
                  Start Free Trial
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  onClick={signin}
                  startIcon={<LoginIcon />}
                  sx={{
                    px: 3.8,
                    py: 1.5,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 900,
                    color: brand.navy,
                    backgroundColor: brand.surface,
                    borderColor: brand.border,
                    boxShadow: "0 12px 26px rgba(15, 23, 42, 0.06)",
                    transition: "all 0.28s ease",
                    "&:hover": {
                      transform: "translateY(-3px)",
                      backgroundColor: "#f8fafc",
                      borderColor: brand.primary,
                    },
                  }}
                >
                  Login
                </Button>
              </Stack>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1.2, sm: 2.4 }}
                divider={
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      display: { xs: "none", sm: "block" },
                      borderColor: brand.border,
                    }}
                  />
                }
                sx={{ pt: 1, color: brand.text }}
              >
                {["GST Ready", "Fast Billing", "Live Reports"].map((item) => (
                  <Stack key={item} direction="row" spacing={0.8} alignItems="center">
                    <CheckCircleIcon sx={{ fontSize: 18, color: brand.emerald }} />
                    <Typography fontWeight={900} fontSize="0.95rem">
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ animation: `${floatCard} 5s ease-in-out infinite` }}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 2, sm: 2.5, md: 3 },
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.94)",
                  border: `1px solid ${brand.blueLight}`,
                  boxShadow: "0 32px 90px rgba(15, 23, 42, 0.15)",
                  backdropFilter: "blur(18px)",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    width: "46%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                    animation: `${shine} 4.2s ease-in-out infinite`,
                  },
                }}
              >
                <Stack spacing={2.4} sx={{ position: "relative", zIndex: 1 }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography sx={{ fontWeight: 900, color: brand.navy }}>
                        ProLedger ERP Dashboard
                      </Typography>
                      <Typography variant="body2" color={brand.muted}>
                        Business performance overview
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        px: 1.4,
                        py: 0.7,
                        borderRadius: "8px",
                        backgroundColor: brand.emeraldLight,
                        color: brand.emerald,
                        fontWeight: 900,
                        fontSize: "0.78rem",
                      }}
                    >
                      LIVE
                    </Box>
                  </Stack>

                  <Grid container spacing={1.4}>
                    {[
                      ["₹2.48L", "Sales", brand.blueLight, brand.primary, "82%"],
                      ["186", "Invoices", brand.emeraldLight, brand.emerald, "68%"],
                      ["94%", "Stock", brand.amberLight, brand.amber, "94%"],
                    ].map(([value, label, bg, color, width]) => (
                      <Grid item xs={4} key={label}>
                        <Box
                          sx={{
                            minHeight: 104,
                            p: 1.35,
                            borderRadius: "8px",
                            backgroundColor: bg,
                            border: "1px solid rgba(203, 213, 225, 0.75)",
                            transition: "all 0.28s ease",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              boxShadow: "0 16px 30px rgba(15, 23, 42, 0.11)",
                            },
                          }}
                        >
                          <Typography sx={{ fontWeight: 900, color, fontSize: "1.22rem" }}>
                            {value}
                          </Typography>
                          <Typography variant="caption" sx={{ color: brand.text, fontWeight: 800 }}>
                            {label}
                          </Typography>

                          <Box sx={{ mt: 1.2, height: 6, borderRadius: 20, background: "#ffffff" }}>
                            <Box
                              sx={{
                                "--bar-width": width,
                                height: "100%",
                                borderRadius: 20,
                                background: color,
                                animation: `${barGrow} 1.2s ease both`,
                              }}
                            />
                          </Box>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>

                  <Box
                    sx={{
                      p: { xs: 1.4, sm: 2 },
                      borderRadius: "8px",
                      background:
                        "linear-gradient(135deg, #eff6ff 0%, #ffffff 48%, #ecfeff 100%)",
                      border: `1px solid ${brand.blueLight}`,
                    }}
                  >
                    <img
                      src="/landingPhoto.png"
                      alt="ERP Dashboard Illustration"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </Box>

                  <Grid container spacing={1.3}>
                    {[
                      { icon: <ReceiptLongIcon />, label: "Billing", color: brand.primary, bg: brand.blueLight },
                      { icon: <AssessmentIcon />, label: "Reports", color: brand.cyan, bg: brand.cyanLight },
                      { icon: <PeopleAltIcon />, label: "Customers", color: brand.emerald, bg: brand.emeraldLight },
                    ].map((item) => (
                      <Grid item xs={4} key={item.label}>
                        <Stack
                          alignItems="center"
                          spacing={0.8}
                          sx={{
                            p: 1.4,
                            borderRadius: "8px",
                            backgroundColor: brand.surface,
                            border: "1px solid #e2e8f0",
                            transition: "all 0.28s ease",
                            "&:hover": {
                              transform: "translateY(-5px)",
                              borderColor: item.color,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: "8px",
                              display: "grid",
                              placeItems: "center",
                              color: item.color,
                              backgroundColor: item.bg,
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Typography variant="caption" sx={{ color: brand.text, fontWeight: 900 }}>
                            {item.label}
                          </Typography>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Stack>
              </Paper>

              <Stack spacing={1.3} sx={{ mt: 2 }}>
                {features.map((item, index) => (
                  <Paper
                    key={item.title}
                    elevation={0}
                    sx={{
                      p: 1.45,
                      borderRadius: "8px",
                      backgroundColor: "rgba(255,255,255,0.9)",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 14px 34px rgba(15, 23, 42, 0.08)",
                      animation: `${fadeUp} 0.7s ease both`,
                      animationDelay: `${0.14 * index}s`,
                      transition: "all 0.28s ease",
                      "&:hover": {
                        transform: "translateX(7px)",
                        borderColor: item.color,
                      },
                    }}
                  >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "8px",
                          display: "grid",
                          placeItems: "center",
                          color: item.color,
                          backgroundColor: item.bg,
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </Box>

                      <Box>
                        <Typography fontWeight={900} color={brand.navy}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: brand.muted, lineHeight: 1.55 }}>
                          {item.text}
                        </Typography>
                      </Box>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
