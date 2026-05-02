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
  CircularProgress
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';

import { useRouter } from "next/navigation";
import axios from "axios";
import Alert from "@mui/material/Alert";

export default function InvoiceListPage() {



  const [invoices, setInvoices] = useState([]);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
   const [deleteLoading, setDeleteLoading] = useState(false);
   const [recUserId, setRecUserId]= useState("");

    
   
  const router = useRouter();


  useEffect(() => {

  fetchInvoices();


}, [search]);

const onDelete = async(id)=>{

  try{
      setDeleteLoading(true);
      setSuccess("");
      setError("");

  console.log("This is id",id);
  

  const res= await axios.post("/api/invoice_delete_api",{id});

  console.log("This is my result",res);

  if(res){
      setSuccess("Invoice Delete Successfully ");

  }
  fetchInvoices();
} catch(err){
  setError("Something Went wrong");

}
finally{
  setDeleteLoading(false);
}

          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

}

const createPdf= (abc)=>{
  console.log("abc value is:", abc); 

 router.push(`/dashboard/invoices/invoice_pdf?id=${abc}`);

}



  const fetchInvoices = async () => {


  try {
    setLoading(true);

    const res = await axios.post("/api/view_invoice_api", {
      search,
      user_id: recUserId,  
    });

    setInvoices(res.data.data || []);
    console.log("This is res", res.data.data);

  } catch (err) {
    console.log(err);
    setError("Error fetching invoices");
  } finally {
    setLoading(false);
  }
};


  
 

  return (
   
    <Box>

      {/* HEADER */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Invoices</Typography>

        <Button
          variant="contained"
          onClick={() => router.push("/dashboard/invoices/add")}
        >
          + Add Invoice
        </Button>
      </Box>

      {/* ALERTS */}
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      {/* SEARCH */}
      <TextField
        placeholder="Search invoice..."
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
      <Paper sx={{ borderRadius: 3, overflowX: "auto" }}>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <CircularProgress />
          </Box>
        ) : (

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice No</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Party ID</TableCell>
                <TableCell>Party Name</TableCell>
                <TableCell>Gross Total</TableCell>
                <TableCell>Discount</TableCell>
                <TableCell>GST Type</TableCell>
                <TableCell>CGST Perc</TableCell>
                <TableCell>CGST Amt</TableCell>
                <TableCell>SGST Perc</TableCell>
                <TableCell>SGST Amt</TableCell>
                <TableCell>IGST Perc</TableCell>
                <TableCell>IGST Amt</TableCell>
                <TableCell>Net Total</TableCell>
                <TableCell>View</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>PDF</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {invoices?.map((inv) => (
                <TableRow key={inv.id} hover>

                  <TableCell>{inv.invoice_no}</TableCell>
                  {/* <TableCell>{inv.invoice_date}</TableCell> */}
                  <TableCell> {new Date(inv.invoice_date).toLocaleDateString()}</TableCell>
                  <TableCell>{inv.invoice_type}</TableCell>
                  <TableCell>{inv.party_id}</TableCell>
                  <TableCell>{inv.party_name}</TableCell>
                  <TableCell>{inv.gross_total}</TableCell>
                  <TableCell>{inv.discount}</TableCell>
                  <TableCell>{inv.gst_type}</TableCell>
                  <TableCell>{inv.cgst_pers}</TableCell>
                  <TableCell>{inv.cgst_amt}</TableCell>
                  <TableCell>{inv.sgst_pers}</TableCell>
                  <TableCell>{inv.sgst_amt}</TableCell>
                  <TableCell>{inv.igst_pers}</TableCell>
                  <TableCell>{inv.igst_amt}</TableCell>
                  <TableCell>{inv.net_total}</TableCell>

                  {/* VIEW */}
                  <TableCell>
                    <span
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() =>
                        router.push(`/dashboard/invoices/edit?id=${inv.id}`)
                      }
                    >
                      <RemoveRedEyeIcon />
                    </span>
                  </TableCell>

                  {/* DELETE */}
                  <TableCell>
                    <span onClick={() => onDelete(inv.id)} style={{ cursor: "pointer", color:"red" }}> {deleteLoading ? <CircularProgress /> : <DeleteIcon/>}</span>
                  
                  </TableCell>

                  <TableCell>
                    <span onClick={()=> createPdf(inv.id)}

                     style={{ cursor: "pointer", color:"black" }}>PDF</span>
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