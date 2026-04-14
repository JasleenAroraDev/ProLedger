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
  Button
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import {useRouter} from "next/navigation";

import axios from 'axios';
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';



export default function VendorsPage() {

const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [loading, setLoading] = useState(false);
const [vendors, setVendors]=useState([]);
const [search, setSearch]=useState("");

    const router = useRouter();
     const fetchVendor = async () => {

    try{
      setLoading(true);


      const res = await axios.post("/api/view_vendor_api",{search});

     console.log("This is your data", res.data.data);

     setVendors(res.data.data);
  
  }
  catch(err){
    console.log("Error fetching vendor:", err);
  }
  finally{
    setLoading(false);
  }
}

     useEffect(() => {
 
  fetchVendor();


}, [search]);

const onDelete = async(id)=>{

  try{
    
      setSuccess("");
      setError("");
      setDeleteLoading(true);

  console.log("This is id",id);
  

  const res= await axios.post("/api/Vendor_delete_api",{id});

  console.log("This is my result",res);

  if(res){
      setSuccess("Vendor Delete Successfully ");

  }
  fetchVendor();
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
        <Typography variant="h4">Vendors</Typography>

        <Button variant="contained" onClick={()=>router.push("/dashboard/vendors/add")}>
          + Add Vendor
        </Button>
      </Box>

      {/* SEARCH */}
      <TextField
        placeholder="Search vendors..."
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
              <TableCell>Vendor</TableCell>
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
            {vendors?.map((vendor) => (
              <TableRow key={vendor.id} hover>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar>
                      {vendor.vendor_name.charAt(0)}
                    </Avatar>
                    {vendor.vendor_name}
                  </Box>
                </TableCell>

                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.phone_number}</TableCell>
                <TableCell>{vendor.city}</TableCell>

                <TableCell>
                  <Chip
                    label={vendor.status}
                    color={vendor.status === "Active" ? "success" : "default"}
                    size="small"
                  />
                </TableCell>

                 <TableCell>{vendor.address}</TableCell>
                 <TableCell>
                  <span onClick={() => router.push(`/dashboard/vendors/edit?id=${vendor.id}`)}
                    style={{ cursor: "pointer", color: "blue" }}>
                   <RemoveRedEyeIcon/>
                </span>
              </TableCell>

              <TableCell>
                  <span onClick={() => onDelete(vendor.id)} style={{ cursor: "pointer", color:"red" }}> {deleteLoading ? <CircularProgress /> : <DeleteIcon/>}</span>
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