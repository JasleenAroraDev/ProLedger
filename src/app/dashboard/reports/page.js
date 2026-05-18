// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CircularProgress,
//   Container,
//   Divider,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Snackbar,
//   Alert,
//   Stack,
//   Typography,
//   alpha,
//   useTheme,
// } from "@mui/material";

// import DownloadIcon from "@mui/icons-material/Download";
// import AssessmentIcon from "@mui/icons-material/Assessment";
// import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
// import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// import StorefrontIcon from "@mui/icons-material/Storefront";

// import axios from "axios";

// // ───────────────────────────────────────────────────────────
// // REPORT CONFIG
// // ───────────────────────────────────────────────────────────

// const REPORT_OPTIONS = [
//   {
//     value: "customers",
//     label: "Customers",
//     count: 0,
//     icon: <PeopleAltIcon />,
//     color: "#2563EB",
//     endpoint: "/api/reports_api/customer_api",
//   },
//   {
//     value: "invoices",
//     label: "Invoices",
//     count: 0,
//     icon: <ReceiptLongIcon />,
//     color: "#7C3AED",
//     endpoint: "/api/reports_api/invoice_api",
//   },
//   {
//     value: "items",
//     label: "Items",
//     count: 0,
//     icon: <InventoryIcon />,
//     color: "#059669",
//     endpoint: "/api/reports_api/item_api",
//   },
//   {
//     value: "users",
//     label: "Users",
//     count: 0,
//     icon: <ManageAccountsIcon />,
//     color: "#D97706",
//     endpoint: "/api/reports_api/user_api",
//   },
//   {
//     value: "vendors",
//     label: "Vendors",
//     count: 0,
//     icon: <StorefrontIcon />,
//     color: "#DC2626",
//     endpoint: "/api/reports_api/vendor_api",
//   },
// ];


// // ───────────────────────────────────────────────────────────
// // CSV HELPERS
// // ───────────────────────────────────────────────────────────

// function flattenObject(obj, prefix = "") {
//   return Object.entries(obj).reduce((acc, [key, val]) => {
//     const fullKey = prefix ? `${prefix}.${key}` : key;

//     if (val !== null && typeof val === "object" && !Array.isArray(val)) {
//       Object.assign(acc, flattenObject(val, fullKey));
//     } else {
//       acc[fullKey] = String(val ?? "");
//     }

//     return acc;
//   }, {});
// }

// function convertToCSV(data) {
//   if (!data.length) return "";

//   const flattened = data.map((row) => flattenObject(row));

//   const headers = Array.from(
//     new Set(flattened.flatMap((r) => Object.keys(r)))
//   );

//   const escape = (v) =>
//     v.includes(",") || v.includes('"') || v.includes("\n")
//       ? `"${v.replace(/"/g, '""')}"`
//       : v;

//   const rows = [
//     headers.map(escape).join(","),

//     ...flattened.map((row) =>
//       headers.map((h) => escape(row[h] ?? "")).join(",")
//     ),
//   ];

//   return rows.join("\n");
// }

// function downloadCSV(csv, filename) {
//   const blob = new Blob([csv], {
//     type: "text/csv;charset=utf-8;",
//   });

//   const url = URL.createObjectURL(blob);

//   const link = document.createElement("a");

//   link.href = url;
//   link.download = filename;

//   link.click();

//   URL.revokeObjectURL(url);
// }

// // ───────────────────────────────────────────────────────────
// // FETCH REPORT DATA
// // ───────────────────────────────────────────────────────────

// async function fetchReportData(endpoint) {
//   const res = await axios.post(endpoint);

//   const json = res.data;

//   const result =
//     json?.data?.Result ??
//     json?.data?.result ??
//     json?.data?.data ??
//     json?.data ??
//     json?.Result ??
//     json?.results ??
//     json?.items ??
//     [];

//   return Array.isArray(result) ? result : [];
// }



