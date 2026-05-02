import { NextResponse } from "next/server";
import { Pool } from "pg";
 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
 
export async function POST(req) {
  const body = await req.json();
  const { pid, qtyChange } = body;

  console.log("This is my body",body);

  try{

    const qry= 'update items set item_qty = item_qty + $1 where p_id=$2';
    const value= [qtyChange,pid];

    const res= await pool.query(qry,value);

    console.log("This is my res",res);
     return NextResponse.json({status:200,data: res});


  }

  catch(err){
    console.log("This is my error",err);
    return NextResponse.json({status:500,messege: "Something Went Wrong"});

  }

}