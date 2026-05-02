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
  CircularProgress
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation"; // ✅ FIX

export default function ItemForm() {

  const router = useRouter(); // ✅ FIX

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      p_id: "",
      item_name: "",
      item_unit: "",
      item_sku: "",
      userId:"",
    
    },
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recUserId, setRecUserId] = useState("");


    useEffect(() => {
    const testToken = async () => {
      try {
        const resToken = localStorage.getItem("Token");

        if (!resToken) {
          router.push("/signin");
        }

        const res = await axios.post("/api/jwt_verify", { resToken });

        console.log("This is my responce",res);

        console.log("This is your responce with id", res.data.received_id);

        setRecUserId(res.data.received_id);

        if (!res.data.valid) {
           console.log("Valid Token",res.data.valid);
          router.push("/signin");
         
        }
        
      } catch (err) {
        console.log("error", err);
      }
    };

    testToken();
  }, []);


  const onSubmit = async (data) => {
  if (!recUserId) {
    setError("User not authenticated properly");
    return;}

      const payload = {
        ...data,
          userId:recUserId,
      };
    try {
      setLoading(true);
      setSuccess("");
      setError("");



      await axios.post("/api/items_api", {payload}); 

      setSuccess("Item added successfully");
      reset();

    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "600px", margin: "3rem auto" }}
      >
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            Add Item
          </Typography>

          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <Controller
            name="item_name"
            control={control}
            rules={{ required: "Item Name is required" }}
            render={({ field }) => (
              <TextField {...field} label="Item Name" fullWidth margin="normal"
                error={!!errors.item_name}
                helperText={errors.item_name?.message}
                disabled={loading}
              />
            )}
          />

          <Controller
            name="item_sku"
            control={control}
            rules={{ required: "Item SKU is required" }}
            render={({ field }) => (
              <TextField {...field} label="Item SKU" fullWidth margin="normal"
                error={!!errors.item_sku}
                helperText={errors.item_sku?.message}
                disabled={loading}
              />
            )}
          />

          <Controller
            name="p_id"
            control={control}
            rules={{ required: "Product ID is required" }}
            render={({ field }) => (
              <TextField {...field} label="P ID" fullWidth margin="normal"
                error={!!errors.p_id}
                helperText={errors.p_id?.message}
                disabled={loading}
              />
            )}
          />

          <Controller
            name="item_unit"
            control={control}
            rules={{ required: "Unit is required" }}
            render={({ field }) => (
              <TextField {...field} select label="Unit of Measure" fullWidth margin="normal"
                error={!!errors.item_unit}
                helperText={errors.item_unit?.message}
                disabled={loading}
              >
                <MenuItem value="pcs">Pieces (PCS)</MenuItem>
                <MenuItem value="kgs">Kilograms (KGS)</MenuItem>
                <MenuItem value="gms">Grams (GMS)</MenuItem>
              </TextField>
            )}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add Item"}
          </Button>

        </Paper>
      </form>
    </Box>
  );
}