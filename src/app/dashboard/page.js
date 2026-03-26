"use client";

import {
  Grid,
  Paper,
  Typography,
  Box
} from "@mui/material";

import {
  BarChart,
  PieChart
} from "@mui/x-charts";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useRouter } from "next/navigation";



export default function DashboardPage() {

    const router = useRouter();

    const[recUserId, setRecUserId]= useState(""); 

  useEffect(() => {
    const testToken = async () => {
      try {
        const resToken = localStorage.getItem("Token");

        if (!resToken) {
          router.push("/signin");
        }

        const res = await axios.post("/api/jwt_verify", { resToken });

        console.log("This is your responce with id", res.data.received_id);

        setRecUserId(res.data.received_id);

        if (!res.data.valid) {
           console.log("Valid Token",res.data.valid);
          router.push("/signin");
         
        }
        
      } catch (err) {
        console.log("error", err);
      }
    };

    testToken();
  }, []);


  useEffect(() => {
  const fetchDashboard = async () => {

       try {
console.log("this is my id ",recUserId);
      const res = await axios.post("/api/dashboard_api", {
        userId: recUserId,
      });

      console.log("company verify response :", res);

      if(res.data?.valid){
      
      }else{
        router.push("/create_company");
      }

    }

    catch (error) {
      console.error(error);
       router.push("/create_company");
    }
  }
  if(recUserId){

    console.log("this is me inside");
  fetchDashboard();
  }
}, [recUserId]);




  





  const stats = [
    {
      title: "Total Sales",
      value: "₹45,000",
      icon: <TrendingUpIcon />,
      color: "#1976d2",
      bg: "#e3f2fd",
    },
    {
      title: "Total Customers",
      value: "120",
      icon: <PeopleIcon />,
      color: "#2e7d32",
      bg: "#e8f5e9",
    },
    {
      title: "Total Revenue",
      value: "₹1,20,000",
      icon: <CurrencyRupeeIcon />,
      color: "#ed6c02",
      bg: "#fff3e0",
    },
  ];

  return (
    <Box sx={{ width: "100%", px: 2 }}> {/* ✅ FULL WIDTH */}

      {/* HEADER */}
      <Typography variant="h4" fontWeight={600} sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      {/* ---------- ROW 1: CARDS ---------- */}
      <Grid container spacing={4}>
        {stats.map((item, i) => (
          <Grid item xs={12} md={6} lg={4} key={i}>
            <Paper
              sx={{
                width: "100%",
                p: 4,
                borderRadius: 4,
                position: "relative",
                overflow: "hidden",
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 8,
                  transform: "translateY(-6px)",
                },
              }}
            >
              {/* Top Color Bar */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "6px",
                  bgcolor: item.color,
                }}
              />

              <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
                {/* Icon */}
                <Box
                  sx={{
                    bgcolor: item.bg,
                    color: item.color,
                    p: 2,
                    borderRadius: 2,
                    display: "flex",
                  }}
                >
                  {item.icon}
                </Box>

                {/* Text */}
                <Box>
                  <Typography color="text.secondary" variant="body2">
                    {item.title}
                  </Typography>

                  <Typography variant="h3" fontWeight={700}>
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* ---------- ROW 2: CHARTS ---------- */}
      <Grid container spacing={4} sx={{ mt: 2 }}>

        {/* BAR CHART */}
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 4, borderRadius: 4, }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Sales Overview
            </Typography>

            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["Jan", "Feb", "Mar", "Apr", "May"],
                },
              ]}
              series={[
                {
                  data: [4000, 3000, 5000, 4000, 6000],
                },
              ]}
              height={400}
              sx={{ width: "100%" }} // ✅ full width
            />
          </Paper>
        </Grid>

        {/* PIE CHART */}
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 4, borderRadius: 4 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Customers Overview
            </Typography>

            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 80, label: "Active" },
                    { id: 1, value: 40, label: "Inactive" },
                  ],
                  innerRadius: 60,
                },
              ]}
              height={400}
              sx={{ width: "100%" }} // ✅ full width
            />
          </Paper>
        </Grid>

      </Grid>

    </Box>
  );
}