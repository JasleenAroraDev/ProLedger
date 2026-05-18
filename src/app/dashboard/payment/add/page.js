// "use client";

// import React, { useState,useEffect } from "react";
// import {
//   Box,
//   Button,
//   MenuItem,
//   TextField,
//   Typography,
//   Paper,
// } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";
// import axios from 'axios';
// import Alert from "@mui/material/Alert";


// // Dummy Invoice Data
// // const invoices = [
// //   { id: 1, invoiceNo: "INV-1001", amount: 2500 },
// //   { id: 2, invoiceNo: "INV-1002", amount: 4800 },
// //   { id: 3, invoiceNo: "INV-1003", amount: 3200 },
// //   { id: 4, invoiceNo: "INV-1004", amount: 1500 },
// // ];

// export default function PaymentPage() {
//   const {
//     handleSubmit,
//     control,
//     setValue,
//     watch,
//      reset,
//     formState: { errors },
//   } = useForm();

//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//     const [recUserId, setRecUserId] = useState("");
//     const [invoices, setInvoices]= useState([]);
//       const [success, setSuccess] = useState("");
//       const [error, setError] = useState("");

//   const totalAmount = watch("totalAmount"); // 👈 watch total

//   // Handle Invoice Change
// // const handleInvoiceChange = (invoiceNo) => {
// //   const found = invoices.find((inv) => inv.invoice_no === invoiceNo);
// //   setSelectedInvoice(found);

// //   if (found) {
// //     setValue("totalAmount", found.net_total); // ensure backend ch amount aa rahi hove
// //   }
// // };


// const handleInvoiceChange = (invoiceNo) => {
//   const found = invoices.find((inv) => inv.invoice_no === invoiceNo);
//   setSelectedInvoice(found);

//   if (found) {
//     const total = Number(found.net_total || 0);
//     const paid = Number(found.total_paid_amt || 0);
//     const payable = total - paid;

//     setValue("totalAmount", total);
//     setValue("paidAmountReadOnly", paid);
//     setValue("payableAmount", payable);
//   }
// };




//       useEffect(() => {
//     const testToken = async () => {
//       try {
//         const resToken = localStorage.getItem("Token");

//         if (!resToken) {
//           router.push("/signin");
//         }

//         const res = await axios.post("/api/jwt_verify", { resToken });

//         setRecUserId(res.data.received_id);

//         if (!res.data.valid) {
//           router.push("/signin");
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     testToken();
//   }, []);


//     useEffect(() => {
//     const fetchInvoiceNum = async () => {
//       try {

//         const res = await axios.post("/api/fetchInvoiceNum_api", {
//           userId: recUserId,
//         });

//         console.log("This is my result",res.data.data);

//         setInvoices(res.data.data);
//  } catch (error) {
//         console.error(error);
//       } finally {
        
//       }
//     };

//     if (recUserId) {
//       fetchInvoiceNum();
//     }
//   }, [recUserId]);

//   const onSubmit = async (data) => {

//     console.log("Payment Data:", data);
//     try{
//        setSuccess("");
//       setError("");

//     const result= await axios.post("/api/payment_api",data);
//     console.log("This is my res",result);

//     if(result.data.status==200){
//      setSuccess("Payment has been successfully confirmed");

//       reset();

//     }}
//     catch(err){
     

//     }


  

//     // alert("Payment Confirmed");
//   };

//   return (
//     <Box p={3}>
//       <Paper elevation={3} sx={{ p: 4, maxWidth: 800 }}>
//         <Typography variant="h5" mb={2}>
//           Payment
//         </Typography>
//            {success && <Alert severity="success">{success}</Alert>}
//                   {error && <Alert severity="error">{error}</Alert>}

//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Invoice Dropdown */}
//           <Controller
//             name="invoice"
//             control={control}
//             rules={{ required: "Invoice is required" }}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 select
//                 label="Invoice No"
//                 fullWidth
//                 margin="normal"
//                 error={!!errors.invoice}
//                 helperText={errors.invoice?.message}
//                 onChange={(e) => {
//                   field.onChange(e);
//                   handleInvoiceChange(e.target.value);
//                 }}
//               >
//             {invoices.map((inv, index) => (
//   <MenuItem key={index} value={inv.invoice_no}>
//     {inv.invoice_no}
//   </MenuItem>
// ))}
         
//               </TextField>
//             )}
//           />

//           {/* Payment Date */}
// <Controller
//   name="paymentDate"
//   control={control}
//   rules={{ required: "Payment date is required" }}
//   render={({ field }) => (
//     <TextField
//       {...field}
//       type="date"
//       label="Payment Date"
//       fullWidth
//       margin="normal"
//       InputLabelProps={{ shrink: true }}
//       error={!!errors.paymentDate}
//       helperText={errors.paymentDate?.message}
//     />
//   )}
// />

