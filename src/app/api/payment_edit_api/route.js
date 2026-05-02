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
    const {edit}=res;

    console.log("This is your is", edit);

    try{
        const my_query='select * from invoice_payment where id=$1';
        const value= [edit];

        console.log("value is ",value);

        const res= await pool.query(my_query,value);

        console.log("This is your res", res.rows[0]);

      return NextResponse.json({status: 200,data: res.rows[0]});

  } catch (err) {
    console.log("This is your error", err);

    return NextResponse.json({ message: "Database error" },{ status: 500 });
  }
}