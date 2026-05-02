"use client";
import React, { useEffect, useMemo,useState } from "react";
import Alert from '@mui/material/Alert';
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import { useForm, Controller, useFieldArray, useWatch } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

// const productOptions = [
//   { label: "Product A" },
//   { label: "Product B" },
//   { label: "Product C" },
// ];

// const partyOptions = [
//   { label: "ABC Traders" },
//   { label: "XYZ Pvt Ltd" },
//   { label: "Guru Nanak Store" },
// ];

export default function InvoicePage() {

const [partyOptions, setPartyOptions]=useState([]);
const [productOptions, setProductOptions]= useState([]);

const [grossTotalAmt, setGrossTotalAmt]=useState(0);

  const [success, setSuccess]= useState("");

  const [error, setError] = useState("");
 const[recUserId, setRecUserId]= useState(null); 


const [loading, setLoading]=useState(false);
const router = useRouter();

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
gstNumber:"",
panNumber:"",
grossTotal:0,
      discount: 0,
      gstType: "none",
      cgst: 0,
      sgst: 0,
      igst: 0,
        cgstAmount: 0,
  sgstAmount: 0,
  igstAmount: 0,
     products: [{ productId: "", name: "", qty: "", price: "", amount: 0 }]
     
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

  // Calculate Amount per row

  // Gross Total
  const grossTotal = useMemo(() => {


    const gotValue= products.reduce((sum, item) => sum + (item.amount || 0), 0);
  setGrossTotalAmt(gotValue);
  return gotValue;

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
  else if (gstType === "igst") {
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
    grossTotal : grossTotalAmt,
     userId:recUserId,
  };


    console.log("Final Invoice:", finalData);

try{
   setSuccess('');
   setError('');

    

    const res= await axios.post("/api/invoice_api",{finalData});
    console.log("This is my res",res);

    if(res.data.status==200){
      setSuccess("Invoice Data Saved Successfully");
      reset();
    }else{
      setError("The Invoice Number is already exist");
    }

   
}

catch(err){
  setError("Something Went Wrong");

}
    
  };

  const target= async (abc) =>{

    try{
     setLoading(true);
    console.log("This is my target", abc);

    const res= await axios.post("/api/fetch_party_api", {abc});

    console.log("This is my result",res.data);
    setPartyOptions(res.data.data);

  
  }
  catch(err){
    console.log("This is Frontend error",err);
  }

  finally{
   setLoading(false);
  }


  }

  useEffect(()=>{
    const fetchItems= async ()=>{

      try{
       const res =await axios.post("/api/fetch_item_api");
        console.log("This is my res",res.data);
        setProductOptions(res.data.data);
      }
      catch(err){
        console.log("this is my error ",err);

      }

    }
    fetchItems();
  }, []);

  return (
    
    
    <Box p={3}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Invoice
        </Typography>

           {success && <Alert severity="success">{success}</Alert>}
        
             {error && <Alert severity="error">{error}</Alert>}
        

        {/* Header Section */}
        <Grid container spacing={2}>
        <Grid size={4}>
            <Controller
              name="invoiceNumber"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField {...field} label="Invoice Number" fullWidth error={!!errors.invoiceNumber} />
              )}
            />
 </Grid>
  <Grid size={4}>
            <Controller
              name="date"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField {...field} type="date" fullWidth InputLabelProps={{ shrink: true }} />
              )}
            />
 </Grid>
    <Grid size={4}>
            <Controller
              name="invoiceType"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField {...field} select label="Invoice Type" fullWidth onChange={(e) => {
                  field.onChange(e.target.value)
                    target(e.target.value) }
                }
                >
                  <MenuItem value="purchase">Puchase
                  </MenuItem>
                  <MenuItem value="sale">Sale</MenuItem>
                </TextField>
              )}
        
            />
 </Grid>