// // ───────────────────────────────────────────────────────────
// // MAIN COMPONENT
// // ───────────────────────────────────────────────────────────

// export default function ReportsSection() {
//   const [selected, setSelected] = useState("");

//           const [loading, setLoading] = useState(false);
//               const [downloadLoading, setDownloadLoading] = useState(false);


// const [set, isSet]= useState(false);


//   // ───────────────────────────────────────────────────────────
// // STAT CARD
// // ───────────────────────────────────────────────────────────

// function StatCard({ label, value, icon, color }) {


    
//   const theme = useTheme();

//   return (
//     <Card
//       elevation={0}
//       sx={{
//         flex: 1,
//         minWidth: 150,
//         borderRadius: 3,
//         border: `1px solid ${theme.palette.divider}`,
//       }}
//     >
//       <CardContent
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           gap: 2,
//         }}
//       >
//         <Box
//           sx={{
//             width: 48,
//             height: 48,
//             borderRadius: 2,
//             bgcolor: alpha(color, 0.1),
//             color,
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           {icon}
//         </Box>

//         <Box>
//           {loading ? (
//                     <CircularProgress size={30} sx={{ color: "#fb7185" }} />
//                   ) : (
//           <Typography variant="h6" fontWeight={700}>
//             {value}
//           </Typography>
//                   )}

//           <Typography variant="body2" color="text.secondary">
//             {label}
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }



//   const [reportsOption, setReportsOption] =
//     useState(REPORT_OPTIONS);

//   const [toast, setToast] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });

//   const selectedOption =
//     reportsOption.find((o) => o.value === selected) ?? null;

//   // ─────────────────────────────────────────────────────────
//   // HANDLE SELECT
//   // ─────────────────────────────────────────────────────────

//   const handleChange = (e) => {
//     setSelected(e.target.value);
//   };

//   // ─────────────────────────────────────────────────────────
//   // DOWNLOAD REPORT
//   // ─────────────────────────────────────────────────────────

//   const handleGenerate = async () => {
//     if (!selectedOption) return;

//     try {
//      // setLoading(true);

// setDownloadLoading(true);

//       const data = await fetchReportData(
//         selectedOption.endpoint
//       );

//       if (!data.length) {
//         setToast({
//           open: true,
//           message: `No records found for ${selectedOption.label}`,
//           severity: "error",
//         });

//         return;
//       }

//       const csv = convertToCSV(data);

//       const filename = `${selectedOption.value}_report_${new Date()
//         .toISOString()
//         .slice(0, 10)}.csv`;

//       downloadCSV(csv, filename);

//       setToast({
//         open: true,
//         message: `${selectedOption.label} report downloaded successfully`,
//         severity: "success",
//       });
//     } catch (error) {
//       console.error(error);

//       setToast({
//         open: true,
//         message: "Something went wrong",
//         severity: "error",
//       });
//     } finally {
   
//       setDownloadLoading(false);
    
//     }
//   };

//   // ─────────────────────────────────────────────────────────
//   // FETCH TOTAL COUNTS
//   // ─────────────────────────────────────────────────────────


//   useEffect(() => {
//     const fetchTotalReports = async () => {
//       try {
//         setLoading(true);
      
       
//         const res = await axios.post(
//           "/api/fetch_reports_api"
//         );

//         console.log("Backend Response:", res.data);

//         isSet(true);

        
//         setReportsOption((prev) =>
//           prev.map((item) => {
//             if (item.value === "customers") {
//               return {
//                 ...item,
//                 count:
//                   res.data?.data_cust?.[0]
//                     ?.total_customers || 0,
//               };
//             }

//             if (item.value === "invoices") {
//               return {
//                 ...item,
//                 count:
//                   res.data?.data_inv?.[0]
//                     ?.total_invoices || 0,
//               };
//             }

//             if (item.value === "items") {
//               return {
//                 ...item,
//                 count:
//                   res.data?.data_item?.[0]
//                     ?.total_items || 0,
//               };
//             }