//           {/* Show after selecting invoice */}
//           {selectedInvoice && (
//             <>
//               {/* Total Amount */}
//               <Controller
//                 name="totalAmount"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Total Amount"
//                     fullWidth
//                     margin="normal"
//                     InputProps={{ readOnly: true }}
//                   />
//                 )}
//               />



// {/* Paid Amount (Read Only) */}
// <Controller
//   name="paidAmountReadOnly"
//   control={control}
//   render={({ field }) => (
//     <TextField
//       {...field}
//       label="Paid Amount"
//       fullWidth
//       margin="normal"
//       InputProps={{ readOnly: true }}
//     />
//   )}
// />

// {/* Payable Amount (Read Only) */}
// <Controller
//   name="payableAmount"
//   control={control}
//   render={({ field }) => (
//     <TextField
//       {...field}
//       label="Payable Amount"
//       fullWidth
//       margin="normal"
//       InputProps={{ readOnly: true }}
//     />
//   )}
// />


//               {/* Payment Type */}
//               <Controller
//                 name="paymentType"
//                 control={control}
//                 rules={{ required: "Payment type required" }}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     select
//                     label="Payment Type"
//                     fullWidth
//                     margin="normal"
//                     error={!!errors.paymentType}
//                     helperText={errors.paymentType?.message}
//                   >
//                     <MenuItem value="cash">Cash</MenuItem>
//                     <MenuItem value="online">Online</MenuItem>
//                   </TextField>
//                 )}
//               />

//               {/* ✅ Paid Amount with Validation */}
//               <Controller
//                 name="paidAmount"
//                 control={control}
//                 rules={{
//                   required: "Enter paid amount",
//                   validate: (value) =>
//                  Number(value) <= Number(watch("payableAmount"))||
//                     "Amount cannot exceed total amount",
//                 }}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Enter Amount"
//                     type="number"
//                     fullWidth
//                     margin="normal"
//                     error={!!errors.paidAmount}
//                     helperText={errors.paidAmount?.message}
//                   />
//                 )}
//               />

//               {/* Confirm Button */}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 fullWidth
//                 sx={{ mt: 2, backgroundColor: "#fB7185" }}
//               >
//                 Confirm Payment
//               </Button>
//             </>
//           )}
//         </form>
//       </Paper>
//     </Box>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";

import Alert from "@mui/material/Alert";

import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
  CircularProgress,
  Stack,
  Chip,
  InputAdornment,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

import PaymentsIcon from "@mui/icons-material/Payments";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { keyframes } from "@mui/system";

