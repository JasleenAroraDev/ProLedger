"use client";

import React, { Suspense, useEffect, useState } from "react";
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
  Stack,
  Chip,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import InventoryIcon from "@mui/icons-material/Inventory";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { keyframes } from "@mui/system";

const brand = {
  navy: "#0f172a",
  primary: "#2563eb",
  primaryDark: "#1d4ed8",
  cyan: "#0891b2",
  cyanDark: "#0e7490",
  amber: "#d97706",
  blueLight: "#dbeafe",
  amberLight: "#fef3c7",
  text: "#334155",
  muted: "#64748b",
  border: "#dbe5f0",
};

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(26px); }
  to { opacity: 1; transform: translateY(0); }
`;

const floatSoft = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
`;

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    color: brand.navy,
    fontWeight: 600,
    transition: "0.28s ease",
    "& fieldset": { borderColor: brand.border },
    "&:hover": { transform: "translateY(-2px)" },
    "&:hover fieldset": { borderColor: brand.primary },
    "&.Mui-focused": { transform: "scale(1.01)" },
    "&.Mui-focused fieldset": { borderColor: brand.primary, borderWidth: "2px" },
  },
  "& .MuiInputLabel-root": { color: brand.muted, fontWeight: 600 },
  "& .MuiInputLabel-root.Mui-focused": { color: brand.primary },
};

// ─── Inner component: uses useSearchParams ────────────────────────────────────
function ItemsEditForm() {
  const searchParams = useSearchParams();
  const item_id = searchParams.get("id");

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

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!item_id) return;

    const viewEdit = async () => {
      try {
        setPageLoading(true);
        const res = await axios.post("/api/item_edit_api", { edit: item_id });
        const fetched_data = res?.data?.data;

        if (!fetched_data) {
          setError("No data found");
          return;
        }

        setValue("item_sku", fetched_data.item_sku || "");
        setValue("p_id", fetched_data.p_id || "");
        setValue("item_name", fetched_data.item_name || "");
        setValue("item_unit", fetched_data.item_unit || "");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch item data");
      } finally {
        setPageLoading(false);
      }
    };

    viewEdit();
  }, [item_id, setValue]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      data.id = parseInt(item_id);
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
    <>
      <Stack spacing={1} sx={{ mb: 2.5, textAlign: "center" }}>
        <Chip
          icon={<InventoryIcon />}
          label="Edit Item"
          sx={{
            mx: "auto",
            width: "fit-content",
            borderRadius: "8px",
            backgroundColor: brand.amberLight,
            color: brand.amber,
            fontWeight: 900,
            "& .MuiChip-icon": { color: brand.amber },
          }}
        />
        <Typography variant="h4" sx={{ fontWeight: 900, color: brand.navy }}>
          Edit Item
        </Typography>
        <Typography sx={{ color: brand.muted }}>
          Update item SKU, product ID, name, and unit.
        </Typography>
      </Stack>

      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {pageLoading ? (
        <Box sx={{ py: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress sx={{ color: brand.primary }} />
        </Box>
      ) : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
                sx={inputStyle}
              />
            )}
          />

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
                sx={inputStyle}
              />
            )}
          />

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
                sx={inputStyle}
              />
            )}
          />

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
                sx={inputStyle}
              >
                <MenuItem value="pcs">Pieces</MenuItem>
                <MenuItem value="kg">Kilogram</MenuItem>
                <MenuItem value="ltr">Liter</MenuItem>
              </TextField>
            )}
          />

          <Button
            type="submit"
            fullWidth
            disabled={loading}
            endIcon={!loading && <ArrowForwardIcon />}
            sx={{
              mt: 3,
              py: 1.55,
              borderRadius: "8px",
              fontWeight: 900,
              textTransform: "none",
              color: "#ffffff",
              background: "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",
              boxShadow: "0 18px 38px rgba(37, 99, 235, 0.28)",
              transition: "all 0.28s ease",
              "&:hover": {
                transform: "translateY(-3px)",
                boxShadow: "0 24px 48px rgba(37, 99, 235, 0.36)",
                background: "linear-gradient(135deg, #1d4ed8 0%, #0e7490 100%)",
              },
              "&.Mui-disabled": { color: "#ffffff", background: "#94a3b8" },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              "Update Item"
            )}
          </Button>
        </Box>
      )}
    </>
  );
}

// ─── Outer component: wraps the form in Suspense ──────────────────────────────
export default function ItemsEdit() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: 2,
        py: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #eef6ff 48%, #ecfeff 100%)",
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
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: 620,
          p: { xs: 2.5, sm: 4 },
          borderRadius: "8px",
          background: "rgba(255,255,255,0.95)",
          border: `1px solid ${brand.blueLight}`,
          boxShadow: "0 34px 90px rgba(15, 23, 42, 0.14)",
          backdropFilter: "blur(18px)",
          position: "relative",
          zIndex: 1,
          animation: `${fadeUp} 0.7s ease both, ${floatSoft} 5s ease-in-out 0.8s infinite`,
        }}
      >
        {/* Suspense boundary required for useSearchParams during static build */}
        <Suspense
          fallback={
            <Box sx={{ py: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress sx={{ color: brand.primary }} />
            </Box>
          }
        >
          <ItemsEditForm />
        </Suspense>
      </Paper>
    </Box>
  );
}