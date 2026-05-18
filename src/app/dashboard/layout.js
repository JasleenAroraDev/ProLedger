// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// import {
//   Box, Drawer, AppBar, Toolbar, Typography,
//   List, ListItemButton, ListItemIcon, ListItemText,
//   IconButton, Avatar, Divider
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import BusinessIcon from "@mui/icons-material/Business";
// import PeopleIcon from "@mui/icons-material/People";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import StoreIcon from "@mui/icons-material/Store";
// import ReceiptIcon from "@mui/icons-material/Receipt";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import LogoutIcon from "@mui/icons-material/Logout";

// const drawerWidth = 240;

// export default function DashboardLayout({ children }) {
//   const [open, setOpen] = useState(true);
//   const pathname = usePathname();

//   const menuItems = [
//     { name: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
//     { name: "Company", icon: <BusinessIcon />, path: "/dashboard/company" },
//     { name: "Customers", icon: <PeopleIcon />, path: "/dashboard/customers" },
//     { name: "Vendors", icon: <StoreIcon />, path: "/dashboard/vendors" },
//     { name: "Items", icon: <InventoryIcon />, path: "/dashboard/create_item" },
//     { name: "Invoices", icon: <ReceiptIcon />, path: "/dashboard/create_invoice" },
//     { name: "Reports", icon: <BarChartIcon />, path: "/dashboard" },
//     { name: "Logout", icon: <LogoutIcon />, path: "/dashboard/logout" },
//   ];

//   return (
//     <Box sx={{ display: "flex", bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      
//       {/* TOP BAR */}
//       <AppBar position="fixed" sx={{ zIndex: 1201 }}>
//         <Toolbar>
//           <IconButton color="inherit" onClick={() => setOpen(!open)}>
//             <MenuIcon />
//           </IconButton>
//           <Typography sx={{ flexGrow: 1}}>ERP System</Typography>
//           <Avatar>A</Avatar>
//         </Toolbar>
//       </AppBar>

//       {/* SIDEBAR */}
//       <Drawer
//         variant="persistent"
//         open={open}
//         sx={{
//           width: drawerWidth,
//           "& .MuiDrawer-paper": {
//             width: drawerWidth,
//             bgcolor: "#1e293b",
//             color: "#fff",
//           },
//         }}
//       >
//         <Toolbar />
//         <Typography sx={{ p: 2 }}>ERP Panel</Typography>
//         <Divider sx={{ bgcolor: "gray" }} />

//         <List>
//           {menuItems.map((item) => (
//             <Link href={item.path} key={item.name} style={{ textDecoration: "none", color: "inherit" }}>
//               <ListItemButton
//                 sx={{
//                   bgcolor: pathname === item.path ? "#334155" : "transparent",
//                   "&:hover": { bgcolor: "#334155" },
//                 }}
//               >
//                 <ListItemIcon sx={{ color: "#fff" }}>
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText primary={item.name} />
//               </ListItemButton>
//             </Link>
//           ))}
//         </List>
//       </Drawer>

//       {/* MAIN CONTENT */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//        //   ml: open ? `${drawerWidth}px` : "0px",
//         }}
//       >
//         <Toolbar />
//         {children}
//       </Box>
//     </Box>
//   );
// }



"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Divider,
  Stack,
  Chip,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import PaymentIcon from "@mui/icons-material/Payment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";
import ShieldIcon from "@mui/icons-material/Shield";