//             if (item.value === "users") {
//               return {
//                 ...item,
//                 count:
//                   res.data?.data_user?.[0]
//                     ?.total_users || 0,
//               };
//             }

//             if (item.value === "vendors") {
//               return {
//                 ...item,
//                 count:
//                   res.data?.data_ven?.[0]
//                     ?.total_vendors || 0,
//               };
//             }

//             return item;
//           })
//         );
//       } catch (error) {
//         console.error("Frontend Error:", error);
//       } finally {
//         setLoading(false);
       
     


//       }
//     };

//     if(set){
//       console.log("The value of set udner if  is ",set);
//     }
//     else{

//       console.log("The value of set under else is ",set);

//     fetchTotalReports();
//     }
//   }, []);

//   return (
//     <Box
//       sx={{
//         bgcolor: "background.default",
//         minHeight: "100vh",
//         py: 6,
//       }}
//     >
//       <Container maxWidth="lg">
//         {/* HEADER */}

//         <Stack direction="row" spacing={1} alignItems="center">
//           <AssessmentIcon />

//           <Typography variant="h5" fontWeight={700}>
//             Reports
//           </Typography>
//         </Stack>

//         <Divider sx={{ my: 3 }} />

//         {/* STAT CARDS */}

//         <Stack direction="row" flexWrap="wrap" gap={2}>
//           {reportsOption.map((opt) => (
//             <StatCard
//               key={opt.value}
//               label={opt.label}
//               value={opt.count}
//               icon={opt.icon}
//               color={opt.color}
//             />
//           ))}
//         </Stack>

//         {/* DOWNLOAD SECTION */}

//         <Card sx={{ mt: 4 }}>
//           <CardContent>
//             <Stack
//               direction={{ xs: "column", sm: "row" }}
//               spacing={2}
//             >
//               <FormControl sx={{ minWidth: 260 }}>
//                 <InputLabel>Report Type</InputLabel>

//                 <Select
//                   value={selected}
//                   label="Report Type"
//                   onChange={handleChange}
//                 >
//                   {reportsOption.map((opt) => (
//                     <MenuItem
//                       key={opt.value}
//                       value={opt.value}
//                     >
//                       {opt.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <Button
//                 onClick={handleGenerate}
//                 disabled={!selected || downloadLoading}
//                 variant="contained"
//                 startIcon={
//                   downloadLoading ? (
//                     <CircularProgress size={18} />
//                   ) : (
//                     <DownloadIcon />
//                   )
//                 }
//               >
//                 {downloadLoading ? "Loading..." : "Download"}
//               </Button>
//             </Stack>
//           </CardContent>
//         </Card>
//       </Container>

//       {/* SNACKBAR */}

//       <Snackbar
//         open={toast.open}
//         autoHideDuration={4000}
//         onClose={() =>
//           setToast((prev) => ({
//             ...prev,
//             open: false,
//           }))
//         }
//       >
//         <Alert severity={toast.severity}>
//           {toast.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Alert,
  Stack,
  Typography,
  alpha,
  useTheme,
  Chip,
} from "@mui/material";

import DownloadIcon from "@mui/icons-material/Download";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import InventoryIcon from "@mui/icons-material/Inventory";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import InsightsIcon from "@mui/icons-material/Insights";

import axios from "axios";
import { keyframes } from "@mui/system";

// ───────────────────────────────────────────────────────────
// ANIMATIONS
// ───────────────────────────────────────────────────────────

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatSoft = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
  100% { transform: translateY(0); }
`;

const shine = keyframes`
  0% { transform: translateX(-120%); }
  100% { transform: translateX(160%); }
`;

const pulseSoft = keyframes`
  0% { box-shadow: 0 0 0 rgba(37,99,235,0.08); }
  50% { box-shadow: 0 0 32px rgba(37,99,235,0.16); }
  100% { box-shadow: 0 0 0 rgba(37,99,235,0.08); }
