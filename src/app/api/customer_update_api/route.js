import { NextResponse } from "next/server";
import {Pool} from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false,
    }
})


export async function POST(req){
    try{
    const res = await req.json();
 
    const {customerName,email,phone,gstNumber,city,status,address,id}=res;

    console.log("This is your is", res);



        const my_query='update customers set customer_name=$1, email=$2, phone_number=$3, gst_number=$4,city=$5,status=$6,address=$7 where id=$8';

        const value= [customerName,email,phone,gstNumber,city,status,address,id];

        console.log("value is ",value);

        const result= await pool.query(my_query,value);

     console.log("This is my result", result);

     return NextResponse.json({ message:"Data Updated Successfully", status:200});

  } catch (err) {
    console.log("This is your error", err);
  

    return NextResponse.json({ message: "Database error" },{ status: 500 });
  }
}
