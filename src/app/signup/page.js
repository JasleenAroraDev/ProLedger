"use client";
import React, { useState } from "react";
import Alert from '@mui/material/Alert';

import {
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import axios from "axios";
import {useRouter} from 'next/navigation';

export default function SignUpForm() {

    const router = useRouter();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const [loading, setLoading] = useState(false);

  const [success, setSuccess]= useState("");

  const [error, setError] = useState("");

  

  const passwordValue = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);

     try{
      setSuccess('');
      setError('');

    setLoading(true);

    const res = await axios.post("/api/signup_api",data);

    console.log("This is my response ",res);

  if(res.status==200)
  {
  setSuccess("Signed up Successfully");
    reset();
     router.push('/signin');
  }

    }
    catch(err){
     console.log("This is your error ",err);
     
if(err.status==409)
{
  setError("This email is already Exists!!");
}
else{
      setError("Signup FAiled");
}
    }
    finally{
      setLoading(false);
    }
  };
  
  
  return (
    <>

    


    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: "600px",
        margin: "8rem auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >

      {success && <Alert severity="success">{success}</Alert>}

     {error && <Alert severity="error">{error}</Alert>}

      <Typography variant="h5" gutterBottom>
        Sign Up
      </Typography>

      {/* Full Name */}
      <Controller
        name="fullName"
        control={control}
        rules={{ required: "Full Name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Full Name"
            fullWidth
            margin="normal"
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
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
            message: "Invalid email format",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email Address"
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

       <Controller
        name="phoneNumber"
        control={control}
        rules={{
          required: "Phone Number is required",
        
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Phone Number"
            fullWidth
            margin="normal"
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />
        )}
      />

      {/* Password */}
      <Controller
        name="password"
        control={control}
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        )}
      />

      {/* Confirm Password */}
      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: "Confirm your password",
          validate: (value) =>
            value === passwordValue || "Passwords do not match",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />
        )}
      />

      {/* Terms & Conditions */}
      <FormGroup>
        <FormControlLabel
          control={
            <Controller
              name="terms"
              control={control}
              rules={{ required: "You must accept the terms" }}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  checked={field.value}
                />
              )}
            />
          }
          label="I agree to the Terms & Conditions"
        />
        {errors.terms && (
          <Typography color="error">
            {errors.terms.message}
          </Typography>
        )}
      </FormGroup>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2, backgroundColor: "#5d5877", color: "black" }}
        disabled={loading}
      >
        {loading ? "Creating account..." : "CREATE ACCOUNT"}
      </Button>
    </form>
    </>
  );
}