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

} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
import axios from "axios";
import Alert from "@mui/material/Alert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  // ✅ FETCH PAYMENTS
  const fetchPayments = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/view_payment_api", {
        search,
      });

      setPayments(res.data.data);
    } catch (err) {
      console.log("Payment fetch error", err);
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
    }
  };

  return (
    <Box>

      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Payments</Typography>

        <Button
          variant="contained"
          onClick={() => router.push("/dashboard/payment/add")}
        >
          + Add Payment
        </Button>
      </Box>

      {/* ALERTS */}
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      {/* SEARCH */}
      <TextField
        placeholder="Search payments..."
        fullWidth
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* TABLE */}
      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>

            <TableHead sx={{ bgcolor: "#f1f5f9" }}>
              <TableRow>
             
                <TableCell>Invoice No</TableCell>
                <TableCell>Payment Date</TableCell>
                <TableCell>Payment Mode</TableCell>
                  <TableCell>Paid Amt</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>


            <TableBody>
              {payments?.map((p) => (
                <TableRow key={p.id} hover>
      
<TableCell>
  {loading ? <CircularProgress /> : p.invoice_no}
</TableCell>
                 <TableCell>
  {p.payment_date
    ? new Date(p.payment_date).toLocaleDateString()
    : "-"}
</TableCell>
                  <TableCell>{p.payment_mode}</TableCell>
                  <TableCell>{p.paid_amt}</TableCell>


                  <TableCell>
  <span
    onClick={() =>
      router.push(`/dashboard/payment/edit?id=${p.id}`)
    }
    style={{ cursor: "pointer", color: "blue" }}
  >
    <RemoveRedEyeIcon />
  </span>
</TableCell>

                  <TableCell>
                    <span
                      onClick={() => onDelete(p.id)}
                      style={{ cursor: "pointer", color: "red" }}
                    >
                      {deleteLoading ? (
                        <CircularProgress size={18} />
                      ) : (
                        <DeleteIcon />
                      )}
                    </span>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        )}

      </Paper>
    </Box>
  );
}