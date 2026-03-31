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
  CircularProgress, 
  
 
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

export default function ItemsEdit() {

     const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
      } = useForm({
        defaultValues: {
          item_sku: "",
          item_name: "",
          item_unit: "",
        },
      });
    
    const searchParams = useSearchParams();
    const item_id = searchParams.get("id");

    console.log("my recieved id is ",item_id);

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

      await axios.post("/api/item_update_api", data);

      setSuccess("Item added successfully ");

   

    } catch (err) {
      console.log(err);
      }

     finally {
      setLoading(false);
    }
}

    useEffect(() =>{

    setEdit(item_id);
    
        const viewEdit = async ()=>{

            console.log("im under call");
            const res= await axios.post("/api/item_edit_api", {edit});

             console.log("Items data:", res.data.data); 
             const fetched_data = res.data.data;
             console.log("Fetched_data",fetched_data);

setValue('item_sku',fetched_data.item_sku);
setValue('item_name',fetched_data.item_name);
setValue('item_unit', fetched_data.item_unit);

}

    viewEdit();

  }, [edit]);

return(<Box>
  <form
    onSubmit={handleSubmit(onSubmit)}
    style={{
      maxWidth: "600px",
      margin: "3rem auto",
    }}
  >
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h5" gutterBottom>
     
      </Typography>

      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Item SKU */}
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
          />
        )}
      />

      {/* Item Name */}
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
          />
        )}
      />

      {/* Item Unit */}
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
          >
            <MenuItem value="pcs">Pieces</MenuItem>
            <MenuItem value="kg">Kilogram</MenuItem>
            <MenuItem value="ltr">Liter</MenuItem>
          </TextField>
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
        {loading ? (
          <CircularProgress size={24} />
        ) :  
          "Update Item"
        }
      </Button>
    </Paper>
  </form>
</Box>
      );
    }