export default function PaymentPage() {
  const router = useRouter();

  const brand = {
    navy: "#0f172a",
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",
    cyanDark: "#0e7490",
    blueLight: "#dbeafe",
    text: "#334155",
    muted: "#64748b",
    border: "#dbe5f0",
    emerald: "#059669",
  };

  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(26px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const floatSoft = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0); }
  `;

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      color: brand.navy,
      fontWeight: 600,
      transition: "0.28s ease",

      "& fieldset": {
        borderColor: brand.border,
      },

      "&:hover": {
        transform: "translateY(-2px)",
      },

      "&:hover fieldset": {
        borderColor: brand.primary,
      },

      "&.Mui-focused": {
        transform: "scale(1.01)",
      },

      "&.Mui-focused fieldset": {
        borderColor: brand.primary,
        borderWidth: "2px",
      },
    },

    "& .MuiInputLabel-root": {
      color: brand.muted,
      fontWeight: 600,
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: brand.primary,
    },
  };

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [recUserId, setRecUserId] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const totalAmount = watch("totalAmount");

  // HANDLE INVOICE
  const handleInvoiceChange = (invoiceNo) => {
    const found = invoices.find((inv) => inv.invoice_no === invoiceNo);

    setSelectedInvoice(found);

    if (found) {
      const total = Number(found.net_total || 0);
      const paid = Number(found.total_paid_amt || 0);
      const payable = total - paid;

      setValue("totalAmount", total);
      setValue("paidAmountReadOnly", paid);
      setValue("payableAmount", payable);
    }
  };

  // VERIFY TOKEN
  useEffect(() => {
    const testToken = async () => {
      try {
        const resToken = localStorage.getItem("Token");

        if (!resToken) {
          router.push("/signin");
        }

        const res = await axios.post("/api/jwt_verify", {
          resToken,
        });

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

  // FETCH INVOICES
  useEffect(() => {
    const fetchInvoiceNum = async () => {
      try {
        const res = await axios.post("/api/fetchInvoiceNum_api", {
          userId: recUserId,
        });

        console.log("This is my result", res.data.data);

        setInvoices(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (recUserId) {
      fetchInvoiceNum();
    }
  }, [recUserId]);

  // SUBMIT
  const onSubmit = async (data) => {
    console.log("Payment Data:", data);

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      const result = await axios.post("/api/payment_api", data);

      console.log("This is my res", result);

      if (result.data.status == 200) {
        setSuccess("Payment has been successfully confirmed");

        reset();
        setSelectedInvoice(null);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: 2,
        py: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef6ff 48%, #ecfeff 100%)",
        position: "relative",
        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.055) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 620,
          p: { xs: 2.5, sm: 4 },
          borderRadius: "8px",
          background: "rgba(255,255,255,0.95)",
          border: `1px solid ${brand.blueLight}`,
          boxShadow: "0 34px 90px rgba(15, 23, 42, 0.14)",
          backdropFilter: "blur(18px)",
          position: "relative",
          zIndex: 1,
          animation: `${fadeUp} 0.7s ease both, ${floatSoft} 5s ease-in-out 0.8s infinite`,
        }}
      >
        {/* HEADER */}
        <Stack spacing={1} sx={{ mb: 2.5, textAlign: "center" }}>
          <Chip
            icon={<PaymentsIcon />}
            label="New Payment"
            sx={{
              mx: "auto",
              width: "fit-content",
              borderRadius: "8px",
              backgroundColor: brand.blueLight,
              color: brand.primaryDark,
              fontWeight: 900,

              "& .MuiChip-icon": {
                color: brand.primary,
              },
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: brand.navy,
            }}
          >
            Add Payment
          </Typography>

          <Typography sx={{ color: brand.muted }}>
            Fill payment details for invoice and transaction records.
          </Typography>
        </Stack>

        {/* ALERTS */}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* FORM */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          {/* INVOICE */}
          <Controller
            name="invoice"
            control={control}
            rules={{ required: "Invoice is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Invoice No"
                fullWidth
                margin="normal"
                error={!!errors.invoice}
                helperText={errors.invoice?.message}
                disabled={loading}
                sx={inputStyle}
                onChange={(e) => {
                  field.onChange(e);
                  handleInvoiceChange(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ReceiptLongIcon sx={{ color: brand.primary }} />
                    </InputAdornment>
                  ),
                }}
              >
                {invoices.map((inv, index) => (
                  <MenuItem key={index} value={inv.invoice_no}>
                    {inv.invoice_no}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* PAYMENT DATE */}
          <Controller
            name="paymentDate"
            control={control}
            rules={{ required: "Payment date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                label="Payment Date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                error={!!errors.paymentDate}
                helperText={errors.paymentDate?.message}
                disabled={loading}
                sx={inputStyle}
              />
            )}
          />

          {/* CONDITIONAL DATA */}
          {selectedInvoice && (
            <>
              {/* TOTAL AMOUNT */}
              <Controller
                name="totalAmount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Total Amount"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyRupeeIcon
                            sx={{ color: brand.emerald }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputStyle}
                  />
                )}
              />

              {/* PAID AMOUNT */}
              <Controller
                name="paidAmountReadOnly"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Paid Amount"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyRupeeIcon
                            sx={{ color: brand.emerald }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputStyle}
                  />
                )}
              />

              {/* PAYABLE AMOUNT */}
              <Controller
                name="payableAmount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Payable Amount"
                    fullWidth
                    margin="normal"
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyRupeeIcon
                            sx={{ color: brand.emerald }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    sx={inputStyle}
                  />
                )}
              />

              {/* PAYMENT TYPE */}
              <Controller
                name="paymentType"
                control={control}
                rules={{ required: "Payment type required" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Payment Type"
                    fullWidth
                    margin="normal"
                    error={!!errors.paymentType}
                    helperText={errors.paymentType?.message}
                    disabled={loading}
                    sx={inputStyle}
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="online">Online</MenuItem>
                  </TextField>
                )}
              />

              {/* ENTER AMOUNT */}
              <Controller
                name="paidAmount"
                control={control}
                rules={{
                  required: "Enter paid amount",

                  validate: (value) =>
                    Number(value) <= Number(watch("payableAmount")) ||
                    "Amount cannot exceed payable amount",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Enter Amount"
                    type="number"
                    fullWidth
                    margin="normal"
                    error={!!errors.paidAmount}
                    helperText={errors.paidAmount?.message}
                    disabled={loading}
                    sx={inputStyle}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <CurrencyRupeeIcon
                            sx={{ color: brand.emerald }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              {/* BUTTON */}
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                endIcon={!loading && <ArrowForwardIcon />}
                sx={{
                  mt: 3,
                  py: 1.55,
                  borderRadius: "8px",
                  fontWeight: 900,
                  textTransform: "none",
                  color: "#ffffff",
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

                  "&.Mui-disabled": {
                    color: "#ffffff",
                    background: "#94a3b8",
                  },
                }}
              >
                {loading ? (
                  <CircularProgress
                    size={24}
                    sx={{ color: "#ffffff" }}
                  />
                ) : (
                  "Confirm Payment"
                )}
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}




