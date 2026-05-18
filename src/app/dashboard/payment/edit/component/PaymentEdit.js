"use client";

import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
  Stack,
  Chip,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import PaymentsIcon from "@mui/icons-material/Payments";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { keyframes } from "@mui/system";

export default function PaymentEditPage() {
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
  } = useForm({
    defaultValues: {
      invoice: "",
      paymentDate: "",
      totalAmount: "",
      paidAmountReadOnly: "",
      payableAmount: "",
      paymentType: "",
      paidAmount: 0,
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
  // LOAD EDIT DATA
  // =============================
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const res = await axios.post("/api/payment_edit_api", {
          edit: pay_id,
        });

        const d = res.data.data;

        const matchedInvoice = invoices.find(
          (inv) => inv.invoice_no === d.invoice_no
        );

        const total = matchedInvoice
          ? Number(matchedInvoice.net_total || 0)
          : "";

        const paid = matchedInvoice
          ? Number(matchedInvoice.total_paid_amt || 0)
          : "";

        const payable =
          total !== "" && paid !== "" ? total - paid : "";

        reset({
          invoice: d.invoice_no ?? "",
          paymentDate: d.payment_date
            ? d.payment_date.split("T")[0]
            : "",
          totalAmount: total,
          paidAmountReadOnly: paid,
          payableAmount: payable,
          paymentType: d.payment_mode ?? "",
        });

        setSelectedInvoice(d.invoice_no);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    if (pay_id && invoices.length > 0) {
      loadData();
    }
  }, [pay_id, reset, invoices]);

  // =============================
  // INVOICE CHANGE
  // =============================
  const handleInvoiceChange = (invoiceNo) => {
    const found = invoices.find(
      (inv) => inv.invoice_no === invoiceNo
    );

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

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // LOADING SCREEN
  // =============================
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #f8fafc 0%, #eef6ff 48%, #ecfeff 100%)",
        }}
      >
        <CircularProgress sx={{ color: brand.primary }} />
      </Box>
    );
  }

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
        <Stack spacing={1} sx={{ mb: 2.5, textAlign: "center" }}>
          <Chip
            icon={<PaymentsIcon />}
            label="Edit Payment"
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
            Update Payment
          </Typography>

          <Typography sx={{ color: brand.muted }}>
            Edit payment details and update invoice records.
          </Typography>
        </Stack>

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

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
                sx={inputStyle}
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
                label="Payment Date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                sx={inputStyle}
              />
            )}
          />

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
                sx={inputStyle}
              />
            )}
          />

          {/* Already Paid */}
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
                sx={inputStyle}
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
                sx={inputStyle}
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
                sx={inputStyle}
              >
                <MenuItem value="cash">Cash</MenuItem>
                <MenuItem value="online">Online</MenuItem>
              </TextField>
            )}
          />

          {/* Enter Amount */}
          <Controller
            name="paidAmount"
            control={control}
            rules={{
              validate: (value) =>
                Number(value) <= Number(payableAmount) ||
                "Amount cannot exceed payable amount",
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter Amount"
                type="number"
                fullWidth
                margin="normal"
                sx={inputStyle}
              />
            )}
          />

          {/* Submit */}
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
            {loading ? (
              <CircularProgress
                size={24}
                sx={{ color: "#ffffff" }}
              />
            ) : (
              "Update Payment"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}