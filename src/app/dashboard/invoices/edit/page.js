// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import Alert from "@mui/material/Alert";
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
// import { useSearchParams } from "next/navigation";

// export default function InvoicePage() {
//   const [partyOptions, setPartyOptions] = useState([]);
//   const [productOptions, setProductOptions] = useState([]);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [edit, setEdit] = useState();

//   const searchParams = useSearchParams();
//   const inv_id = searchParams.get("id");

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
//       partyId: "",
//       partyName: "",
//       discount: 0,
//       gstType: "none",
//       cgst: 0,
//       sgst: 0,
//       igst: 0,
//       products: [{ productId: "", name: "", qty: "", price: "", amount: 0 }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "products",
//   });

//   const products = useWatch({ control, name: "products" });

//   // ✅ Use useWatch for ALL reactive values (not watch) so reset() triggers re-render
//   const partyId = useWatch({ control, name: "partyId" });
//   const discount = useWatch({ control, name: "discount" });
//   const gstType = useWatch({ control, name: "gstType" });
//   const cgst = useWatch({ control, name: "cgst" });
//   const sgst = useWatch({ control, name: "sgst" });
//   const igst = useWatch({ control, name: "igst" });

//   // ✅ Gross Total
//   const grossTotal = useMemo(() => {
//     return products.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
//   }, [products]);

//   // ✅ Net Total + GST
//   const { netTotal, cgstAmount, sgstAmount, igstAmount } = useMemo(() => {
//     let total = grossTotal - (parseFloat(discount) || 0);
//     let cgstAmt = 0, sgstAmt = 0, igstAmt = 0;

//     if (gstType === "cgst_sgst") {
//       cgstAmt = total * ((parseFloat(cgst) || 0) / 100);
//       sgstAmt = total * ((parseFloat(sgst) || 0) / 100);
//       total += cgstAmt + sgstAmt;
//     } else if (gstType === "igst") {
//       igstAmt = total * ((parseFloat(igst) || 0) / 100);
//       total += igstAmt;
//     }

//     return { netTotal: total, cgstAmount: cgstAmt, sgstAmount: sgstAmt, igstAmount: igstAmt };
//   }, [grossTotal, discount, gstType, cgst, sgst, igst]);

//   // ✅ Fetch Parties — renamed from "target" to "fetchParty" so loadData can call it
//   const fetchParty = async (type) => {
//     try {
//       setLoading(true);
//       const res = await axios.post("/api/fetch_party_api", { abc: type });
//       setPartyOptions(res.data.data);
//     } catch (err) {
//       console.log("Party fetch error", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Fetch Products
//   useEffect(() => {
//     const fetchItems = async () => {
//       try {
//         const res = await axios.post("/api/fetch_item_api");
//         setProductOptions(res.data.data);
//       } catch (err) {
//         console.log("Items fetch error", err);
//       }
//     };
//     fetchItems();
//   }, []);

//   // ✅ Edit Mode — guard added, fetchParty called correctly
//   useEffect(() => {
//     if (!inv_id) return; // ✅ Guard: skip if no ID

//     const loadData = async () => {
//       try {
//         const res = await axios.post("/api/invoice_edit_api", { edit: inv_id });
//         const d = res.data.data;

//         const p=res.data.item_data;

//         console.log("product data is ",p);



//         console.log("Give is your data ",d);
//         setEdit(inv_id);

//         await fetchParty(d.invoice_type); // ✅ Was calling undefined "fetchParty", now correct

//         reset({
//           invoiceNumber: d.invoice_no,
//           date: d.invoice_date?.split("T")[0],
//           invoiceType: d.invoice_type,
//           partyId: Number(d.party_id),
//           partyName: d.party_name,
//           discount: Number(d.discount),
//           gstType: d.gst_type,
//           cgst: Number(d.cgst_pers),
//           sgst: Number(d.sgst_pers),
//           igst: Number(d.igst_pers),
//           products: p?.map((item) => ({
//             productId: Number(item.item_id),
//             name: item.item_name,
//             qty: Number(item.item_qty),
//             price: Number(item.item_price),
//             amount: Number(item.final_amt),
//           })) ?? [{ productId: "", name: "", qty: 0, price: 0, amount: 0 }],
//         });
//       } catch (err) {
//         console.log("Load invoice error", err);
//       }
//     };

