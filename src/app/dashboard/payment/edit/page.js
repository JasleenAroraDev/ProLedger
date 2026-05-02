"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useSearchParams } from "next/navigation";

export default function PaymentEditPage() {

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      invoice: "",
      paymentDate: "",
      totalAmount: "",
      paidAmountReadOnly: "",
      payableAmount: "",
      paymentType: "",
      paidAmount: "",
    },
  });

  const searchParams = useSearchParams();
  const pay_id = searchParams.get("id");

  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [recUserId, setRecUserId] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const payableAmount = watch("payableAmount");

  // =============================
  // JWT USER
  // =============================
  useEffect(() => {
    const testToken = async () => {
      try {
        const token = localStorage.getItem("Token");

        if (!token) return;

        const res = await axios.post("/api/jwt_verify", {
          resToken: token,
        });

        setRecUserId(res.data.received_id);
      } catch (err) {
        console.log(err);
      }
    };

    testToken();
  }, []);

  // =============================
  // FETCH INVOICES
  // =============================
  useEffect(() => {
    const fetchInvoiceNum = async () => {
      try {
        const res = await axios.post("/api/fetchInvoiceNum_api", {
          userId: recUserId,
        });

        setInvoices(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (recUserId) fetchInvoiceNum();
  }, [recUserId]);

  // =============================
  // LOAD EDIT DATA (FIXED VALUES)
  // =============================
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const res = await axios.post("/api/payment_edit_api", {
          edit: pay_id,
        });

        const d = res.data.data;

        // ✅ NO FORCE 0, SAFE VALUES ONLY
        const total = d.total_amount ?? "";
        const paid = d.total_paid_amt ?? "";
        const payable = d.payable_amt ?? "";

        reset({
          invoice: d.invoice_no ?? "",
          paymentDate: d.payment_date ? d.payment_date.split("T")[0] : "",
          totalAmount: total,
          paidAmountReadOnly: paid,
          payableAmount: payable,
          paymentType: d.payment_mode ?? "",
          paidAmount: d.paid_amount ?? "",
        });

        setSelectedInvoice(d.invoice_no);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (pay_id) {
      loadData();
    }
  }, [pay_id, reset]);

  // =============================
  // INVOICE CHANGE
  // =============================
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

  // =============================
  // SUBMIT
  // =============================
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      data.id = pay_id;

      const result = await axios.post(
        "/api/payment_update_api",
        data
      );

      if (result.data.status === 200) {
        setSuccess("Payment updated successfully");
      }

    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // LOADER SCREEN
  // =============================
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Paper sx={{ p: 4, maxWidth: 800, margin: "auto" }}>
        <Typography variant="h5" mb={2}>
          Edit Payment
        </Typography>

        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Invoice */}
          <Controller
            name="invoice"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Invoice No"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  field.onChange(e.target.value);
                  handleInvoiceChange(e.target.value);
                }}
              >
                {invoices.map((inv, i) => (
                  <MenuItem key={i} value={inv.invoice_no}>
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
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            )}
          />

          {/* Total */}
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

          {/* Paid old */}
          <Controller
            name="paidAmountReadOnly"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Already Paid"
                fullWidth
                margin="normal"
                InputProps={{ readOnly: true }}
              />
            )}
          />

          {/* Payable */}
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
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Payment Type"
                fullWidth
                margin="normal"
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="online">Online</MenuItem>
              </TextField>
            )}
          />

          {/* Paid Amount */}
          <Controller
            name="paidAmount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter Amount"
                type="number"
                fullWidth
                margin="normal"
              />
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#fB7185" }}
          >
            Update Payment
          </Button>

        </form>
      </Paper>
    </Box>
  );
}