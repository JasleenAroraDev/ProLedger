// "use client";
// import React, { useEffect, useMemo,useState } from "react";
// import Alert from '@mui/material/Alert';
// import {
//   Box,
//   Typography,
//   Paper,
//   Grid,
//   TextField,
//   Button,
//   MenuItem,
//   IconButton,
//   Divider,
//   CircularProgress,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import AddIcon from "@mui/icons-material/Add";
// import Autocomplete from "@mui/material/Autocomplete";
// import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// // const productOptions = [
// //   { label: "Product A" },
// //   { label: "Product B" },
// //   { label: "Product C" },
// // ];

// // const partyOptions = [
// //   { label: "ABC Traders" },
// //   { label: "XYZ Pvt Ltd" },
// //   { label: "Guru Nanak Store" },
// // ];

// export default function InvoicePage() {

// const [partyOptions, setPartyOptions]=useState([]);
// const [productOptions, setProductOptions]= useState([]);

// const [grossTotalAmt, setGrossTotalAmt]=useState(0);

//   const [success, setSuccess]= useState("");

//   const [error, setError] = useState("");
//  const[recUserId, setRecUserId]= useState(null); 


// const [loading, setLoading]=useState(false);
// const router = useRouter();

//   const {
//     control,
//     handleSubmit,
//     setValue,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       invoiceNumber: "",
//       date: "",
//       invoiceType: "",
//     partyId: "",
// partyName: "",
// gstNumber:"",
// panNumber:"",
// grossTotal:0,
//       discount: 0,
//       gstType: "none",
//       cgst: 0,
//       sgst: 0,
//       igst: 0,
//         cgstAmount: 0,
//   sgstAmount: 0,
//   igstAmount: 0,
//      products: [{ productId: "", name: "", qty: "", price: "", amount: 0 }]
     
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "products",
//   });

//   const products = useWatch({ control, name: "products" });
//   const discount = watch("discount");
//   const gstType = watch("gstType");
//   const cgst = watch("cgst");
//   const sgst = watch("sgst");
//   const igst = watch("igst");

//   // Calculate Amount per row

//   // Gross Total
//   const grossTotal = useMemo(() => {


//     const gotValue= products.reduce((sum, item) => sum + (item.amount || 0), 0);
//   setGrossTotalAmt(gotValue);
//   return gotValue;

//   }, [products]);


// const { netTotal, cgstAmount, sgstAmount, igstAmount } = useMemo(() => {
//   let total = grossTotal - (parseFloat(discount) || 0);

//   let cgstAmt = 0;
//   let sgstAmt = 0;
//   let igstAmt = 0;

//   if (gstType === "cgst_sgst") {
//     cgstAmt = total * ((parseFloat(cgst) || 0) / 100);
//     sgstAmt = total * ((parseFloat(sgst) || 0) / 100);
//     total += cgstAmt + sgstAmt;
//   } 
//   else if (gstType === "igst") {
//     igstAmt = total * ((parseFloat(igst) || 0) / 100);
//     total += igstAmt;
//   }

//   return {
//     netTotal: total,
//     cgstAmount: cgstAmt,
//     sgstAmount: sgstAmt,
//     igstAmount: igstAmt,
//   };
// }, [grossTotal, discount, gstType, cgst, sgst, igst]);


//   useEffect(() => {
//     const testToken = async () => {
//       try {
//         const resToken = localStorage.getItem("Token");

//         if (!resToken) {
//           router.push("/signin");
//         }

//         const res = await axios.post("/api/jwt_verify", { resToken });

//         console.log("This is my responce",res);

//         console.log("This is your responce with id", res.data.received_id);

//         setRecUserId(res.data.received_id);

//         if (!res.data.valid) {
//            console.log("Valid Token",res.data.valid);
//           router.push("/signin");
         
//         }
        
//       } catch (err) {
//         console.log("error", err);
//       }
//     };

