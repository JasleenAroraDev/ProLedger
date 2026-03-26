"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Box, Drawer, AppBar, Toolbar, Typography,
  List, ListItemButton, ListItemIcon, ListItemText,
  IconButton, Avatar, Divider
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import StoreIcon from "@mui/icons-material/Store";
import ReceiptIcon from "@mui/icons-material/Receipt";
import BarChartIcon from "@mui/icons-material/BarChart";
import LogoutIcon from "@mui/icons-material/Logout";

const drawerWidth = 240;

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { name: "Company", icon: <BusinessIcon />, path: "/dashboard/company" },
    { name: "Customers", icon: <PeopleIcon />, path: "/dashboard/customers" },
    { name: "Vendors", icon: <StoreIcon />, path: "/dashboard/vendors" },
    { name: "Invoices", icon: <ReceiptIcon />, path: "/dashboard" },
    { name: "Reports", icon: <BarChartIcon />, path: "/dashboard" },
    { name: "Logout", icon: <LogoutIcon />, path: "/dashboard/logout" },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#f4f6f8", minHeight: "100vh" }}>
      
      {/* TOP BAR */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(!open)}>
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1}}>ERP System</Typography>
          <Avatar>A</Avatar>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            bgcolor: "#1e293b",
            color: "#fff",
          },
        }}
      >
        <Toolbar />
        <Typography sx={{ p: 2 }}>ERP Panel</Typography>
        <Divider sx={{ bgcolor: "gray" }} />

        <List>
          {menuItems.map((item) => (
            <Link href={item.path} key={item.name} style={{ textDecoration: "none", color: "inherit" }}>
              <ListItemButton
                sx={{
                  bgcolor: pathname === item.path ? "#334155" : "transparent",
                  "&:hover": { bgcolor: "#334155" },
                }}
              >
                <ListItemIcon sx={{ color: "#fff" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Drawer>

      {/* MAIN CONTENT */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
       //   ml: open ? `${drawerWidth}px` : "0px",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}