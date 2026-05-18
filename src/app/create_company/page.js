
"use client";
import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import Alert from '@mui/material/Alert';

export default function CompanyForm() {

  const[recUserId, setRecUserId]= useState(""); 

  const router = useRouter();

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      companyName: "",
      businessType: "",
      industry: "",
      country: "India",
      state: "",
      city: "",
      logo: null,
      gstNumber: "",
      panNumber: "",
      email: "",
      address: "",
      phone: "",
      website: "",
    }
  });

  useEffect(() => {
    const testToken = async () => {
      try {
        const resToken = localStorage.getItem("Token");

        if (!resToken) {
          router.push("/signin");
        }

        const res = await axios.post("/api/jwt_verify", { resToken });

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

   const [loading, setLoading] = useState(false);
  
    const [success, setSuccess]= useState("");
  
    const [error, setError] = useState("");
  
    

  const onSubmit = async (data) => {

    setLoading(true);

     try{
      setSuccess('');
      setError('');

      data.userId=recUserId;

      console.log("payload is ", data);
    
    const rest = await axios.post("/api/create_company_api", data);
    console.log("This is my responce",rest);

      if(rest.status==200)
  {
  setSuccess("company created Successfully");
    const companyId = rest.data.companyId;

  console.log("Created Company ID:", companyId);

  
   reset();
        router.push(`/dashboard?companyId=${companyId}`);
  }

    }
    catch(err){

        console.log("This is your error ",err.response);


      if(err.status==409){
       setError(err.response.data.message);

       if(err.response.data.message=="Company already exists for this user")
       {
        router.push(`/dashboard?companyId=${companyId}`);
       }
      }
   
    }
    finally{
      setLoading(false);
    }
  }
  

  const businessTypes = [
    "Manufacturer",
    "Trading Company",
    "Service Provider",
    "Retail",
    "Distributor",
    "Other"
  ];

  const industries = [
    "Textile",
    "Food",
    "Automobile",
    "Electronics",
    "Construction",
    "IT Services",
    "Healthcare",
    "Education",
    "Other"
  ];

  const statesOfIndia = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
    "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
    "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
    "Meghalaya","Mizoram","Nagaland","Odisha","Punjab",
    "Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands",
    "Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi",
    "Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",

        background:
          "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 45%, #bae6fd 100%)",

        py: 6,

        position: "relative",

        overflow: "hidden",

        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,

          backgroundImage:
            "linear-gradient(rgba(37,99,235,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.05) 1px, transparent 1px)",

          backgroundSize: "42px 42px",
        },
      }}
    >

      {/* FLOATING CIRCLES */}

      <Box
        sx={{
          position: "absolute",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(37,99,235,0.10)",
          top: -70,
          left: -70,
          filter: "blur(30px)",
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "rgba(8,145,178,0.10)",
          bottom: -90,
          right: -90,
          filter: "blur(35px)",
        }}
      />

      <Container maxWidth="md">

        <Paper
          elevation={0}
          sx={{
            p: 4,

            borderRadius: "24px",

            background: "rgba(255,255,255,0.40)",

            backdropFilter: "blur(18px)",

            border: "1px solid rgba(255,255,255,0.55)",

            boxShadow: "0 20px 60px rgba(37,99,235,0.12)",

            color: "#0f172a",

            position: "relative",

            zIndex: 2,
          }}
        >

            {success && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {success}
              </Alert>
            )}
          
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

          <Typography
            variant="h4"
            gutterBottom
            fontWeight="900"
            sx={{
              color: "#0f172a",
              mb: 3,
            }}
          >
            Company Setup
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>

            {/* ---------- Basic Info ---------- */}

            <Typography
              variant="h6"
              sx={{
                mt: 2,
                color: "#1e3a8a",
                fontWeight: 700,
              }}
            >
              Basic Company Info
            </Typography>

            <Controller
              name="companyName"
              control={control}
              rules={{ required: "Company Name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Name"
                  fullWidth
                  margin="normal"
                  sx={inputStyle}
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                />
              )}
            />

            <Controller
              name="businessType"
              control={control}
              rules={{ required: "Business Type is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Business Type"
                  fullWidth
                  margin="normal"
                  sx={inputStyle}
                  error={!!errors.businessType}
                  helperText={errors.businessType?.message}
                >
                  {businessTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="industry"
              control={control}
              rules={{ required: "Industry is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Industry"
                  fullWidth
                  margin="normal"
                  sx={inputStyle}
                  error={!!errors.industry}
                  helperText={errors.industry?.message}
                >
                  {industries.map((ind) => (
                    <MenuItem key={ind} value={ind}>
                      {ind}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="country"
              control={control}
              defaultValue="India"
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Country"
                  fullWidth
                  margin="normal"
                  sx={inputStyle}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              )}
            />

            <Controller
              name="state"
              control={control}
              rules={{ required: "State is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="State"
                  fullWidth
                  margin="normal"
                  sx={inputStyle}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                >
                  {statesOfIndia.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

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
                  sx={inputStyle}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />

            {/* ---------- Company Details ---------- */}

            <Typography
              variant="h6"
              sx={{
                mt: 4,
                color: "#1e3a8a",
                fontWeight: 700,
              }}
            >
              Company Details
            </Typography>

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                mt: 2,
                py: 1.5,

                borderRadius: "14px",

                borderColor: "#60a5fa",

                color: "#1e3a8a",

                background: "rgba(255,255,255,0.35)",

                fontWeight: 700,

                textTransform: "none",

                transition: "0.3s ease",

                "&:hover": {
                  borderColor: "#2563eb",
                  background: "rgba(255,255,255,0.45)",
                  transform: "translateY(-2px)",
                }
              }}
            >
              Upload Company Logo

              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setValue("logo", e.target.files[0])}
              />
            </Button>

            <Controller
              name="gstNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company GST Number"
                  fullWidth
                  margin="normal"
                  sx={inputStyle}
                />
              )}
            />

            <Controller
              name="panNumber"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company PAN Number"
                  fullWidth
                  margin="normal"
                  sx={inputStyle}
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Address"
                  fullWidth
                  multiline
                  rows={3}
                  margin="normal"
                  sx={inputStyle}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Email"
                  fullWidth
                  margin="normal"
                  sx={inputStyle}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Phone"
                  fullWidth
                  margin="normal"
                  sx={inputStyle}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
              )}
            />

            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Website"
                  fullWidth
                  margin="normal"
                  sx={inputStyle}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.6,

                borderRadius: "14px",

                fontWeight: 900,

                textTransform: "none",

                color: "#ffffff",

                background:
                  "linear-gradient(135deg, #2563eb 0%, #0891b2 100%)",

                boxShadow:
                  "0 14px 30px rgba(37, 99, 235, 0.20)",

                transition: "0.35s ease",

                "&:hover": {
                  transform: "translateY(-4px)",

                  background:
                    "linear-gradient(135deg, #1d4ed8 0%, #0e7490 100%)",

                  boxShadow:
                    "0 22px 45px rgba(37,99,235,0.28)",
                },
              }}
            >
              {loading ? "Saving..." : "Save & Continue"}
            </Button>

          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

const inputStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "14px",

    backgroundColor: "rgba(255,255,255,0.55)",

    color: "#0f172a",

    fontWeight: 600,

    transition: "0.3s ease",

    "& fieldset": {
      borderColor: "rgba(255,255,255,0.55)",
    },

    "&:hover": {
      transform: "translateY(-2px)",
    },

    "&:hover fieldset": {
      borderColor: "#60a5fa",
    },

    "&.Mui-focused": {
      transform: "scale(1.01)",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#2563eb",
      borderWidth: "2px",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#1e3a8a",
    fontWeight: 700,
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#2563eb",
  },

  "& input": {
    color: "#0f172a",
  },

  "& textarea": {
    color: "#0f172a",
  },

  "& .MuiSvgIcon-root": {
    color: "#0f172a",
  },
};
