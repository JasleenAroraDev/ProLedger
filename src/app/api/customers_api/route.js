import { NextResponse} from "next/server";
import {Pool} from 'pg';

const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized: false,
  }
})

export async function POST(req){

  const rest= await req.json();

  const{customerName,email,phone , gstNumber, city, status,address}= rest;

  try{


           const my_gst= 'select * from customers where gst_number= $1';
    
           const gst_value=[gstNumber];
    
           const qry_gst = await pool.query(my_gst,gst_value);
    
           if(qry_gst.rowCount>0)
           {
          return NextResponse.json({message:"This GST Number is already exist"}, {status:409});
           }

           const my_phone= 'select * from customers where phone_number= $1';
           
                  const phone_value=[phone];
           
                  const qry_phone = await pool.query(my_phone,phone_value);
           
                  if(qry_phone.rowCount>0)
                  {
                 return NextResponse.json({message:"This Phone Number is already exist"}, {status:409});
                  }
    


    const my_query = 'Insert into customers (customer_name,email,phone_number,gst_number,city,status,address) values($1,$2,$3,$4,$5,$6,$7)';

    const value= [customerName,email,phone,gstNumber,city,status,address];

    const res = await pool.query(my_query,value);

    console.log("This is your result",res);

    if(res){
      return NextResponse.json({messege: "Data saved successfully "}, {status : 200});
    }
  }

  catch(err){

    return NextResponse.json({messege: "Something went wrong"}, {status : 500});
    
  }

}