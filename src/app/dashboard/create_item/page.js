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

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

import { useRouter } from "next/navigation";
import axios from "axios";
import Alert from "@mui/material/Alert";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
    const fetchItems = async () => {

    try{
       setLoading(true);


      console.log("value of search ",search);

      const res = await axios.post("/api/view_item_api",{search});

     console.log("This is your data", res.data.data);

     setItems(res.data.data);
  
  }
  catch(err){
    console.log("Error fetching vendor:", err);
  }
  finally{
    setLoading(false);
  }
}


  useEffect(() => {

  fetchItems();


}, [search]);

const onDelete = async(id)=>{

  try{
    setDeleteLoading(true);
      setSuccess("");
      setError("");

  console.log("This is id",id);
  

  const res= await axios.post("/api/item_delete_api",{id});

  console.log("This is my result",res);

  if(res){
      setSuccess("Item Deleted Successfully ");

  }
  
  fetchItems();
} catch(err){
  setError("Something Went wrong");

}
finally{
  setDeleteLoading(false);
}

   {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

}

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Items</Typography>

        <Button
          variant="contained"
          onClick={() => router.push("/dashboard/create_item/add")}
        >
          + Add Item
        </Button>
      </Box>

     

      {/* SEARCH */}
      <TextField
        placeholder="Search items..."
        fullWidth
        sx={{ mb: 3 }}
        value={search} // ✅ controlled input FIX
        
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
          <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead sx={{ bgcolor: "#f1f5f9" }}>
              <TableRow>
                <TableCell>Item SKU</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Item Unit</TableCell>
                <TableCell>Item Qty</TableCell>
                <TableCell>Sold Qty</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {items.length > 0 ? (
                items.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>{item.item_sku}</TableCell>
                    <TableCell>{item.item_name}</TableCell>
                    <TableCell>{item.item_unit}</TableCell>
                    <TableCell>{item.item_qty}</TableCell>
                    <TableCell>{item.sold_qty}</TableCell>

                    {/* VIEW */}
                    <TableCell>
                      <RemoveRedEyeIcon
                        onClick={() =>
                          router.push(`/dashboard/create_item/edit?id=${item.id}`)
                        }
                        sx={{ cursor: "pointer", color: "blue" }}
                      />
                    </TableCell>

                    {/* DELETE */}
                    <TableCell>
                  <span onClick={() => onDelete(item.id)} style={{ cursor: "pointer", color:"red" }}> {deleteLoading ? <CircularProgress /> : <DeleteIcon/>}</span>
                 </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No Items Found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
}