`;

// ───────────────────────────────────────────────────────────
// BRAND COLORS
// ───────────────────────────────────────────────────────────

const brand = {
  navy: "#0f172a",
  primary: "#2563eb",
  primaryDark: "#1d4ed8",
  cyan: "#0891b2",
  cyanDark: "#0e7490",
  emerald: "#059669",
  amber: "#d97706",
  red: "#dc2626",

  blueLight: "#dbeafe",
  cyanLight: "#cffafe",
  emeraldLight: "#dcfce7",
  amberLight: "#fef3c7",
  redLight: "#fee2e2",

  surface: "#ffffff",
  text: "#334155",
  muted: "#64748b",
  border: "#dbe5f0",
};

// ───────────────────────────────────────────────────────────
// REPORT CONFIG
// ───────────────────────────────────────────────────────────

const REPORT_OPTIONS = [
  {
    value: "customers",
    label: "Customers",
    count: 0,
    icon: <PeopleAltIcon />,
    color: brand.primary,
    bg: brand.blueLight,
    endpoint: "/api/reports_api/customer_api",
  },
  {
    value: "invoices",
    label: "Invoices",
    count: 0,
    icon: <ReceiptLongIcon />,
    color: "#7C3AED",
    bg: "#ede9fe",
    endpoint: "/api/reports_api/invoice_api",
  },
  {
    value: "items",
    label: "Items",
    count: 0,
    icon: <InventoryIcon />,
    color: brand.emerald,
    bg: brand.emeraldLight,
    endpoint: "/api/reports_api/item_api",
  },
  {
    value: "users",
    label: "Users",
    count: 0,
    icon: <ManageAccountsIcon />,
    color: brand.amber,
    bg: brand.amberLight,
    endpoint: "/api/reports_api/user_api",
  },
  {
    value: "vendors",
    label: "Vendors",
    count: 0,
    icon: <StorefrontIcon />,
    color: brand.red,
    bg: brand.redLight,
    endpoint: "/api/reports_api/vendor_api",
  },
];

// ───────────────────────────────────────────────────────────
// CSV HELPERS
// ───────────────────────────────────────────────────────────

function flattenObject(obj, prefix = "") {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (val !== null && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(acc, flattenObject(val, fullKey));
    } else {
      acc[fullKey] = String(val ?? "");
    }

    return acc;
  }, {});
}

function convertToCSV(data) {
  if (!data.length) return "";

  const flattened = data.map((row) => flattenObject(row));

  const headers = Array.from(
    new Set(flattened.flatMap((r) => Object.keys(r)))
  );

  const escape = (v) =>
    v.includes(",") || v.includes('"') || v.includes("\n")
      ? `"${v.replace(/"/g, '""')}"`
      : v;

  const rows = [
    headers.map(escape).join(","),

    ...flattened.map((row) =>
      headers.map((h) => escape(row[h] ?? "")).join(",")
    ),
  ];

  return rows.join("\n");
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  link.click();

  URL.revokeObjectURL(url);
}

// ───────────────────────────────────────────────────────────
// FETCH REPORT DATA
// ───────────────────────────────────────────────────────────

async function fetchReportData(endpoint) {
  const res = await axios.post(endpoint);

  const json = res.data;

  const result =
    json?.data?.Result ??
    json?.data?.result ??
    json?.data?.data ??
    json?.data ??
    json?.Result ??
    json?.results ??
    json?.items ??
    [];

  return Array.isArray(result) ? result : [];
}

// ───────────────────────────────────────────────────────────
// MAIN COMPONENT
// ───────────────────────────────────────────────────────────

