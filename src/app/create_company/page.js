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
        background: "linear-gradient(135deg,#0f172a,#1e293b)",
        py: 6
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "20px",
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff"
          }}
        >

            {success && <Alert severity="success">{success}</Alert>}
          
               {error && <Alert severity="error">{error}</Alert>}
          
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Company Setup
          </Typography>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>

            {/* ---------- Basic Info ---------- */}
            <Typography variant="h6" sx={{ mt: 2, color: "#cbd5f5" }}>
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
  defaultValue="India" // <-- Set default value here
  render={({ field }) => (
    <TextField
      {...field}
      label="Country"
      fullWidth
      margin="normal"
      sx={inputStyle}
      InputProps={{
        readOnly: true, // field is read-only
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
            <Typography variant="h6" sx={{ mt: 4, color: "#cbd5f5" }}>
              Company Details
            </Typography>

            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{
                mt: 2,
                borderColor: "#475569",
                color: "#cbd5f5",
                "&:hover": { borderColor: "#6366f1" }
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
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: "12px",
                fontWeight: "bold",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)"
              }}
            >
              Save & Continue
            </Button>

          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

const inputStyle = {
  "& .MuiInputBase-input": { color: "#fff" },
  "& .MuiSelect-select": { color: "#fff" },
  "& .MuiInputLabel-root": { color: "#94a3b8" },
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#475569" },
    "&:hover fieldset": { borderColor: "#6366f1" },
    "&.Mui-focused fieldset": { borderColor: "#8b5cf6" }
  },
  "& .MuiSvgIcon-root": { color: "#fff" }
};