//     loadData();
//   }, [inv_id, reset]);

//   // ✅ Submit
//   const onSubmit = async (data) => {
//     try {
//       setSuccess("");
//       setError("");

//       const finalData = {
//         ...data,
//         id: Number(edit),
//         grossTotal,
//         netTotal,
//         cgstAmount,
//         sgstAmount,
//         igstAmount,
//       };


//       console.log("this is data imsending now ",finalData);


//       await axios.post("/api/invoice_update_api", { finalData });
//       setSuccess("Invoice Data Updated Successfully");
//     } catch {
//       setError("Something Went Wrong");
//     }
//   };

//   return (
//     <Box p={3}>
//       <Paper sx={{ p: 4, borderRadius: 3 }}>
//         <Typography variant="h5" fontWeight="bold" mb={3}>
//           Invoice
//         </Typography>

//         {success && <Alert severity="success">{success}</Alert>}
//         {error && <Alert severity="error">{error}</Alert>}

//         {/* Header Section */}
//         <Grid container spacing={2}>
//           <Grid size={4}>
//             <Controller
//               name="invoiceNumber"
//               control={control}
//               rules={{ required: "Required" }}
//               render={({ field }) => (
//                 <TextField {...field} label="Invoice Number" fullWidth error={!!errors.invoiceNumber} />
//               )}
//             />
//           </Grid>

//           <Grid size={4}>
//             <Controller
//               name="date"
//               control={control}
//               rules={{ required: "Required" }}
//               render={({ field }) => (
//                 <TextField {...field} type="date" fullWidth InputLabelProps={{ shrink: true }} />
//               )}
//             />
//           </Grid>

//           <Grid size={4}>
//             <Controller
//               name="invoiceType"
//               control={control}
//               rules={{ required: "Required" }}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   select
//                   label="Invoice Type"
//                   fullWidth
//                   onChange={(e) => {
//                     field.onChange(e.target.value);
//                     fetchParty(e.target.value); // ✅ Correct function name
//                   }}
//                 >
//                   <MenuItem value="purchase">Purchase</MenuItem>
//                   <MenuItem value="sale">Sale</MenuItem>
//                 </TextField>
//               )}
//             />
//           </Grid>

//           {/* Party Autocomplete */}
//           {loading ? (
//             <CircularProgress />
//           ) : (
//             <Grid size={8}>
//               <Controller
//                 name="partyId"
//                 control={control}
//                 rules={{ required: "Required" }}
//                 render={({ field }) => (
//                   <Autocomplete
//                     options={partyOptions}
//                     getOptionLabel={(option) => option.label || ""}
//                     isOptionEqualToValue={(option, value) => option.id === value.id}
//                     value={partyOptions.find((opt) => opt.id === partyId) || null} // ✅ uses useWatch partyId
//                     onChange={(_, data) => {
//                       field.onChange(data ? data.id : "");
//                       setValue("partyName", data ? data.label : "");
//                     }}
//                     renderInput={(params) => (
//                       <TextField {...params} label="Party Name" error={!!errors.partyId} />
//                     )}
//                   />
//                 )}
//               />
//             </Grid>
//           )}
//         </Grid>

//         <Divider sx={{ my: 3 }} />

//         {/* Products Section */}
//         <Typography variant="h6" mb={2}>
//           Products
//         </Typography>

