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
        const my_query='select * from invoice where id=$1';
        const value= [edit];
   
  

        console.log("value is ",value);

        const res= await pool.query(my_query,value);


        const qry= 'select * from invoice_items where invoice_id=$1'
        const qry_value= [edit];

        const res_qry = await pool.query(qry,qry_value);


        console.log("This is your res", res.rows[0]);

      return NextResponse.json({status: 200,data: res.rows[0], item_data:res_qry.rows});

  } catch (err) {
    console.log("This is your error", err);

    return NextResponse.json({ message: "Database error" },{ status: 500 });
  }
}