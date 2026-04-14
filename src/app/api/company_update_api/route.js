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
 
    const {companyName,businessType,industry,country,state,city,gstNumber,panNumber,address,email,phone,website,id}=res;

    console.log("This is your is", res);



        const my_query='update company set company_name=$1, business_type=$2, industry=$3,country=$4,state=$5,city=$6,gst_number=$7,pan_number=$8,company_address=$9,company_email=$10,phone_number=$11,company_website=$12 where id=$13';

        const value= [companyName,businessType,industry,country,state,city,gstNumber,panNumber,address,email,phone,website,id];

        console.log("value is ",value);

        const result= await pool.query(my_query,value);

     console.log("This is my result", result);

     return NextResponse.json({ message:"Data Updated Successfully", status:200});

  } catch (err) {
    console.log("This is your error", err);
  

    return NextResponse.json({ message: "Database error" },{ status: 500 });
  }
}