//         {fields.map((item, index) => (
//           <Grid container spacing={2} key={item.id} alignItems="center" mb={1}>
//             <Grid size={4}>
//               <Controller
//                 name={`products.${index}.productId`}
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <Autocomplete
//                     options={productOptions}
//                     getOptionLabel={(opt) => opt.label || ""}
//                     isOptionEqualToValue={(opt, val) => opt.id === val.id}
//                     // ✅ value prop added — required for edit mode to show selected product
//                     value={productOptions.find((opt) => opt.id === field.value) || null}
//                     onChange={(_, data) => {
//                       field.onChange(data ? data.id : "");
//                       setValue(`products.${index}.name`, data ? data.label : "");
//                     }}
//                     renderInput={(params) => <TextField {...params} label="Product" />}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid size={2}>
//               <Controller
//                 name={`products.${index}.qty`}
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Qty"
//                     type="number"
//                     fullWidth
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       field.onChange(value);
//                       const price = watch(`products.${index}.price`) || 0;
//                       setValue(`products.${index}.amount`, value * price);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid size={2}>
//               <Controller
//                 name={`products.${index}.price`}
//                 control={control}
//                 rules={{ required: true }}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     label="Price"
//                     type="number"
//                     fullWidth
//                     onChange={(e) => {
//                       const value = e.target.value;
//                       field.onChange(value);
//                       const qty = watch(`products.${index}.qty`) || 0;
//                       setValue(`products.${index}.amount`, value * qty);
//                     }}
//                   />
//                 )}
//               />
//             </Grid>

//             <Grid size={2}>
//               <Controller
//                 name={`products.${index}.amount`}
//                 control={control}
//                 render={({ field }) => (
//                   <TextField {...field} label="Amount" fullWidth InputProps={{ readOnly: true }} />
//                 )}
//               />
//             </Grid>

//             <Grid size={1}>
//               <IconButton color="error" onClick={() => remove(index)}>
//                 <DeleteIcon />
//               </IconButton>
//             </Grid>
//           </Grid>
//         ))}

//         {/* ✅ productId added to append default */}
//         <Button
//           startIcon={<AddIcon />}
//           onClick={() => append({ productId: "", name: "", qty: "", price: "", amount: 0 })}
//         >
//           Add Row
//         </Button>

//         <Divider sx={{ my: 3 }} />

//         {/* Totals Section */}
//         <Grid container spacing={2}>
//           <Grid size={4}>
//             <TextField
//               label="Gross Total"
//               value={grossTotal}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//           </Grid>

//           <Grid size={4}>
//             <Controller
//               name="discount"
//               control={control}
//               render={({ field }) => (
//                 <TextField {...field} label="Discount" type="number" fullWidth />
//               )}
//             />
//           </Grid>

//           <Grid size={4}>
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
//           </Grid>

//           {gstType === "cgst_sgst" && (
//             <>
//               <Grid size={4}>
//                 <Controller
//                   name="cgst"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField {...field} label="CGST %" type="number" fullWidth />
//                   )}
//                 />
//               </Grid>

//               <Grid size={4}>
//                 <TextField
//                   label="CGST Amount"
//                   value={cgstAmount.toFixed(2)}
//                   InputProps={{ readOnly: true }}
//                   fullWidth
//                 />
//               </Grid>

//               <Grid size={2}>
//                 <Controller
//                   name="sgst"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField {...field} label="SGST %" type="number" fullWidth />
//                   )}
//                 />
//               </Grid>

//               <Grid size={2}>
//                 <TextField
//                   label="SGST Amount"
//                   value={sgstAmount.toFixed(2)}
//                   fullWidth
//                   InputProps={{ readOnly: true }}
//                 />
//               </Grid>
//             </>
//           )}

//           {gstType === "igst" && (
//             <>
//               <Grid size={2}>
//                 <Controller
//                   name="igst"
//                   control={control}
//                   render={({ field }) => (
//                     <TextField {...field} label="IGST %" type="number" fullWidth />
//                   )}
//                 />
//               </Grid>

//               <Grid size={2}>
//                 <TextField
//                   label="IGST Amount"
//                   value={igstAmount.toFixed(2)}
//                   fullWidth
//                   InputProps={{ readOnly: true }}
//                 />
//               </Grid>
//             </>
//           )}

//           <Grid size={2}>
//             <TextField
//               label="Net Total"
//               value={netTotal.toFixed(2)}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
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
import { useSearchParams } from "next/navigation";
import { keyframes } from "@mui/system";

