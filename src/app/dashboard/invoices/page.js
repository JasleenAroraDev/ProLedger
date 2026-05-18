
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
  Alert,
  Stack,
  IconButton,
  Chip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { useRouter } from "next/navigation";
import axios from "axios";
import { keyframes } from "@mui/system";

export default function InvoiceListPage() {
  const router = useRouter();

  const brand = {
    navy: "#0f172a",
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",
    cyanDark: "#0e7490",
    emerald: "#059669",
    blueLight: "#dbeafe",
    cyanLight: "#cffafe",
    emeraldLight: "#dcfce7",
    surface: "#ffffff",
    text: "#334155",
    muted: "#64748b",
    border: "#dbe5f0",
    danger: "#dc2626",
    dangerLight: "#fee2e2",
  };

  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const floatSoft = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0); }
  `;

  const glowPulse = keyframes`
    0% { box-shadow: 0 0 0 rgba(37, 99, 235, 0.10); }
    50% { box-shadow: 0 18px 45px rgba(8, 145, 178, 0.18); }
    100% { box-shadow: 0 0 0 rgba(37, 99, 235, 0.10); }
  `;

  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [recUserId, setRecUserId] = useState("");

  const fetchInvoices = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/view_invoice_api", {
        search,
        user_id: recUserId,
      });

      setInvoices(res.data.data || []);
    } catch (err) {
      console.log(err);
      setError("Error fetching invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [search]);

  const onDelete = async (id) => {
    try {
      setDeleteLoading(id);
      setSuccess("");
      setError("");

      const res = await axios.post("/api/invoice_delete_api", { id });

      if (res) {
        setSuccess("Invoice deleted successfully");
      }

      fetchInvoices();
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setDeleteLoading(null);
    }
  };

  const eMail= async (id) =>{
     console.log("Id",id);

  try{
     const rest = await axios.post("/api/invoice_email_api", { id });

     console.log("Id",id);

  }
  catch(err){

  }
  }

  const createPdf = (id) => {
    router.push(`/dashboard/invoices/invoice_pdf?id=${id}`);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 3 },
        py: 3,
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
      <Box sx={{ position: "relative", zIndex: 1 }}>
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

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          sx={{
            mb: 3,
            animation: `${fadeUp} 0.55s ease both`,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                color: brand.navy,
              }}
            >
              Invoices
            </Typography>

            <Typography sx={{ color: brand.muted, mt: 0.5 }}>
              Manage sales invoices, tax amounts, discounts, and PDFs.
            </Typography>
          </Box>

          <Button
            onClick={() => router.push("/dashboard/invoices/add")}
            startIcon={<AddIcon />}
            sx={{
              px: 2.5,
              py: 1.2,
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 900,
              color: "#ffffff",
              background: "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
              boxShadow: "0 14px 30px rgba(37, 99, 235, 0.22)",
              transition: "all 0.28s ease",
              "&:hover": {
                background:
                  "linear-gradient(135deg, #1d4ed8 0%, #0e7490 100%)",
                transform: "translateY(-3px)",
                boxShadow: "0 20px 42px rgba(37, 99, 235, 0.32)",
              },
            }}
          >
            Add Invoice
          </Button>
        </Stack>

        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            mb: 3,
            borderRadius: "8px",
            backgroundColor: "rgba(255,255,255,0.92)",
            border: `1px solid ${brand.border}`,
            boxShadow: "0 14px 34px rgba(15, 23, 42, 0.08)",
            animation: `${fadeUp} 0.7s ease both`,
          }}
        >
          <TextField
            placeholder="Search invoice..."
            fullWidth
            value={search}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: brand.primary }} />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearch(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#ffffff",
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
                  transform: "scale(1.005)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: brand.primary,
                  borderWidth: "2px",
                },
              },
            }}
          />
        </Paper>

        <Paper
          elevation={0}
          sx={{
            borderRadius: "8px",
            overflowX: "auto",
            backgroundColor: "rgba(255,255,255,0.96)",
            border: `1px solid ${brand.blueLight}`,
            boxShadow: "0 24px 70px rgba(15, 23, 42, 0.12)",
            animation: `${fadeUp} 0.85s ease both, ${glowPulse} 4s ease-in-out infinite`,
          }}
        >
          {loading ? (
            <Box
              sx={{
                minHeight: 260,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress sx={{ color: brand.primary }} />
            </Box>
          ) : (
            <Table sx={{ minWidth: 1650 }}>
              <TableHead
                sx={{
                  background:
                    "linear-gradient(135deg, #dbeafe 0%, #cffafe 100%)",
                }}
              >
                <TableRow>
                  {[
                    "Invoice No",
                    "Date",
                    "Type",
                    "Party ID",
                    "Party Name",
                    "Gross Total",
                    "Discount",
                    "GST Type",
                    "CGST Perc",
                    "CGST Amt",
                    "SGST Perc",
                    "SGST Amt",
                    "IGST Perc",
                    "IGST Amt",
                    "Net Total",
                    "View",
                    "Delete",
                    "PDF",
               
                  ].map((head) => (
                    <TableCell
                      key={head}
                      sx={{
                        color: brand.navy,
                        fontWeight: 900,
                        borderBottom: `1px solid ${brand.border}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {invoices?.map((inv, index) => (
                  <TableRow
                    key={inv.id}
                    hover
                    sx={{
                      animation: `${fadeUp} 0.45s ease both`,
                      animationDelay: `${index * 0.04}s`,
                      transition: "0.25s ease",
                      "&:hover": {
                        backgroundColor: "#f8fafc",
                        transform: "scale(1.002)",
                      },
                    }}
                  >
                    <TableCell>
                      <Chip
                        label={inv.invoice_no}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          fontWeight: 900,
                          color: brand.primary,
                          backgroundColor: brand.blueLight,
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ color: brand.text, whiteSpace: "nowrap" }}>
                      {new Date(inv.invoice_date).toLocaleDateString()}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={inv.invoice_type}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          fontWeight: 900,
                          color: brand.cyanDark,
                          backgroundColor: brand.cyanLight,
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {inv.party_id}
                    </TableCell>

                    <TableCell>
                      <Stack direction="row" spacing={1.2} alignItems="center">
                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            borderRadius: "8px",
                            display: "grid",
                            placeItems: "center",
                            color: brand.primary,
                            backgroundColor: brand.blueLight,
                            animation: `${floatSoft} 3s ease-in-out infinite`,
                          }}
                        >
                          <ReceiptLongIcon fontSize="small" />
                        </Box>

                        <Typography fontWeight={800} color={brand.navy}>
                          {inv.party_name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {inv.gross_total}
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {inv.discount}
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {inv.gst_type}
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {inv.cgst_pers}
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {inv.cgst_amt}
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {inv.sgst_pers}
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {inv.sgst_amt}
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {inv.igst_pers}
                    </TableCell>

                    <TableCell sx={{ color: brand.text }}>
                      {inv.igst_amt}
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={inv.net_total}
                        size="small"
                        sx={{
                          borderRadius: "8px",
                          fontWeight: 900,
                          color: brand.emerald,
                          backgroundColor: brand.emeraldLight,
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <IconButton
                        onClick={() =>
                          router.push(`/dashboard/invoices/edit?id=${inv.id}`)
                        }
                        sx={{
                          color: brand.primary,
                          backgroundColor: brand.blueLight,
                          borderRadius: "8px",
                          transition: "0.25s ease",
                          "&:hover": {
                            backgroundColor: "#bfdbfe",
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        <RemoveRedEyeIcon />
                      </IconButton>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        onClick={() => onDelete(inv.id)}
                        sx={{
                          color: brand.danger,
                          backgroundColor: brand.dangerLight,
                          borderRadius: "8px",
                          transition: "0.25s ease",
                          "&:hover": {
                            backgroundColor: "#fecaca",
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        {deleteLoading === inv.id ? (
                          <CircularProgress size={22} color="inherit" />
                        ) : (
                          <DeleteIcon />
                        )}
                      </IconButton>
                    </TableCell>

                    <TableCell>
                      <IconButton
                        onClick={() => createPdf(inv.id)}
                        sx={{
                          color: brand.cyanDark,
                          backgroundColor: brand.cyanLight,
                          borderRadius: "8px",
                          transition: "0.25s ease",
                          "&:hover": {
                            backgroundColor: "#a5f3fc",
                            transform: "translateY(-3px)",
                          },
                        }}
                      >
                        <PictureAsPdfIcon />
                      </IconButton>
                    </TableCell>

                  </TableRow>
                ))}

                {invoices?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={19}>
                      <Stack
                        alignItems="center"
                        spacing={1}
                        sx={{
                          py: 6,
                          color: brand.muted,
                          animation: `${fadeUp} 0.6s ease both`,
                        }}
                      >
                        <ReceiptLongIcon
                          sx={{
                            fontSize: 42,
                            color: brand.primary,
                            animation: `${floatSoft} 3s ease-in-out infinite`,
                          }}
                        />
                        <Typography fontWeight={800}>
                          No invoices found
                        </Typography>
                      </Stack>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Box>
    </Box>
  );
}