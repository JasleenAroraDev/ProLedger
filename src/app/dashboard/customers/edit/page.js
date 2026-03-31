"use client";
import React, { useEffect,useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from 'axios';
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

export default function CustomersEdit() {

     const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
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
    
    const searchParams = useSearchParams();
    const cust_id = searchParams.get("id");

    console.log("my recieved id is ",cust_id);

    const [edit, setEdit]=useState();
     const [success, setSuccess] = useState("");
      const [error, setError] = useState("");
       const [loading, setLoading] = useState(false);
       
const onSubmit = async (data) => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");

      data.id= parseInt(edit);
    

      console.log("DATA:", data);

      await axios.post("/api/customer_update_api", data);

      setSuccess("Customer added successfully ");

   

    } catch (err) {
      console.log(err);
      }

     finally {
      setLoading(false);
    }
}

    useEffect(() =>{

    setEdit(cust_id);
    
        const viewEdit = async ()=>{

            console.log("im under call");
            const res= await axios.post("/api/customer_edit_api", {edit});

             console.log("Customer data:", res.data.data); 
             const fetched_data = res.data.data;

setValue('customerName',fetched_data.customer_name);
setValue('email',fetched_data.email);
setValue('phone', fetched_data.phone_number);
setValue('gstNumber',fetched_data.gst_number);
setValue('city',fetched_data.city);
setValue('status', fetched_data.status);
setValue('address',fetched_data.address);
}

    viewEdit();

  }, [edit]);

return(
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
             Edit  Customer
              </Typography>
    
              {success && <Alert severity="success">{success}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}
    
              {/* Customer Name */}
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
    
                
                {loading ? <CircularProgress size={24} /> : "Edit Customer"}
              </Button>
            </Paper>
          </form>
        </Box>
      );
    }

