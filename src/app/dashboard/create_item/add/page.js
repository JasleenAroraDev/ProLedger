"use client";
import React, { useState } from "react";
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

export default function ItemForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {

      item_name: "",
      item_unit: "",
      item_sku: "",
      
    },
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      console.log("DATA:", data);

      await axios.post("/api/items_api", data);
    
      setSuccess("Item added successfully ");
      

      reset();

    } catch (err) {
      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          maxWidth: "600px",
          margin: "3rem auto",
        }}
      >
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            Add Item
          </Typography>

          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

         

          {/* Item Name */}
          <Controller
            name="item_name"
            control={control}
            rules={{ required: "Item Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Item Name"
                fullWidth
                margin="normal"
                error={!!errors.item_name}
                helperText={errors.item_name?.message}
                disabled={loading}
              />
            )}
          />

           {/* Item SKU */}
          <Controller
            name="item_sku"
            control={control}
            rules={{ required: "Item SKU is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Item SKU"
                fullWidth
                margin="normal"
                error={!!errors.item_sku}
                helperText={errors.item_sku?.message}
                disabled={loading}
              />
            )}
          />

          {/* Unit of Measure */}
          <Controller
            name="item_unit"
            control={control}
            rules={{ required: "Unit is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Unit of Measure"
                fullWidth
                margin="normal"
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

          {/* Submit */}
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