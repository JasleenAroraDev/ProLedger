
import {NextResponse} from "next/server";
import {Pool} from 'pg';


const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized:false,
  }

})

export async function POST(req){

    const rest= await req.json();

    console.log("REST",rest);

    const{invoiceNumber,date,invoiceType,partyId,partyName,gstNumber,panNumber,grossTotal,discount,gstType,cgst,sgst,igst,cgstAmount,sgstAmount,igstAmount,netTotal,products,userId} = rest.finalData;

   

    const client = await pool.connect();

    try{

        await client.query("Begin");

        const my_invoice= 'select * from invoice where invoice_no= $1';
          
        const invoice_value=[invoiceNumber];
          
        const qry_invoice = await client.query(my_invoice,invoice_value);
          
          if(qry_invoice.rowCount>0)
            {
             return NextResponse.json({message:"This Invoive Number is already exist", status:409});
            }
      
        const my_query= 'insert into invoice (invoice_no,invoice_date,invoice_type,party_id,party_name,gross_total,discount,gst_type,cgst_pers,cgst_amt,sgst_pers,sgst_amt,igst_pers,igst_amt,net_total,gst_no,pan_no,user_id) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18) returning id';

        const value= [invoiceNumber,date,invoiceType,partyId,partyName,grossTotal,discount,gstType,cgst,cgstAmount,sgst,sgstAmount,igst,igstAmount,netTotal,gstNumber,panNumber,userId];

        console.log("My all the values are ",invoiceNumber,date,invoiceType,partyId,partyName,grossTotal,discount,gstType,cgst,cgstAmount,sgst,sgstAmount,igst,igstAmount,netTotal,gstNumber,panNumber,userId);

        const result= await client.query(my_query,value);


        const returned_id = result.rows[0].id;



for(const pro_info of products){ 

          const my_qry = 'insert into invoice_items (invoice_id,item_id,item_name,item_qty,item_price,final_amt) values($1,$2,$3,$4,$5,$6)';
     const value2= [returned_id,pro_info.productId,pro_info.name,pro_info.qty,pro_info.price,pro_info.amount];

     const result_query = await client.query(my_qry,value2);

}


for(const pro_info of products){ 

  if(invoiceType=='purchase')
  {
  const query= 'update items set item_qty = item_qty + $1 where id=$2';
    const value3= [pro_info.qty,pro_info.productId];
    const resu= await client.query(query,value3);
  }
  else{
      const query2= 'update items set item_qty = item_qty - $1 where id=$2';
    const value4= [pro_info.qty,pro_info.productId];
     const resul= await client.query(query2,value4);
  }

}



        client.query("commit");

        return NextResponse.json({status:200,message:"it is done",returned_value:result});



    }

    catch(err){
       client.query("Rollback");
             console.log("this is ur error ",err);
       return NextResponse.json({status:400,message:"it is an error"});
  
    }

    finally{
       client.query("release");
    }



}