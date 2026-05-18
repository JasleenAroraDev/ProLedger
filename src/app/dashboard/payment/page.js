
"use client";

import React, { useState, useEffect } from "react";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
  Stack,
  IconButton,
  Alert,
  Chip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import PaymentsIcon from "@mui/icons-material/Payments";
import AddIcon from "@mui/icons-material/Add";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

import { useRouter } from "next/navigation";
import axios from "axios";

export default function PaymentsPage() {
  const router = useRouter();

  const brand = {
    navy: "#0f172a",
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",
    emerald: "#059669",
    blueLight: "#dbeafe",
    cyanLight: "#cffafe",
    emeraldLight: "#dcfce7",
    surface: "#ffffff",
    text: "#334155",
    muted: "#64748b",
    border: "#dbe5f0",
  };

  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ✅ FETCH PAYMENTS
  const fetchPayments = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/view_payment_api", {
        search,
      });

      setPayments(res.data.data || []);
    } catch (err) {
      console.log("Payment fetch error", err);
      setError("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [search]);

  // ✅ DELETE PAYMENT
  const onDelete = async (id) => {
    try {
      setDeleteLoading(true);
      setDeletingId(id);
      setSuccess("");
      setError("");

      const res = await axios.post("/api/payment_delete_api", {
        id,
      });

      if (res) {
        setSuccess("Payment deleted successfully");
      }

      fetchPayments();
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setDeleteLoading(false);
      setDeletingId(null);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef6ff 48%, #ecfeff 100%)",
        p: { xs: 2, md: 3 },

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
      <Box sx={{ position: "relative", zIndex: 1 }}>
        {/* HEADER */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={2}
          sx={{ mb: 3 }}
        >
          <Box>
            <Chip
              icon={<PaymentsIcon />}
              label="Payment Management"
              sx={{
                mb: 1.2,
                borderRadius: "8px",
                backgroundColor: brand.blueLight,
                color: brand.primaryDark,
                fontWeight: 900,
                border: `1px solid ${brand.border}`,
                "& .MuiChip-icon": {
                  color: brand.primary,
                },
              }}
            />

            <Typography
              variant="h4"
              fontWeight={900}
              sx={{ color: brand.navy }}
            >
              Payments
            </Typography>

            <Typography sx={{ color: brand.muted, mt: 0.5 }}>
              Manage payment records, invoices, and transaction details.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/dashboard/payment/add")}
            sx={{
              px: 2.6,
              py: 1.25,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 900,
              background: "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
              boxShadow: "0 18px 38px rgba(37, 99, 235, 0.24)",
              transition: "all 0.25s ease",

              "&:hover": {
                background:
                  "linear-gradient(135deg, #1d4ed8 0%, #0e7490 100%)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Add Payment
          </Button>
        </Stack>

        {/* ALERTS */}
        <Stack spacing={1.2} sx={{ mb: 2 }}>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>

        {/* SEARCH */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            mb: 3,
            borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.94)",
            border: `1px solid ${brand.border}`,
            boxShadow: "0 18px 50px rgba(15, 23, 42, 0.06)",
          }}
        >
          <TextField
            placeholder="Search payments by invoice no or payment mode..."
            fullWidth
            value={search}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                fontWeight: 600,

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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: brand.primary }} />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Paper>

        {/* TABLE */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "rgba(255,255,255,0.94)",
            border: `1px solid ${brand.border}`,
            boxShadow: "0 18px 50px rgba(15, 23, 42, 0.07)",
          }}
        >
          {loading ? (
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1.5}
              sx={{ minHeight: 260 }}
            >
              <CircularProgress sx={{ color: brand.primary }} />

              <Typography sx={{ color: brand.muted, fontWeight: 800 }}>
                Loading payments...
              </Typography>
            </Stack>
          ) : (
            <Box sx={{ overflowX: "auto" }}>
              <Table>
                <TableHead
                  sx={{
                    background:
                      "linear-gradient(135deg, #eff6ff 0%, #ecfeff 100%)",
                  }}
                >
                  <TableRow>
                    {[
                      "Invoice No",
                      "Payment Date",
                      "Payment Mode",
                      "Paid Amount",
                      "Action",
                      "Delete",
                    ].map((head) => (
                      <TableCell
                        key={head}
                        sx={{
                          color: brand.navy,
                          fontWeight: 900,
                          borderBottom: `1px solid ${brand.border}`,
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {payments?.map((p) => (
                    <TableRow
                      key={p.id}
                      hover
                      sx={{
                        transition: "all 0.2s ease",

                        "&:hover": {
                          backgroundColor: "#f8fafc",
                        },
                      }}
                    >
                      {/* INVOICE */}
                      <TableCell>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1.4}
                        >
                          <Box
                            sx={{
                              width: 38,
                              height: 38,
                              borderRadius: "10px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background:
                                "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
                              color: "#fff",
                              boxShadow:
                                "0 10px 20px rgba(37, 99, 235, 0.2)",
                            }}
                          >
                            <PaymentsIcon fontSize="small" />
                          </Box>

                          <Typography
                            fontWeight={900}
                            color={brand.navy}
                          >
                            {p.invoice_no}
                          </Typography>
                        </Stack>
                      </TableCell>

                      {/* DATE */}
                      <TableCell sx={{ color: brand.text }}>
                        {p.payment_date
                          ? new Date(p.payment_date).toLocaleDateString()
                          : "-"}
                      </TableCell>

                      {/* MODE */}
                      <TableCell>
                        <Chip
                          label={p.payment_mode}
                          size="small"
                          sx={{
                            borderRadius: "8px",
                            fontWeight: 900,
                            backgroundColor: brand.cyanLight,
                            color: brand.cyan,
                          }}
                        />
                      </TableCell>

                      {/* AMOUNT */}
                      <TableCell>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                        >
                          <CurrencyRupeeIcon
                            sx={{
                              fontSize: 18,
                              color: brand.emerald,
                            }}
                          />

                          <Typography
                            fontWeight={800}
                            sx={{ color: brand.emerald }}
                          >
                            {p.paid_amt}
                          </Typography>
                        </Stack>
                      </TableCell>

                      {/* VIEW */}
                      <TableCell>
                        <IconButton
                          onClick={() =>
                            router.push(
                              `/dashboard/payment/edit?id=${p.id}`
                            )
                          }
                          sx={{
                            color: brand.primary,
                            backgroundColor: brand.blueLight,
                            borderRadius: "8px",

                            "&:hover": {
                              backgroundColor: "#bfdbfe",
                            },
                          }}
                        >
                          <RemoveRedEyeIcon />
                        </IconButton>
                      </TableCell>

                      {/* DELETE */}
                      <TableCell>
                        <IconButton
                          onClick={() => onDelete(p.id)}
                          sx={{
                            color: "#dc2626",
                            backgroundColor: "#fee2e2",
                            borderRadius: "8px",

                            "&:hover": {
                              backgroundColor: "#fecaca",
                            },
                          }}
                        >
                          {deleteLoading && deletingId === p.id ? (
                            <CircularProgress
                              size={22}
                              sx={{ color: "#dc2626" }}
                            />
                          ) : (
                            <DeleteIcon />
                          )}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                  {!payments?.length && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Stack alignItems="center" sx={{ py: 5 }}>
                          <Typography
                            fontWeight={900}
                            color={brand.navy}
                          >
                            No payments found
                          </Typography>

                          <Typography color={brand.muted}>
                            Try another search or add a new payment.
                          </Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
}
