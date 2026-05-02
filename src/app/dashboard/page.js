// "use client";

// import {
//   Grid,
//   Paper,
//   Typography,
//   Box,
//   CircularProgress
// } from "@mui/material";

// import {
//   BarChart,
//   PieChart
// } from "@mui/x-charts";

// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import PeopleIcon from "@mui/icons-material/People";
// import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
// import { useEffect, useState } from "react";
// import axios from 'axios';
// import { useRouter } from "next/navigation";



// export default function DashboardPage() {

//     const router = useRouter();

//     const[recUserId, setRecUserId]= useState(""); 

 

//     const [fetchedTotalValues, setFetchedTotalValues]=useState([]);
//     const [loading, setLoading] = useState(true);


// const [stats, setStats]= useState([
   
//     {
//       title: "Total Sales",
//       value:0,
//       icon: <TrendingUpIcon />,
//       color: "#1976d2",
//       bg: "#e3f2fd",
//     },
//     {
//       title: "Total Customers",
//       value: 0,
//       icon: <PeopleIcon />,
//       color: "#2e7d32",
//       bg: "#e8f5e9",
//     },
//     {
//       title: "Total Revenue",
//       value: 0,
//       icon: <CurrencyRupeeIcon />,
//       color: "#ed6c02",
//       bg: "#fff3e0",
//     },

// ])

//  const [series, setSeries]= useState([
//                 {
//                   data: [
//                     { id: 0, value: 0, label: "Active" },
//                     { id: 1, value: 0, label: "Inactive" },
//                   ],
//                   innerRadius: 60,
//                 },
//               ]
//  )
  
//  const [xaxis, setXaxis] = useState([

//               {
//                  scaleType: "band",
//                  data: ["Jan","Feb","March","April"],
//                 },

//  ])

//  const [serie, setSerie] = useState([

//                {
//                  data: [0,0,0,0],
//                 },



//  ])


//   //     const stats = [
//   //   {
//   //     title: "Total Sales",
//   //     value:0,
//   //     icon: <TrendingUpIcon />,
//   //     color: "#1976d2",
//   //     bg: "#e3f2fd",
//   //   },
//   //   {
//   //     title: "Total Customers",
//   //     value: "120",
//   //     icon: <PeopleIcon />,
//   //     color: "#2e7d32",
//   //     bg: "#e8f5e9",
//   //   },
//   //   {
//   //     title: "Total Revenue",
//   //     value: "₹1,20,000",
//   //     icon: <CurrencyRupeeIcon />,
//   //     color: "#ed6c02",
//   //     bg: "#fff3e0",
//   //   },
//   // ];

//   useEffect(() => {
//     const testToken = async () => {
//       try {
//         const resToken = localStorage.getItem("Token");

//         if (!resToken) {
//           router.push("/signin");
//         }

//         const res = await axios.post("/api/jwt_verify", { resToken });

//         console.log("This is my responce",res);

//         console.log("This is your responce with id", res.data.received_id);

//         setRecUserId(res.data.received_id);

//         if (!res.data.valid) {
//            console.log("Valid Token",res.data.valid);
//           router.push("/signin");
         
//         }
        
//       } catch (err) {
//         console.log("error", err);
//       }
//     };

//     testToken();
//   }, []);


//   useEffect(() => {
//   const fetchDashboard = async () => {

//        try {
//             setLoading(true);

//       console.log("this is my id ",recUserId);
//       const res = await axios.post("/api/dashboard_api", {
//         userId: recUserId,
//       });

//       console.log("company verify response :", res);

//       console.log("This is my res",res.data.totalSale);
//       console.log("This is my customer res",res.data.totalCustomers);
//          console.log("This is my Total Revenue Res",res.data.totalRevenue);
//           console.log("This is my Active  Res",res.data.Active_user);
//               console.log("This is my InActive  Res",res.data.inActive_user);
//                console.log("This is my Sales Overview Res",res.data.sale_overview);