//     testToken();
//   }, []);




//   const onSubmit = async (data) => {
//       if (!recUserId) {
//     setError("User not authenticated properly");
//     return;
//   }
//     const finalData = {
//     ...data,
//     cgstAmount,
//     sgstAmount,
//     igstAmount,
//     netTotal,
//     grossTotal : grossTotalAmt,
//      userId:recUserId,
//   };


//     console.log("Final Invoice:", finalData);

// try{
//    setSuccess('');
//    setError('');

    

//     const res= await axios.post("/api/invoice_api",{finalData});
//     console.log("This is my res",res);

//     if(res.data.status==200){
//       setSuccess("Invoice Data Saved Successfully");
//       reset();
//     }else{
//       setError("The Invoice Number is already exist");
//     }

   
// }

// catch(err){
//   setError("Something Went Wrong");

// }
    
//   };

//   const target= async (abc) =>{

//     try{
//      setLoading(true);
//     console.log("This is my target", abc);

//     const res= await axios.post("/api/fetch_party_api", {abc});

//     console.log("This is my result",res.data);
//     setPartyOptions(res.data.data);

  
//   }
//   catch(err){
//     console.log("This is Frontend error",err);
//   }

//   finally{
//    setLoading(false);
//   }


//   }

//   useEffect(()=>{
//     const fetchItems= async ()=>{

//       try{
//        const res =await axios.post("/api/fetch_item_api");
//         console.log("This is my res",res.data);
//         setProductOptions(res.data.data);
//       }
//       catch(err){
//         console.log("this is my error ",err);

//       }

//     }
//     fetchItems();
//   }, []);

//   return (
    
    
//     <Box p={3}>
//       <Paper sx={{ p: 4, borderRadius: 3 }}>
//         <Typography variant="h5" fontWeight="bold" mb={3}>
//           Invoice
//         </Typography>

//            {success && <Alert severity="success">{success}</Alert>}
        
//              {error && <Alert severity="error">{error}</Alert>}
        

//         {/* Header Section */}
//         <Grid container spacing={2}>
//         <Grid size={4}>
//             <Controller
//               name="invoiceNumber"
//               control={control}
//               rules={{ required: "Required" }}
//               render={({ field }) => (
//                 <TextField {...field} label="Invoice Number" fullWidth error={!!errors.invoiceNumber} />
//               )}
//             />
//  </Grid>
//   <Grid size={4}>
//             <Controller
//               name="date"
//               control={control}
//               rules={{ required: "Required" }}
//               render={({ field }) => (
//                 <TextField {...field} type="date" fullWidth InputLabelProps={{ shrink: true }} />
//               )}
//             />
//  </Grid>
//     <Grid size={4}>
//             <Controller
//               name="invoiceType"
//               control={control}
//               rules={{ required: "Required" }}
//               render={({ field }) => (
//                 <TextField {...field} select label="Invoice Type" fullWidth onChange={(e) => {
//                   field.onChange(e.target.value)
//                     target(e.target.value) }
//                 }
//                 >
//                   <MenuItem value="purchase">Puchase
//                   </MenuItem>
//                   <MenuItem value="sale">Sale</MenuItem>
//                 </TextField>
//               )}
        
//             />
//  </Grid>


// {loading? <CircularProgress/> :
 

//      <Grid size={8}>
// <Controller
//   name="partyId"
//   control={control}
//   rules={{ required: "Required" }}
//   render={({ field }) => (
//     <Autocomplete
//       options={partyOptions}
//       getOptionLabel={(option) => option.label || ""}
//       value={
//         partyOptions.find((opt) => opt.id === field.value) || null
//       }
//       onChange={(_, data) => {
//         field.onChange(data ? data.id : "");
//         setValue("partyName", data ? data.label : "");
//       }}
//       renderInput={(params) => (
//         <TextField
//           {...params}
//           label="Party Name"
//           error={!!errors.partyId}
//         />
//       )}
//     />
//   )}
// />

