// "use client";
// import React, { useState } from "react";
// import { TextField, Button, Typography } from "@mui/material";
// import { useForm, Controller } from "react-hook-form";
// import axios from "axios";
// import Alert from '@mui/material/Alert';

// import {useRouter} from 'next/navigation';

// const SignInForm = () => {

//   const router = useRouter();

//   const [loading, setLoading] = useState(false);
//    const [success, setSuccess]= useState("");
//   const [error, setError] = useState("");
     

//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });


//   const onSubmit = async (data)=>{

//     try{

//     setSuccess('');
//       setError('');

//     setLoading(true);

//     const res = await axios.post("/api/signin_api", data);

    

//     const gotToken = res.data.generatedToken;

//     console.log ("This is my token", gotToken);

//     localStorage.setItem("Token",gotToken);

//     if(res.status==200)
//   {
//   setSuccess("Signed up Successfully");

//      router.push('/dashboard');
//   }

 
    
//   }


//   catch(err){
//      if(err.status==401)
// {
//   setError("Invalid password");
// }
// else{
//       setError("Signin Failed");
// }
//   }

//   finally{
//     setLoading(false);
//   }
//   }
  
//   return (
// <>
    
  
//     <form
//       onSubmit={handleSubmit(onSubmit)}
//       style={{
//         maxWidth: "600px",
//         margin: "10rem auto",
//         padding: "2rem",
//         border: "1px solid #ccc",
//         borderRadius: "8px",
//       }}
//     >


//     {success && <Alert severity="success">{success}</Alert>}
    
//     {error && <Alert severity="error">{error}</Alert>}

//       <Typography variant="h5" gutterBottom>
//         Sign In
//       </Typography>

//       {/* Email */}
//       <Controller
//         name="email"
//         control={control}
//         rules={{
//           required: "Email is required",
//           pattern: {
//             value: /^\S+@\S+\.\S+$/,
//             message: "Invalid email format",
//           },
//         }}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label="Email Address"
//             fullWidth
//             margin="normal"
//             error={!!errors.email}
//             helperText={errors.email?.message}
//           />
//         )}
//       />

//       {/* Password */}
//       <Controller
//         name="password"
//         control={control}
//         rules={{
//           required: "Password is required",
//           minLength: {
//             value: 6,
//             message: "Password must be at least 6 characters",
//           },
//         }}
//         render={({ field }) => (
//           <TextField
//             {...field}
//             label="Password"
//             type="password"
//             fullWidth
//             margin="normal"
//             error={!!errors.password}
//             helperText={errors.password?.message}
//           />
//         )}
//       />

//       {/* Submit Button */}
//       <Button
//         type="submit"
//         variant="contained"
//         fullWidth
//         sx={{ mt: 2, backgroundColor: "#5d5877", color: "black" }}
//         disabled={loading}
//       >
//         {loading ? "Signing in..." : "SIGN IN"}
//       </Button>
//     </form>
//     </>
    
//   );
// };

// export default SignInForm;


"use client";
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Box
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setSuccess("");
      setError("");
      setLoading(true);

      const res = await axios.post("/api/signin_api", data);

      const gotToken = res.data.generatedToken;
      localStorage.setItem("Token", gotToken);

      if (res.status == 200) {
        setSuccess("Signed up Successfully");
        router.push("/dashboard");
      }
    } catch (err) {
      if (err.status == 401) {
        setError("Invalid password");
      } else {
        setError("Signin Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fff1f2, #f4f4f5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "500px",
          p: 4,
          borderRadius: "16px",
          background: "#fafafa",
          border: "1px solid #e4e4e7",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
        }}
      >
        {success && <Alert severity="success">{success}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <Typography variant="h5" fontWeight="600" mb={2} color="#18181b">
          Sign In
        </Typography>

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
              sx={{ background: "#ffffff", borderRadius: "8px" }}
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
              sx={{ background: "#ffffff", borderRadius: "8px" }}
            />
          )}
        />

        {/* Button */}
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: "10px",
            fontWeight: "600",
            textTransform: "none",
            background: "#fb7185",
            color: "#fff",
            boxShadow: "0 6px 18px rgba(251,113,133,0.25)",
            "&:hover": {
              background: "#f43f5e",
            },
          }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "SIGN IN"}
        </Button>
      </Paper>
    </Box>
  );
};

export default SignInForm;