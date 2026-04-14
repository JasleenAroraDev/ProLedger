import { NextResponse } from "next/server";
import {Pool} from 'pg';
import jwt from 'jsonwebtoken';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false,
    }
})


export async function POST(req){


    try{
         const { token } = await req.json();
          const verified = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = verified.id;
        const my_query='select * from company where user_id=$1';
        const value= [user_id];

        console.log("value is ",value);

        const res= await pool.query(my_query,value);

        console.log("This is your res", res.rows);

      return NextResponse.json({status: 200,data: res.rows[0]});

  } catch (err) {
    console.log("This is your error", err);

    return NextResponse.json({ message: "Database error" },{ status: 500 });
  }
}