export default function ReportsSection() {
  const theme = useTheme();

  const [selected, setSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const [set, isSet] = useState(false);

  const [reportsOption, setReportsOption] =
    useState(REPORT_OPTIONS);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const selectedOption =
    reportsOption.find((o) => o.value === selected) ?? null;

  // ───────────────────────────────────────────────────────────
  // STAT CARD
  // ───────────────────────────────────────────────────────────

  function StatCard({ label, value, icon, color, bg, index }) {
    return (
      <Card
        elevation={0}
        sx={{
          flex: 1,
          minWidth: 220,
          borderRadius: "8px",
          backgroundColor: "rgba(255,255,255,0.94)",
          border: `1px solid ${brand.border}`,
          boxShadow: "0 18px 50px rgba(15, 23, 42, 0.07)",
          overflow: "hidden",
          position: "relative",
          animation: `${fadeUp} ${0.6 + index * 0.12}s ease both`,
          transition: "all 0.28s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            borderColor: color,
            boxShadow: "0 26px 66px rgba(15, 23, 42, 0.12)",
          },
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `linear-gradient(135deg, ${bg} 0%, transparent 58%)`,
            opacity: 0.85,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            width: "42%",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.72), transparent)",
            animation: `${shine} 4.5s ease-in-out infinite`,
          },
        }}
      >
        <CardContent
          sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="body2"
              sx={{
                color: brand.muted,
                fontWeight: 900,
              }}
            >
              {label}
            </Typography>

            {loading ? (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ mt: 1 }}
              >
                <CircularProgress
                  size={26}
                  thickness={5}
                  sx={{ color }}
                />

                <Typography
                  variant="body2"
                  sx={{
                    color: brand.muted,
                    fontWeight: 700,
                  }}
                >
                  Loading...
                </Typography>
              </Stack>
            ) : (
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{
                  color: brand.navy,
                  mt: 0.5,
                }}
              >
                {value}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: "8px",
              bgcolor: bg,
              color,
              display: "grid",
              placeItems: "center",
              boxShadow: "0 14px 28px rgba(15, 23, 42, 0.08)",
              animation: `${floatSoft} ${3 + index * 0.2}s ease-in-out infinite`,
            }}
          >
            {icon}
          </Box>
        </CardContent>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: 5,
            width: "100%",
            background: `linear-gradient(90deg, ${color}, transparent)`,
          }}
        />
      </Card>
    );
  }

  // ─────────────────────────────────────────────────────────
  // HANDLE SELECT
  // ─────────────────────────────────────────────────────────

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  // ─────────────────────────────────────────────────────────
  // DOWNLOAD REPORT
  // ─────────────────────────────────────────────────────────

  const handleGenerate = async () => {
    if (!selectedOption) return;

    try {
      setDownloadLoading(true);

      const data = await fetchReportData(
        selectedOption.endpoint
      );

      if (!data.length) {
        setToast({
          open: true,
          message: `No records found for ${selectedOption.label}`,
          severity: "error",
        });

        return;
      }

      const csv = convertToCSV(data);

      const filename = `${selectedOption.value}_report_${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

      downloadCSV(csv, filename);

      setToast({
        open: true,
        message: `${selectedOption.label} report downloaded successfully`,
        severity: "success",
      });
    } catch (error) {
      console.error(error);

      setToast({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });
    } finally {
      setDownloadLoading(false);
    }
  };

  // ─────────────────────────────────────────────────────────
  // FETCH TOTAL COUNTS
  // ─────────────────────────────────────────────────────────

  useEffect(() => {
    const fetchTotalReports = async () => {
      try {
        setLoading(true);

        const res = await axios.post(
          "/api/fetch_reports_api"
        );

        console.log("Backend Response:", res.data);

        isSet(true);

        setReportsOption((prev) =>
          prev.map((item) => {
            if (item.value === "customers") {
              return {
                ...item,
                count:
                  res.data?.data_cust?.[0]
                    ?.total_customers || 0,
              };
            }

            if (item.value === "invoices") {
              return {
                ...item,
                count:
                  res.data?.data_inv?.[0]
                    ?.total_invoices || 0,
              };
            }

            if (item.value === "items") {
              return {
                ...item,
                count:
                  res.data?.data_item?.[0]
                    ?.total_items || 0,
              };
            }

            if (item.value === "users") {
              return {
                ...item,
                count:
                  res.data?.data_user?.[0]
                    ?.total_users || 0,
              };
            }

            if (item.value === "vendors") {
              return {
                ...item,
                count:
                  res.data?.data_ven?.[0]
                    ?.total_vendors || 0,
              };
            }

            return item;
          })
        );
      } catch (error) {
        console.error("Frontend Error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!set) {
      fetchTotalReports();
    }
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef6ff 48%, #ecfeff 100%)",
        py: 5,
        px: 2,
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
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* HEADER */}

        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
          sx={{
            mb: 3,
            animation: `${fadeUp} 0.7s ease both`,
          }}
        >
          <Box>
            <Chip
              icon={<AssessmentIcon />}
              label="ERP Reports"
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
              sx={{
                color: brand.navy,
              }}
            >
              Reports & Analytics
            </Typography>

            <Typography
              sx={{
                color: brand.muted,
                mt: 0.5,
              }}
            >
              Download and manage ERP business reports instantly.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <Chip
              icon={<CloudDoneIcon />}
              label="Live Reports"
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
              label="Smart Export"
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

        <Divider sx={{ mb: 3 }} />

        {/* STAT CARDS */}

        <Stack direction="row" flexWrap="wrap" gap={3}>
          {reportsOption.map((opt, index) => (
            <StatCard
              key={opt.value}
              label={opt.label}
              value={opt.count}
              icon={opt.icon}
              color={opt.color}
              bg={opt.bg}
              index={index}
            />
          ))}
        </Stack>

        {/* DOWNLOAD SECTION */}

        <Card
          elevation={0}
          sx={{
            mt: 4,
            borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.94)",
            border: `1px solid ${brand.border}`,
            boxShadow: "0 18px 50px rgba(15, 23, 42, 0.07)",
            animation: `${fadeUp} 1s ease both`,
            transition: "all 0.28s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 24px 62px rgba(15, 23, 42, 0.1)",
            },
          }}
        >
          <CardContent sx={{ p: { xs: 2.5, md: 4 } }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              alignItems={{ xs: "stretch", md: "center" }}
            >
              <FormControl
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    backgroundColor: "#ffffff",
                    transition: "0.28s ease",
                    "& fieldset": {
                      borderColor: brand.border,
                    },
                    "&:hover fieldset": {
                      borderColor: brand.primary,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: brand.primary,
                      borderWidth: "2px",
                    },
                  },
                }}
              >
                <InputLabel>Report Type</InputLabel>

                <Select
                  value={selected}
                  label="Report Type"
                  onChange={handleChange}
                >
                  {reportsOption.map((opt) => (
                    <MenuItem
                      key={opt.value}
                      value={opt.value}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button
                onClick={handleGenerate}
                disabled={!selected || downloadLoading}
                startIcon={
                  downloadLoading ? (
                    <CircularProgress
                      size={18}
                      sx={{ color: "#fff" }}
                    />
                  ) : (
                    <DownloadIcon />
                  )
                }
                sx={{
                  minWidth: 200,
                  py: 1.6,
                  borderRadius: "8px",
                  fontWeight: 900,
                  textTransform: "none",
                  color: "#ffffff",
                  background:
                    "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
                  boxShadow:
                    "0 18px 38px rgba(37, 99, 235, 0.28)",
                  transition: "all 0.28s ease",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow:
                      "0 24px 48px rgba(37, 99, 235, 0.36)",
                    background:
                      "linear-gradient(135deg, #1d4ed8 0%, #0e7490 100%)",
                  },
                  "&.Mui-disabled": {
                    color: "#ffffff",
                    background: "#94a3b8",
                  },
                }}
              >
                {downloadLoading
                  ? "Generating..."
                  : "Download Report"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>

      {/* SNACKBAR */}

      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            open: false,
          }))
        }
      >
        <Alert severity={toast.severity}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}