const drawerWidth = 260;

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const brand = {
    navy: "#0f172a",
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",
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

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { name: "Company", icon: <BusinessIcon />, path: "/dashboard/company" },
    { name: "Customers", icon: <PeopleIcon />, path: "/dashboard/customers" },
    { name: "Vendors", icon: <StoreIcon />, path: "/dashboard/vendors" },
    { name: "Items", icon: <InventoryIcon />, path: "/dashboard/create_item" },
    { name: "Invoices", icon: <ReceiptIcon />, path: "/dashboard/invoices" },
    { name: "Payments", icon: <PaymentIcon />, path: "/dashboard/payment" },
    { name: "Inventory", icon: <InventoryIcon />, path: "/dashboard/inventory" },
    { name: "Reports", icon: <BarChartIcon />, path: "/dashboard/reports" },
    { name: "Logout", icon: <LogoutIcon />, path: "/dashboard/logout" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef6ff 48%, #ecfeff 100%)",
        position: "relative",
        "&::before": {
          content: '""',
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.055) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: 1201,
          background: "rgba(255,255,255,0.86)",
          backdropFilter: "blur(18px)",
          borderBottom: `1px solid ${brand.border}`,
          color: brand.navy,
          boxShadow: "0 12px 30px rgba(15, 23, 42, 0.04)",
        }}
      >
        <Toolbar sx={{ minHeight: "72px !important" }}>
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              mr: 1.5,
              color: brand.navy,
              borderRadius: "8px",
              border: `1px solid ${brand.border}`,
              backgroundColor: "#ffffff",
              "&:hover": {
                backgroundColor: brand.blueLight,
                color: brand.primary,
              },
            }}
          >
            <MenuIcon />
          </IconButton>

          <Stack spacing={0.2} sx={{ flexGrow: 1 }}>
            <Typography sx={{ fontWeight: 900, color: brand.navy }}>
              ProLedger ERP
            </Typography>
            <Typography variant="caption" sx={{ color: brand.muted, fontWeight: 700 }}>
              Business Control Center
            </Typography>
          </Stack>

          <Chip
            icon={<ShieldIcon />}
            label="Secure"
            sx={{
              mr: 2,
              display: { xs: "none", sm: "flex" },
              borderRadius: "8px",
              backgroundColor: brand.emeraldLight,
              color: brand.emerald,
              fontWeight: 900,
              "& .MuiChip-icon": {
                color: brand.emerald,
              },
            }}
          />

          <Avatar
            sx={{
              width: 42,
              height: 42,
              fontWeight: 900,
              color: "#ffffff",
              background:
                "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
              boxShadow: "0 12px 24px rgba(37, 99, 235, 0.24)",
            }}
          >
            A
          </Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(18px)",
            borderRight: `1px solid ${brand.border}`,
            boxShadow: "18px 0 50px rgba(15, 23, 42, 0.06)",
          },
        }}
      >
        <Toolbar sx={{ minHeight: "72px !important" }} />

        <Box sx={{ p: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: "8px",
              background:
                "linear-gradient(135deg, #eff6ff 0%, #ffffff 52%, #ecfeff 100%)",
              border: `1px solid ${brand.blueLight}`,
            }}
          >
            <img
              src="/proLedgerLogo.png"
              alt="ProLedger Logo"
              style={{
                width: "180px",
                maxWidth: "100%",
                height: "auto",
                display: "block",
              }}
            />

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: brand.muted,
                fontWeight: 700,
              }}
            >
              ERP Management Panel
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: brand.border }} />

        <List sx={{ px: 1.2, py: 1.5 }}>
          {menuItems.map((item) => {
            const active =
              item.path === "/dashboard"
                ? pathname === item.path
                : pathname?.startsWith(item.path);

            const isLogout = item.name === "Logout";

            return (
              <Link
                href={item.path}
                key={item.name}
                style={{ textDecoration: "none" }}
              >
                <ListItemButton
                  sx={{
                    my: 0.45,
                    minHeight: 46,
                    borderRadius: "8px",
                    border: active
                      ? `1px solid ${brand.blueLight}`
                      : "1px solid transparent",
                    backgroundColor: active ? brand.blueLight : "transparent",
                    color: active ? brand.primaryDark : brand.text,
                    transition: "all 0.25s ease",
                    "&:hover": {
                      backgroundColor: isLogout ? "#fef2f2" : "#f8fafc",
                      borderColor: isLogout ? "#fecaca" : brand.blueLight,
                      transform: "translateX(4px)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 42,
                      color: isLogout
                        ? "#dc2626"
                        : active
                        ? brand.primary
                        : brand.muted,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.name}
                    primaryTypographyProps={{
                      fontWeight: active ? 900 : 750,
                      fontSize: "0.94rem",
                    }}
                  />
                </ListItemButton>
              </Link>
            );
          })}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          p: { xs: 2, md: 3 },
          position: "relative",
          zIndex: 1,
          transition: "all 0.25s ease",
        }}
      >
        <Toolbar sx={{ minHeight: "72px !important" }} />

        <Box
          sx={{
            minHeight: "calc(100vh - 104px)",
            borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.72)",
            border: `1px solid ${brand.border}`,
            boxShadow: "0 18px 50px rgba(15, 23, 42, 0.06)",
            backdropFilter: "blur(18px)",
            p: { xs: 2, md: 3 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
