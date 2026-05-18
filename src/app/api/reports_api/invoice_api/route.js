import { NextResponse} from "next/server";
import {Pool} from 'pg';

const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized: false,
  }
})

export async function POST(req){


    console.log("Received request is ",req);


  try{

    const qry= 'select * from invoice';

    const res= await pool.query(qry);

    console.log("All Invoices",res);


           
      return NextResponse.json({messege: "Data saved successfully ", status : 200,Result: res.rows});
    }
  

  catch(err){

    return NextResponse.json({messege: "Something went wrong"}, {status : 500});
    
  }

}