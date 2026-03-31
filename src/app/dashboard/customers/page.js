"use client";
import React, {useState} from "react";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Avatar,
  TextField,
  InputAdornment,
  Button,
  CircularProgress
} from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';

import SearchIcon from "@mui/icons-material/Search";

import {useRouter} from "next/navigation";

import axios from 'axios';
import { useEffect } from "react";
import Alert from "@mui/material/Alert";

export default function CustomersPage() {

  
const [customers, setCustomers]=useState([]);
const [search, setSearch]=useState("");
const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

      const fetchCustomer = async () => {

    try{
       setLoading(true);


      console.log("value of search ",search);

      const res = await axios.post("/api/view_customer_api",{search});

     console.log("This is your data", res.data.data);

     setCustomers(res.data.data);
  
  }
  catch(err){
    console.log("Error fetching vendor:", err);
  }
  finally{
    setLoading(false);
  }
}

     useEffect(() => {

  fetchCustomer();


}, [search]);

const onDelete = async(id)=>{

  try{
    setDeleteLoading(true);
      setSuccess("");
      setError("");

  console.log("This is id",id);
  

  const res= await axios.post("/api/customer_delete_api",{id});

  console.log("This is my result",res);

  if(res){
      setSuccess("Customer Delete Successfully ");

  }
  fetchCustomer();
} catch(err){
  setError("Something Went wrong");

}
finally{
  setDeleteLoading(false);
}

          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

}

  // const vendors = [
  //   { id: 1, name: "Tech Supplies", email: "tech@gmail.com", phone: "9876500000", city: "Delhi", status: "Active" },
  //   { id: 2, name: "Office Mart", email: "office@gmail.com", phone: "9123400000", city: "Mumbai", status: "Active" },
  //   { id: 3, name: "Raw Materials Co.", email: "raw@gmail.com", phone: "9988700000", city: "Chandigarh", status: "Inactive" },
  //   { id: 4, name: "Global Traders", email: "global@gmail.com", phone: "9090900000", city: "Ludhiana", status: "Active" },
  // ];

  return (
    <Box>

      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
        }}
      >
        <Typography variant="h4">Customers</Typography>

        <Button variant="contained" onClick={()=>router.push("/dashboard/customers/add")}>
          + Add Customer
        </Button>
      </Box>

      {/* SEARCH */}
      <TextField
        placeholder="Search customers..."
        fullWidth
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e)=>
          setSearch(e.target.value)
        }
      />

      {/* TABLE */}
      <Paper sx={{ borderRadius: 3, overflow: "hidden" }}>

        {loading ? <Box sx={{ display: "flex", justifyContent: "center", }}>
  <CircularProgress />
</Box> : 

        <Table>

          <TableHead sx={{ bgcolor: "#f1f5f9" }}>
            <TableRow>
              <TableCell>Customer</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Delete</TableCell>

            </TableRow>
          </TableHead>

          <TableBody>
            {customers?.map((customer) => (
              <TableRow key={customer.id} hover>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar>
                      {customer.customer_name.charAt(0)}
                    </Avatar>
                    {customer.customer_name}
                  </Box>
                </TableCell>

                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone_number}</TableCell>
                <TableCell>{customer.city}</TableCell>

                <TableCell>
                  <Chip
                    label={customer.status}
                    color={customer.status === "Active" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>

                 <TableCell>{customer.address}</TableCell>
                 <TableCell>
                   <span onClick={() => router.push(`/dashboard/customers/edit?id=${customer.id}`)}
                    style={{ cursor: "pointer" , color:"blue"}}>
          <RemoveRedEyeIcon/>
        </span>
                 </TableCell>
                 <TableCell>
                  <span onClick={() => onDelete(customer.id)} style={{ cursor: "pointer", color:"red" }}> {deleteLoading ? <CircularProgress /> : <DeleteIcon/>}</span>
                 </TableCell>

              </TableRow>

            ))}
          </TableBody>

        </Table>

      }
      </Paper>

    </Box>
  );
}