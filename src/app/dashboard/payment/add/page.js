"use client";

import React, { useState,useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import Alert from "@mui/material/Alert";


// Dummy Invoice Data
// const invoices = [
//   { id: 1, invoiceNo: "INV-1001", amount: 2500 },
//   { id: 2, invoiceNo: "INV-1002", amount: 4800 },
//   { id: 3, invoiceNo: "INV-1003", amount: 3200 },
//   { id: 4, invoiceNo: "INV-1004", amount: 1500 },
// ];

export default function PaymentPage() {
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
    const [invoices, setInvoices]= useState([]);
      const [success, setSuccess] = useState("");
      const [error, setError] = useState("");

  const totalAmount = watch("totalAmount"); // 👈 watch total

  // Handle Invoice Change
// const handleInvoiceChange = (invoiceNo) => {
//   const found = invoices.find((inv) => inv.invoice_no === invoiceNo);
//   setSelectedInvoice(found);

//   if (found) {
//     setValue("totalAmount", found.net_total); // ensure backend ch amount aa rahi hove
//   }
// };


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
    const fetchInvoiceNum = async () => {
      try {

        const res = await axios.post("/api/fetchInvoiceNum_api", {
          userId: recUserId,
        });

        console.log("This is my result",res.data.data);

        setInvoices(res.data.data);
 } catch (error) {
        console.error(error);
      } finally {
        
      }
    };

    if (recUserId) {
      fetchInvoiceNum();
    }
  }, [recUserId]);

  const onSubmit = async (data) => {

    console.log("Payment Data:", data);
    try{
       setSuccess("");
      setError("");

    const result= await axios.post("/api/payment_api",data);
    console.log("This is my res",result);

    if(result.data.status==200){
     setSuccess("Payment has been successfully confirmed");

      reset();

    }}
    catch(err){
     

    }


  

    // alert("Payment Confirmed");
  };

  return (
    <Box p={3}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800 }}>
        <Typography variant="h5" mb={2}>
          Payment
        </Typography>
           {success && <Alert severity="success">{success}</Alert>}
                  {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Invoice Dropdown */}
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
                onChange={(e) => {
                  field.onChange(e);
                  handleInvoiceChange(e.target.value);
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

          {/* Payment Date */}
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
    />
  )}
/>

          {/* Show after selecting invoice */}
          {selectedInvoice && (
            <>
              {/* Total Amount */}
              <Controller
                name="totalAmount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Total Amount"
                    fullWidth
                    margin="normal"
                    InputProps={{ readOnly: true }}
                  />
                )}
              />



{/* Paid Amount (Read Only) */}
<Controller
  name="paidAmountReadOnly"
  control={control}
  render={({ field }) => (
    <TextField
      {...field}
      label="Paid Amount"
      fullWidth
      margin="normal"
      InputProps={{ readOnly: true }}
    />
  )}
/>

{/* Payable Amount (Read Only) */}
<Controller
  name="payableAmount"
  control={control}
  render={({ field }) => (
    <TextField
      {...field}
      label="Payable Amount"
      fullWidth
      margin="normal"
      InputProps={{ readOnly: true }}
    />
  )}
/>


              {/* Payment Type */}
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
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="online">Online</MenuItem>
                  </TextField>
                )}
              />

              {/* ✅ Paid Amount with Validation */}
              <Controller
                name="paidAmount"
                control={control}
                rules={{
                  required: "Enter paid amount",
                  validate: (value) =>
                 Number(value) <= Number(watch("payableAmount"))||
                    "Amount cannot exceed total amount",
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
                  />
                )}
              />

              {/* Confirm Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, backgroundColor: "#fB7185" }}
              >
                Confirm Payment
              </Button>
            </>
          )}
        </form>
      </Paper>
    </Box>
  );
}