// </Grid>


// }


//       <Grid size={5}>
//             <Controller
//               name="gstNumber"
//               control={control}
//               rules={{ required: "Required" }}
//               render={({ field }) => (
//                 <TextField {...field} label="GST Number" fullWidth error={!!errors.gstNumber} />
//               )}
//             />
//  </Grid>


//      <Grid size={5}>
//             <Controller
//               name="panNumber"
//               control={control}
//               rules={{ required: "Required" }}
//               render={({ field }) => (
//                 <TextField {...field} label="PAN Number" fullWidth error={!!errors.panNumber} />
//               )}
//             />
//  </Grid>

//   </Grid>
       


//         <Divider sx={{ my: 3 }} />

//         {/* Products Section */}
//         <Typography variant="h6" mb={2}>
//           Products
//         </Typography>

//         {fields.map((item, index) => (
//           <Grid container spacing={2} key={item.id} alignItems="center" mb={1}>
//            <Grid size={4}>
// <Controller
//   name={`products.${index}.productId`}
//   control={control}
//   rules={{ required: true }}
//   render={({ field }) => (
//     <Autocomplete
//       options={productOptions}
//       getOptionLabel={(opt) => opt.label || ""}
//       onChange={(_, data) => {
//         field.onChange(data ? data.id : "");
//         setValue(`products.${index}.name`, data ? data.label : "");
//       }}
//       renderInput={(params) => (
//         <TextField {...params} label="Product" />
//       )}
//     />
//   )}
// />
//             </Grid>

//         <Grid size={2}>
// <Controller
//   name={`products.${index}.qty`}
//   control={control}
//   rules={{ required: true }}
//   render={({ field }) => (
//     <TextField
//       {...field}
//       label="Qty"
//       type="number"
//       fullWidth
//       onChange={(e) => {
//         const value = e.target.value;
//         field.onChange(value);

//         const price = watch(`products.${index}.price`) || 0;
//         setValue(`products.${index}.amount`, value * price);
//       }}
//     />
//   )}
// />
//             </Grid>

      
//         <Grid size={2}>
// <Controller
//   name={`products.${index}.price`}
//   control={control}
//   rules={{ required: true }}
//   render={({ field }) => (
//     <TextField
//       {...field}
//       label="Price"
//       type="number"
//       fullWidth
//       onChange={(e) => {
//         const value = e.target.value;
//         field.onChange(value);

//         const qty = watch(`products.${index}.qty`) || 0;
//         setValue(`products.${index}.amount`, value * qty);
//       }}
//     />
//   )}
// />
//             </Grid>

           
//         <Grid size={2}>
//               <Controller
//                 name={`products.${index}.amount`}
//                 control={control}
//                 render={({ field }) => (
//                   <TextField {...field} label="Amount" fullWidth InputProps={{ readOnly: true }} />
//                 )}
//               />
//             </Grid>

       
//         <Grid size={1}>
//               <IconButton color="error" onClick={() => remove(index)}>
//                 <DeleteIcon />
//               </IconButton>
//             </Grid>
//           </Grid>
//         ))}

//         <Button
//           startIcon={<AddIcon />}
//           onClick={() => append({ name: null, qty: "", price: "", amount: 0 })}
//         >
//           Add Row
//         </Button>

//         <Divider sx={{ my: 3 }} />

//         {/* Totals Section */}
//         <Grid container spacing={2}>
       
     
//         <Grid size={4}>
//             <TextField label="Gross Total" name="grossTotal" value={grossTotal} fullWidth InputProps={{ readOnly: true }} />
//           </Grid>

        
     