export default function InvoicePage() {
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
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState();
  const [submitLoading, setSubmitLoading] = useState(false);

  const searchParams = useSearchParams();
  const inv_id = searchParams.get("id");

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
      discount: 0,
      gstType: "none",
      cgst: 0,
      sgst: 0,
      igst: 0,
      products: [{ productId: "", name: "", qty: "", price: "", amount: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const products = useWatch({ control, name: "products" });
  const partyId = useWatch({ control, name: "partyId" });
  const discount = useWatch({ control, name: "discount" });
  const gstType = useWatch({ control, name: "gstType" });
  const cgst = useWatch({ control, name: "cgst" });
  const sgst = useWatch({ control, name: "sgst" });
  const igst = useWatch({ control, name: "igst" });

  const grossTotal = useMemo(() => {
    return products.reduce(
      (sum, item) => sum + (parseFloat(item.amount) || 0),
      0
    );
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
    } else if (gstType === "igst") {
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

  const fetchParty = async (type) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/fetch_party_api", { abc: type });

      setPartyOptions(res.data.data);
    } catch (err) {
      console.log("Party fetch error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.post("/api/fetch_item_api");
        setProductOptions(res.data.data);
      } catch (err) {
        console.log("Items fetch error", err);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (!inv_id) return;

    const loadData = async () => {
      try {
        const res = await axios.post("/api/invoice_edit_api", {
          edit: inv_id,
        });

        const d = res.data.data;
        const p = res.data.item_data;

        setEdit(inv_id);

        await fetchParty(d.invoice_type);

        reset({
          invoiceNumber: d.invoice_no,
          date: d.invoice_date?.split("T")[0],
          invoiceType: d.invoice_type,
          partyId: Number(d.party_id),
          partyName: d.party_name,
          discount: Number(d.discount),
          gstType: d.gst_type,
          cgst: Number(d.cgst_pers),
          sgst: Number(d.sgst_pers),
          igst: Number(d.igst_pers),
          products:
            p?.map((item) => ({
              productId: Number(item.item_id),
              name: item.item_name,
              qty: Number(item.item_qty),
              price: Number(item.item_price),
              amount: Number(item.final_amt),
            })) ?? [
              {
                productId: "",
                name: "",
                qty: 0,
                price: 0,
                amount: 0,
              },
            ],
        });
      } catch (err) {
        console.log("Load invoice error", err);
        setError("Failed to load invoice data");
      }
    };

    loadData();
  }, [inv_id, reset]);

  const onSubmit = async (data) => {
    try {
      setSubmitLoading(true);
      setSuccess("");
      setError("");

      const finalData = {
        ...data,
        id: Number(edit),
        grossTotal,
        netTotal,
        cgstAmount,
        sgstAmount,
        igstAmount,
      };

      await axios.post("/api/invoice_update_api", { finalData });

      setSuccess("Invoice data updated successfully");
    } catch {
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
            label="Edit Invoice"
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
            Edit Invoice
          </Typography>

          <Typography sx={{ color: brand.muted }}>
            Update invoice details, products, tax, discount, and final total.
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
                    fetchParty(e.target.value);
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
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    value={partyOptions.find((opt) => opt.id === partyId) || null}
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
                        isOptionEqualToValue={(opt, val) => opt.id === val.id}
                        value={
                          productOptions.find((opt) => opt.id === field.value) ||
                          null
                        }
                        onChange={(_, data) => {
                          field.onChange(data ? data.id : "");
                          setValue(
                            `products.${index}.name`,
                            data ? data.label : ""
                          );
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Product"
                            sx={inputStyle}
                          />
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
                <TextField
                  {...field}
                  select
                  label="GST Type"
                  fullWidth
                  sx={inputStyle}
                >
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
                    <TextField
                      {...field}
                      label="CGST %"
                      type="number"
                      fullWidth
                      sx={inputStyle}
                    />
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
                    <TextField
                      {...field}
                      label="SGST %"
                      type="number"
                      fullWidth
                      sx={inputStyle}
                    />
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
                    <TextField
                      {...field}
                      label="IGST %"
                      type="number"
                      fullWidth
                      sx={inputStyle}
                    />
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
              "Update Invoice"
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