//       if(res.data?.valid){
//         //  setTotalSales(res.data.totalSale);
//         //  setTotalCust(res.data.totalCustomers);
//         //  setTotalReve(res.data.totalRevenue)
     

//           setFetchedTotalValues(res.data);

//       stats[0].value=res.data.totalSale;

//         stats[1].value=res.data.totalCustomers;

//           stats[2].value=res.data.totalRevenue;
//            console.log("This is new value of stats ",stats);

//           series[0].data[0].value=res.data.Active_user;

         
//           series[0].data[1].value=res.data.inActive_user;

//           serie[0].data=res.data.sale_overview[0].total;


//     console.log("This is new value of series ",series);
      

//       }else{
//         //router.push("/create_company");
//       }

//     }

//     catch (error) {
//       console.error(error);
//        //router.push("/create_company");
//     }

//     finally {
//       setLoading(false);
//     }
//   }
//   if(recUserId){

//     console.log("this is me inside");
//   fetchDashboard();
//   }
// }, [recUserId]);




//   return (
//     <Box sx={{ width: "100%", px: 2 }}> {/* ✅ FULL WIDTH */}

//       {/* HEADER */}
//       <Typography variant="h4" fontWeight={600} sx={{ mb: 4 }}>
//         Dashboard
//       </Typography>

//       {/* ---------- ROW 1: CARDS ---------- */}
//       <Grid container spacing={4}>

     
//         {stats.map((item, i) => (
//           // <Grid item xs={12} md={6} lg={4} key={i}>

//           <Grid size={{xs:12, md:6, lg:4}} key={i}>
//             <Paper
//               sx={{
//                 width: "100%",
//                 p: 4,
//                 borderRadius: 4,
//                 position: "relative",
//                 overflow: "hidden",
//                 boxShadow: 3,
//                 transition: "0.3s",
//                 "&:hover": {
//                   boxShadow: 8,
//                   transform: "translateY(-6px)",
//                 },
//               }}
//             >
//               {/* Top Color Bar */}
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   width: "100%",
//                   height: "6px",
//                   bgcolor: item.color,
//                 }}
//               />

//               <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
//                 {/* Icon */}
//                 <Box
//                   sx={{
//                     bgcolor: item.bg,
//                     color: item.color,
//                     p: 2,
//                     borderRadius: 2,
//                     display: "flex",
//                   }}
//                 >
//                   {item.icon}
//                 </Box>

//                 {/* Text */}
//                 <Box>
//                   <Typography color="text.secondary" variant="body2">

//                     {item.title}
//                   </Typography>
//  {loading ? <CircularProgress size={40} /> :
//                   <Typography variant="h3" fontWeight={700}>
                    
//                     {item.value}
                
//                   </Typography>
// }
//                 </Box>
//               </Box>
//             </Paper>
//           </Grid>
//         ))}
      

        
      
//       </Grid>

//       {/* ---------- ROW 2: CHARTS ---------- */}
//       <Grid container spacing={4} sx={{ mt: 2 }}>

//         {/* BAR CHART */}
//         {/* <Grid item xs={12} lg={8}> */}

//           <Grid size={{xs:12, lg:6, }} >
//           <Paper sx={{ p: 4, borderRadius: 4, }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Sales Overview
//             </Typography>

//             <BarChart
//               xAxis={xaxis}
//              series={serie}
        
//               height={400}
//               sx={{ width: "100%" }} // ✅ full width
//             />
//           </Paper>
//         </Grid>

//         {/* PIE CHART */}
//         <Grid size={{xs:12, lg:4}}>
//           <Paper sx={{ p: 4, borderRadius: 4 }}>
//             <Typography variant="h6" sx={{ mb: 2 }}>
//               Customers Overview
//             </Typography>

