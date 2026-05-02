"use client";

import React, { useEffect,useState } from "react";
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


export default function CustomerForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      customerName: "",
      email: "",
      phone: "",
      gstNumber: "",
      city: "",
      status: "Active",
      address: "",
      
      
    },
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 const[recUserId, setRecUserId]= useState(null); 


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

    
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      console.log("DATA:", data);
      


await axios.post("/api/customers_api", {
  ...data,
  userId: recUserId
});

      setSuccess("Customer added successfully ");

      reset();

    } catch (err) {
      console.log(err);

      if (err.response?.status === 409) {
        setError(err.response.data.message);
      }

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
            Add Customer
          </Typography>

          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          {/* Vendor Name */}
          <Controller
            name="customerName"
            control={control}
            rules={{ required: "Customer Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Customer Name"
                fullWidth
                margin="normal"
                error={!!errors.customerName}
                helperText={errors.customerName?.message}
                disabled={loading}
              />
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={loading}
              />
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Phone is required",
              minLength: {
                value: 10,
                message: "Enter valid 10 digit number",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                fullWidth
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                disabled={loading}
              />
            )}
          />

          {/* GST Number */}
          <Controller
            name="gstNumber"
            control={control}
            rules={{
              required: "GST Number is required",
              minLength: {
                value: 15,
                message: "GST must be 15 characters",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="GST Number"
                fullWidth
                margin="normal"
                error={!!errors.gstNumber}
                helperText={errors.gstNumber?.message}
                disabled={loading}
              />
            )}
          />

          {/* City */}
          <Controller
            name="city"
            control={control}
            rules={{ required: "City is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                margin="normal"
                error={!!errors.city}
                helperText={errors.city?.message}
                disabled={loading}
              />
            )}
          />

          {/* Status */}
          <Controller
            name="status"
            control={control}
            rules={{ required: "Status is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Status"
                fullWidth
                margin="normal"
                error={!!errors.status}
                helperText={errors.status?.message}
                disabled={loading}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
              </TextField>
            )}
          />

          {/* Address */}
          <Controller
            name="address"
            control={control}
            rules={{ required: "Address is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                multiline
                rows={3}
                fullWidth
                margin="normal"
                error={!!errors.address}
                helperText={errors.address?.message}
                disabled={loading}
              />
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

            
            {loading ? <CircularProgress size={24} /> : "Add Customer"}
          </Button>
        </Paper>
      </form>
    </Box>
  );
}