//         <Grid size={4}>
//             <Controller
//               name="discount"
//               control={control}
//               render={({ field }) => (
//                 <TextField {...field} label="Discount" type="number" fullWidth />
//               )}
//             />
//           </Grid>


   
//         <Grid size={4}>
//             <Controller
//               name="gstType"
//               control={control}
//               render={({ field }) => (
//                 <TextField {...field} select label="GST Type" fullWidth>
//                   <MenuItem value="none">None</MenuItem>
//                   <MenuItem value="cgst_sgst">CGST & SGST</MenuItem>
//                   <MenuItem value="igst">IGST</MenuItem>
//                 </TextField>
//               )}
//             />
         
// </Grid>
//           {gstType === "cgst_sgst" && (
//             <>



//         <Grid size={4}>
//                 <Controller
//                   name="cgst"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField {...field} label="CGST %" type="number" fullWidth/>
//                   )}
//                 />
//               </Grid>
           

//     <Grid size={4}>
//       <TextField label="CGST Amount" value={cgstAmount} InputProps={{ readOnly: true }} fullWidth />
//     </Grid>




 
//         <Grid size={2}>
//                 <Controller
//                   name="sgst"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField {...field} label="SGST %" type="number" fullWidth />
//                   )}
//                 />
//               </Grid>

//                       <Grid size={2}>
//       <TextField label="SGST Amount" value={sgstAmount} fullWidth InputProps={{ readOnly: true }} />
//     </Grid>

  

//             </>
//           )}

//           {gstType === "igst" && (
           
//         <Grid size={2}>
//               <Controller
//                 name="igst"
//                 control={control}
//                 render={({ field }) => (
//                   <TextField {...field} label="IGST %" type="number" fullWidth />
//                 )}
//               />
//             </Grid>
//           )}


// {gstType === "igst" && (

//         <Grid size={2}>
//     <TextField label="IGST Amount" value={igstAmount} fullWidth InputProps={{ readOnly: true }} />
//   </Grid>
// )}


     
//         <Grid size={2}>
//             <TextField label="Net Total" value={netTotal} fullWidth InputProps={{ readOnly: true }} />
//           </Grid>
//         </Grid>

        

//         <Box mt={4}>
//           <Button
//             variant="contained"
//             size="large"
//             onClick={handleSubmit(onSubmit)}
//             disabled={!products.some((p) => p.qty && p.price)}
//           >
//             Submit Invoice
//           </Button>
//         </Box>
//       </Paper>
//     </Box>
//   );

// }


"use client";

import React, { useEffect, useMemo, useState } from "react";
import Alert from "@mui/material/Alert";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  MenuItem,
  IconButton,
  Divider,
  CircularProgress,
  Stack,
  Chip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { keyframes } from "@mui/system";

