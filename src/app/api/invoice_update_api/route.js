import { NextResponse } from "next/server";
import {Pool} from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false,
    }
})


export async function POST(req){
    
    const res = await req.json();
 
    const {invoiceNumber,date,invoiceType,partyId,partyName,grossTotal,discount,gstType,cgst,sgst,igst,cgstAmount,sgstAmount,igstAmount,netTotal,products,id}=res.finalData;

    console.log("This is your is", res);

    const client = await pool.connect();

    try{

    await client.query("Begin");

        const my_query='update invoice set invoice_no=$1,invoice_date=$2,invoice_type=$3,party_id=$4,party_name=$5,gross_total=$6,discount=$7,gst_type=$8,cgst_pers=$9,cgst_amt=$10,sgst_pers=$11,sgst_amt=$12,igst_pers=$13,igst_amt=$14,net_total=$15 where id=$16';

        const value= [invoiceNumber,date,invoiceType,partyId,partyName,grossTotal,discount,gstType,cgst,sgst,igst,cgstAmount,sgstAmount,igstAmount,netTotal,id];

        console.log("value is ",value);

        const result= await client.query(my_query,value);

     console.log("This is my result", result);


     const qry = 'delete from invoice_items where invoice_id=$1';
     const qry_value = [id];

     const qry_res = await client.query(qry,qry_value);


     console.log("This is my first pro name *********",products[0].name);


for(const pro_info of products){ 

          const my_qry = 'insert into invoice_items (invoice_id,item_id,item_name,item_qty,item_price,final_amt) values($1,$2,$3,$4,$5,$6)';
     const value2= [id,pro_info.productId,pro_info.name,pro_info.qty,pro_info.price,pro_info.amount];

     const result_query = await client.query(my_qry,value2);

}


     await client.query("commit");

     return NextResponse.json({ message:"Data Updated Successfully", status:200});
    }

   catch (err) {

    await client.query("Rollback");
    console.log("This is your error", err);

    return NextResponse.json({ message: "Database error" },{ status: 500 });
  }

  finally{

    client.query("release");

  }
}