{loading? <CircularProgress/> :
 

     <Grid size={8}>
<Controller
  name="partyId"
  control={control}
  rules={{ required: "Required" }}
  render={({ field }) => (
    <Autocomplete
      options={partyOptions}
      getOptionLabel={(option) => option.label || ""}
      value={
        partyOptions.find((opt) => opt.id === field.value) || null
      }
      onChange={(_, data) => {
        field.onChange(data ? data.id : "");
        setValue("partyName", data ? data.label : "");
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Party Name"
          error={!!errors.partyId}
        />
      )}
    />
  )}
/>

</Grid>


}


      <Grid size={5}>
            <Controller
              name="gstNumber"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField {...field} label="GST Number" fullWidth error={!!errors.gstNumber} />
              )}
            />
 </Grid>


     <Grid size={5}>
            <Controller
              name="panNumber"
              control={control}
              rules={{ required: "Required" }}
              render={({ field }) => (
                <TextField {...field} label="PAN Number" fullWidth error={!!errors.panNumber} />
              )}
            />
 </Grid>

  </Grid>
       


        <Divider sx={{ my: 3 }} />

        {/* Products Section */}
        <Typography variant="h6" mb={2}>
          Products
        </Typography>

        {fields.map((item, index) => (
          <Grid container spacing={2} key={item.id} alignItems="center" mb={1}>
           <Grid size={4}>
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
        <TextField {...params} label="Product" />
      )}
    />
  )}
/>
            </Grid>

        <Grid size={2}>
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

      
        <Grid size={2}>
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

           
        <Grid size={2}>
              <Controller
                name={`products.${index}.amount`}
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Amount" fullWidth InputProps={{ readOnly: true }} />
                )}
              />
            </Grid>

       
        <Grid size={1}>
              <IconButton color="error" onClick={() => remove(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}

        <Button
          startIcon={<AddIcon />}
          onClick={() => append({ name: null, qty: "", price: "", amount: 0 })}
        >
          Add Row
        </Button>

        <Divider sx={{ my: 3 }} />

        {/* Totals Section */}
        <Grid container spacing={2}>
       
     
        <Grid size={4}>
            <TextField label="Gross Total" name="grossTotal" value={grossTotal} fullWidth InputProps={{ readOnly: true }} />
          </Grid>

        
     
        <Grid size={4}>
            <Controller
              name="discount"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Discount" type="number" fullWidth />
              )}
            />
          </Grid>


   
        <Grid size={4}>
            <Controller
              name="gstType"
              control={control}
              render={({ field }) => (
                <TextField {...field} select label="GST Type" fullWidth>
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="cgst_sgst">CGST & SGST</MenuItem>
                  <MenuItem value="igst">IGST</MenuItem>
                </TextField>
              )}
            />
         
</Grid>
          {gstType === "cgst_sgst" && (
            <>



        <Grid size={4}>
                <Controller
                  name="cgst"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="CGST %" type="number" fullWidth/>
                  )}
                />
              </Grid>
           

    <Grid size={4}>
      <TextField label="CGST Amount" value={cgstAmount} InputProps={{ readOnly: true }} fullWidth />
    </Grid>




 
        <Grid size={2}>
                <Controller
                  name="sgst"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} label="SGST %" type="number" fullWidth />
                  )}
                />
              </Grid>

                      <Grid size={2}>
      <TextField label="SGST Amount" value={sgstAmount} fullWidth InputProps={{ readOnly: true }} />
    </Grid>

  

            </>
          )}

          {gstType === "igst" && (
           
        <Grid size={2}>
              <Controller
                name="igst"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="IGST %" type="number" fullWidth />
                )}
              />
            </Grid>
          )}


{gstType === "igst" && (

        <Grid size={2}>
    <TextField label="IGST Amount" value={igstAmount} fullWidth InputProps={{ readOnly: true }} />
  </Grid>
)}


     
        <Grid size={2}>
            <TextField label="Net Total" value={netTotal} fullWidth InputProps={{ readOnly: true }} />
          </Grid>
        </Grid>

        

        <Box mt={4}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit(onSubmit)}
            disabled={!products.some((p) => p.qty && p.price)}
          >
            Submit Invoice
          </Button>
        </Box>
      </Paper>
    </Box>
  );

}