export default function InvoicePage() {
  const router = useRouter();

  const brand = {
    navy: "#0f172a",
    primary: "#2563eb",
    primaryDark: "#1d4ed8",
    cyan: "#0891b2",
    cyanDark: "#0e7490",
    emerald: "#059669",
    blueLight: "#dbeafe",
    cyanLight: "#cffafe",
    emeraldLight: "#dcfce7",
    surface: "#ffffff",
    text: "#334155",
    muted: "#64748b",
    border: "#dbe5f0",
    danger: "#dc2626",
    dangerLight: "#fee2e2",
  };

  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(26px); }
    to { opacity: 1; transform: translateY(0); }
  `;

  const floatSoft = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-7px); }
    100% { transform: translateY(0); }
  `;

  const glowPulse = keyframes`
    0% { box-shadow: 0 0 0 rgba(37, 99, 235, 0.10); }
    50% { box-shadow: 0 18px 45px rgba(8, 145, 178, 0.16); }
    100% { box-shadow: 0 0 0 rgba(37, 99, 235, 0.10); }
  `;

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: "#ffffff",
      color: brand.navy,
      fontWeight: 600,
      transition: "0.28s ease",
      "& fieldset": {
        borderColor: brand.border,
      },
      "&:hover": {
        transform: "translateY(-2px)",
      },
      "&:hover fieldset": {
        borderColor: brand.primary,
      },
      "&.Mui-focused": {
        transform: "scale(1.01)",
      },
      "&.Mui-focused fieldset": {
        borderColor: brand.primary,
        borderWidth: "2px",
      },
    },
    "& .MuiInputLabel-root": {
      color: brand.muted,
      fontWeight: 600,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: brand.primary,
    },
  };

  const [partyOptions, setPartyOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [recUserId, setRecUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      invoiceNumber: "",
      date: "",
      invoiceType: "",
      partyId: "",
      partyName: "",
      gstNumber: "",
      panNumber: "",
      grossTotal: 0,
      discount: 0,
      gstType: "none",
      cgst: 0,
      sgst: 0,
      igst: 0,
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount: 0,
      products: [{ productId: "", name: "", qty: "", price: "", amount: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const products = useWatch({ control, name: "products" });
  const discount = watch("discount");
  const gstType = watch("gstType");
  const cgst = watch("cgst");
  const sgst = watch("sgst");
  const igst = watch("igst");

  const grossTotal = useMemo(() => {
    return products.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  }, [products]);

  const { netTotal, cgstAmount, sgstAmount, igstAmount } = useMemo(() => {
    let total = grossTotal - (parseFloat(discount) || 0);

    let cgstAmt = 0;
    let sgstAmt = 0;
    let igstAmt = 0;

    if (gstType === "cgst_sgst") {
      cgstAmt = total * ((parseFloat(cgst) || 0) / 100);
      sgstAmt = total * ((parseFloat(sgst) || 0) / 100);
      total += cgstAmt + sgstAmt;
    }

    if (gstType === "igst") {
      igstAmt = total * ((parseFloat(igst) || 0) / 100);
      total += igstAmt;
    }

    return {
      netTotal: total,
      cgstAmount: cgstAmt,
      sgstAmount: sgstAmt,
      igstAmount: igstAmt,
    };
  }, [grossTotal, discount, gstType, cgst, sgst, igst]);

  useEffect(() => {
    const testToken = async () => {
      try {
        const resToken = localStorage.getItem("Token");

        if (!resToken) {
          router.push("/signin");
          return;
        }

        const res = await axios.post("/api/jwt_verify", { resToken });

        setRecUserId(res.data.received_id);

        if (!res.data.valid) {
          router.push("/signin");
        }
      } catch (err) {
        console.log("error", err);
        router.push("/signin");
      }
    };

    testToken();
  }, [router]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.post("/api/fetch_item_api");
        setProductOptions(res.data.data);
      } catch (err) {
        console.log("this is my error ", err);
      }
    };

    fetchItems();
  }, []);

  const target = async (abc) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/fetch_party_api", { abc });

      setPartyOptions(res.data.data);
    } catch (err) {
      console.log("This is Frontend error", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    if (!recUserId) {
      setError("User not authenticated properly");
      return;
    }

    const finalData = {
      ...data,
      cgstAmount,
      sgstAmount,
      igstAmount,
      netTotal,
      grossTotal,
      userId: recUserId,
    };

    try {
      setSubmitLoading(true);
      setSuccess("");
      setError("");

      const res = await axios.post("/api/invoice_api", { finalData });

      if (res.data.status == 200) {
        setSuccess("Invoice data saved successfully");
        reset();
      } else {
        setError("The invoice number already exists");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 3 },
        py: 4,
        background:
          "linear-gradient(135deg, #f8fafc 0%, #eef6ff 48%, #ecfeff 100%)",
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
          p: { xs: 2.5, md: 4 },
          borderRadius: "8px",
          background: "rgba(255,255,255,0.96)",
          border: `1px solid ${brand.blueLight}`,
          boxShadow: "0 34px 90px rgba(15, 23, 42, 0.14)",
          backdropFilter: "blur(18px)",
          position: "relative",
          zIndex: 1,
          animation: `${fadeUp} 0.7s ease both, ${glowPulse} 4s ease-in-out infinite`,
        }}
      >
        <Stack spacing={1} sx={{ mb: 3, textAlign: "center" }}>
          <Chip
            icon={<ReceiptLongIcon />}
            label="Create Invoice"
            sx={{
              mx: "auto",
              width: "fit-content",
              borderRadius: "8px",
              backgroundColor: brand.blueLight,
              color: brand.primaryDark,
              fontWeight: 900,
              "& .MuiChip-icon": {
                color: brand.primary,
              },
            }}
          />

          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              color: brand.navy,
            }}
          >
            Invoice
          </Typography>

          <Typography sx={{ color: brand.muted }}>
            Create invoice with products, tax, discount, and final total.
          </Typography>
        </Stack>

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

        <Grid container spacing={2} sx={{ animation: `${fadeUp} 0.8s ease both` }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="invoiceNumber"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Invoice Number"
                  fullWidth
                  error={!!errors.invoiceNumber}
                  helperText={errors.invoiceNumber?.message}
                  sx={inputStyle}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="date"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={inputStyle}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="invoiceType"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Invoice Type"
                  fullWidth
                  sx={inputStyle}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    target(e.target.value);
                  }}
                >
                  <MenuItem value="purchase">Purchase</MenuItem>
                  <MenuItem value="sale">Sale</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            {loading ? (
              <Box
                sx={{
                  height: 56,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  border: `1px solid ${brand.border}`,
                  backgroundColor: "#ffffff",
                }}
              >
                <CircularProgress size={24} sx={{ color: brand.primary }} />
              </Box>
            ) : (
              <Controller
                name="partyId"
                control={control}
                rules={{ required: "Required" }}
                render={({ field }) => (
                  <Autocomplete
                    options={partyOptions}
                    getOptionLabel={(option) => option.label || ""}
                    value={partyOptions.find((opt) => opt.id === field.value) || null}
                    onChange={(_, data) => {
                      field.onChange(data ? data.id : "");
                      setValue("partyName", data ? data.label : "");
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Party Name"
                        error={!!errors.partyId}
                        helperText={errors.partyId?.message}
                        sx={inputStyle}
                      />
                    )}
                  />
                )}
              />
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <Controller
              name="gstNumber"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="GST Number"
                  fullWidth
                  error={!!errors.gstNumber}
                  helperText={errors.gstNumber?.message}
                  sx={inputStyle}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <Controller
              name="panNumber"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="PAN Number"
                  fullWidth
                  error={!!errors.panNumber}
                  helperText={errors.panNumber?.message}
                  sx={inputStyle}
                />
              )}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: brand.border }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "stretch", sm: "center" }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 900, color: brand.navy }}>
            Products
          </Typography>

          <Button
            startIcon={<AddIcon />}
            onClick={() =>
              append({ productId: "", name: "", qty: "", price: "", amount: 0 })
            }
            sx={{
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 900,
              color: brand.primary,
              backgroundColor: brand.blueLight,
              "&:hover": {
                backgroundColor: "#bfdbfe",
                transform: "translateY(-2px)",
              },
            }}
          >
            Add Row
          </Button>
        </Stack>

        <Stack spacing={1.5}>
          {fields.map((item, index) => (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                p: 1.5,
                borderRadius: "8px",
                backgroundColor: "#ffffff",
                border: `1px solid ${brand.border}`,
                animation: `${fadeUp} 0.45s ease both`,
                animationDelay: `${index * 0.05}s`,
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, md: 4 }}>
                  <Controller
                    name={`products.${index}.productId`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Autocomplete
                        options={productOptions}
                        getOptionLabel={(opt) => opt.label || ""}
                        onChange={(_, data) => {
                          field.onChange(data ? data.id : "");
                          setValue(`products.${index}.name`, data ? data.label : "");
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Product" sx={inputStyle} />
                        )}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                  <Controller
                    name={`products.${index}.qty`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Qty"
                        type="number"
                        fullWidth
                        sx={inputStyle}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);

                          const price = watch(`products.${index}.price`) || 0;
                          setValue(`products.${index}.amount`, value * price);
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 2 }}>
                  <Controller
                    name={`products.${index}.price`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Price"
                        type="number"
                        fullWidth
                        sx={inputStyle}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(value);

                          const qty = watch(`products.${index}.qty`) || 0;
                          setValue(`products.${index}.amount`, value * qty);
                        }}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                  <Controller
                    name={`products.${index}.amount`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Amount"
                        fullWidth
                        InputProps={{ readOnly: true }}
                        sx={inputStyle}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 1 }}>
                  <IconButton
                    onClick={() => remove(index)}
                    sx={{
                      color: brand.danger,
                      backgroundColor: brand.dangerLight,
                      borderRadius: "8px",
                      "&:hover": {
                        backgroundColor: "#fecaca",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Stack>

        <Divider sx={{ my: 3, borderColor: brand.border }} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              label="Gross Total"
              value={grossTotal.toFixed(2)}
              fullWidth
              InputProps={{ readOnly: true }}
              sx={inputStyle}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="discount"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Discount"
                  type="number"
                  fullWidth
                  sx={inputStyle}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Controller
              name="gstType"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="GST Type" fullWidth sx={inputStyle}>
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="cgst_sgst">CGST & SGST</MenuItem>
                  <MenuItem value="igst">IGST</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          {gstType === "cgst_sgst" && (
            <>
              <Grid size={{ xs: 12, md: 3 }}>
                <Controller
                  name="cgst"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="CGST %" type="number" fullWidth sx={inputStyle} />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  label="CGST Amount"
                  value={cgstAmount.toFixed(2)}
                  InputProps={{ readOnly: true }}
                  fullWidth
                  sx={inputStyle}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Controller
                  name="sgst"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="SGST %" type="number" fullWidth sx={inputStyle} />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <TextField
                  label="SGST Amount"
                  value={sgstAmount.toFixed(2)}
                  fullWidth
                  InputProps={{ readOnly: true }}
                  sx={inputStyle}
                />
              </Grid>
            </>
          )}

          {gstType === "igst" && (
            <>
              <Grid size={{ xs: 12, md: 4 }}>
                <Controller
                  name="igst"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="IGST %" type="number" fullWidth sx={inputStyle} />
                  )}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="IGST Amount"
                  value={igstAmount.toFixed(2)}
                  fullWidth
                  InputProps={{ readOnly: true }}
                  sx={inputStyle}
                />
              </Grid>
            </>
          )}

          <Grid size={{ xs: 12, md: gstType === "igst" ? 4 : 12 }}>
            <TextField
              label="Net Total"
              value={netTotal.toFixed(2)}
              fullWidth
              InputProps={{ readOnly: true }}
              sx={{
                ...inputStyle,
                "& .MuiOutlinedInput-root": {
                  ...inputStyle["& .MuiOutlinedInput-root"],
                  backgroundColor: brand.emeraldLight,
                },
                "& input": {
                  color: brand.emerald,
                  fontWeight: 900,
                },
              }}
            />
          </Grid>
        </Grid>

        <Box mt={4}>
          <Button
            size="large"
            fullWidth
            onClick={handleSubmit(onSubmit)}
            disabled={submitLoading || !products.some((p) => p.qty && p.price)}
            endIcon={!submitLoading && <ArrowForwardIcon />}
            sx={{
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
                background:
                  "linear-gradient(135deg, #1d4ed8 0%, #0e7490 100%)",
              },
              "&.Mui-disabled": {
                color: "#ffffff",
                background: "#94a3b8",
              },
            }}
          >
            {submitLoading ? (
              <CircularProgress size={24} sx={{ color: "#ffffff" }} />
            ) : (
              "Submit Invoice"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
