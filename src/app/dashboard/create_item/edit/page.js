"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Alert from "@mui/material/Alert";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function ItemsEdit() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      item_sku: "",
      p_id: "",
      item_name: "",
      item_unit: "",
    },
  });

  const searchParams = useSearchParams();
  const item_id = searchParams.get("id");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch item data
  useEffect(() => {
    if (!item_id) return;

    const viewEdit = async () => {
      try {
        console.log("Calling API with id:", item_id);

        const res = await axios.post("/api/item_edit_api", {
          edit: item_id,
        });

        const fetched_data = res?.data?.data;

        console.log("Fetched_data:", fetched_data);

        // ✅ Safety check
        if (!fetched_data) {
          setError("No data found");
          return;
        }

        // ✅ Set form values safely
        setValue("item_sku", fetched_data.item_sku || "");
        setValue("p_id", fetched_data.p_id || "");
        setValue("item_name", fetched_data.item_name || "");
        setValue("item_unit", fetched_data.item_unit || "");

      } catch (err) {
        console.error(err);
        setError("Failed to fetch item data");
      }
    };

    viewEdit();
  }, [item_id, setValue]);

  // ✅ Submit update
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      data.id = parseInt(item_id); // ✅ correct id

      console.log("DATA:", data);

      await axios.post("/api/item_update_api", data);

      setSuccess("Item updated successfully");

    } catch (err) {
      console.log(err);
      setError("Update failed");
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
            Edit Item
          </Typography>

          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

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

          {/* Product ID */}
          <Controller
            name="p_id"
            control={control}
            rules={{ required: "Product ID is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="P ID"
                fullWidth
                margin="normal"
                error={!!errors.p_id}
                helperText={errors.p_id?.message}
                disabled={loading}
              />
            )}
          />

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

          {/* Item Unit */}
          <Controller
            name="item_unit"
            control={control}
            rules={{ required: "Item Unit is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Item Unit"
                fullWidth
                margin="normal"
                error={!!errors.item_unit}
                helperText={errors.item_unit?.message}
                disabled={loading}
              >
                <MenuItem value="pcs">Pieces</MenuItem>
                <MenuItem value="kg">Kilogram</MenuItem>
                <MenuItem value="ltr">Liter</MenuItem>
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
            {loading ? <CircularProgress size={24} /> : "Update Item"}
          </Button>
        </Paper>
      </form>
    </Box>
  );
}