//             <PieChart
//               // series={[
//               //   {
//               //     data: [
//               //       { id: 0, value: 80, label: "Active" },
//               //       { id: 1, value: 40, label: "Inactive" },
//               //     ],
//               //     innerRadius: 60,
//               //   },
//               // ]}
//               series={series} 
//               height={400}
//               sx={{ width: "100%" }} // ✅ full width
//             />
//           </Paper>
//         </Grid>
        

//       </Grid>

//     </Box>
//   );
// }



"use client";

import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress
} from "@mui/material";

import {
  BarChart,
  PieChart
} from "@mui/x-charts";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [recUserId, setRecUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState([
    {
      title: "Total Sales",
      value: 0,
      icon: <TrendingUpIcon />,
      color: "#fb7185",
      bg: "#ffe4e6",
    },
    {
      title: "Total Customers",
      value: 0,
      icon: <PeopleIcon />,
      color: "#22c55e",
      bg: "#ecfdf5",
    },
    {
      title: "Total Revenue",
      value: 0,
      icon: <CurrencyRupeeIcon />,
      color: "#f59e0b",
      bg: "#fef3c7",
    },
  ]);

  const [series, setSeries] = useState([
    {
      data: [
        { id: 0, value: 0, label: "Active" },
        { id: 1, value: 0, label: "Inactive" },
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
    },
  ]);

  useEffect(() => {
    const testToken = async () => {
      try {
        const resToken = localStorage.getItem("Token");

        if (!resToken) {
          router.push("/signin");
        }

        const res = await axios.post("/api/jwt_verify", { resToken });

        setRecUserId(res.data.received_id);

        if (!res.data.valid) {
          router.push("/signin");
        }
      } catch (err) {
        console.log(err);
      }
    };

    testToken();
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const res = await axios.post("/api/dashboard_api", {
          userId: recUserId,
        });

        if (res.data?.valid) {
          stats[0].value = res.data.totalSale;
          stats[1].value = res.data.totalCustomers;
          stats[2].value = res.data.totalRevenue;

          series[0].data[0].value = res.data.Active_user;
          series[0].data[1].value = res.data.inActive_user;

          serie[0].data = res.data.sale_overview[0].total;
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
        px: 2,
        background: "linear-gradient(135deg, #fff1f2, #f4f4f5)",
        minHeight: "100vh",
        py: 3,
      }}
    >
      {/* HEADER */}
      <Typography variant="h4" fontWeight={600} sx={{ mb: 4, color: "#18181b" }}>
        Dashboard
      </Typography>

      {/* CARDS */}
      <Grid container spacing={4}>
        {stats.map((item, i) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={i}>
            <Paper
              sx={{
                p: 4,
                borderRadius: 4,
                background: "#fafafa",
                border: "1px solid #e4e4e7",
                boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                position: "relative",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
                },
              }}
            >
              {/* Top Line */}
              <Box
                sx={{
                  height: "6px",
                  width: "100%",
                  bgcolor: item.color,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
              />

              <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                <Box
                  sx={{
                    bgcolor: item.bg,
                    color: item.color,
                    p: 2,
                    borderRadius: 2,
                  }}
                >
                  {item.icon}
                </Box>

                <Box>
                  <Typography color="#71717a" variant="body2">
                    {item.title}
                  </Typography>

                  {loading ? (
                    <CircularProgress size={30} sx={{ color: "#fb7185" }} />
                  ) : (
                    <Typography variant="h3" fontWeight={700} color="#18181b">
                      {item.value}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* CHARTS */}
      <Grid container spacing={4} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              background: "#fafafa",
              border: "1px solid #e4e4e7",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#18181b" }}>
              Sales Overview
            </Typography>

            <BarChart
              xAxis={xaxis}
              series={serie}
              height={400}
            />
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper
            sx={{
              p: 4,
              borderRadius: 4,
              background: "#fafafa",
              border: "1px solid #e4e4e7",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, color: "#18181b" }}>
              Customers Overview
            </Typography>

            <PieChart
              series={series}
              height={400}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}