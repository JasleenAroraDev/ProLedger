import { NextResponse } from "next/server";
import {Pool} from 'pg';

const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false,
    }
})

export async function POST(req){

    const rest = await req.json();
    const {id} = rest;

    console.log("ID", id);

    try{
        const my_query= 'delete from invoice_payment where id=$1';
        const value= [id];

        const res= await pool.query(my_query,value);

        console.log("Database res",res);

        return NextResponse.json({messege:"Deleted Successfully"},{status:200});
    }

    catch(err){
        console.log("This is your error",err);

        return NextResponse.json({messege:"Something went wrong"}, {status:500});
    }
}