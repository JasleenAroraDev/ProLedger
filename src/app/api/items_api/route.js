import { NextResponse } from "next/server";
import {Pool} from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false,

    }
})


export async function POST(req){

    const res = await req.json();

    const{item_name,item_sku,item_unit}= res;

    console.log("This is my result",res);
    
    try{
        const my_query= 'Insert into items (item_sku,item_name,item_unit) values($1,$2,$3)';

        const value= [item_sku,item_name,item_unit];

        const rest= await pool.query(my_query,value);

        console.log("This is my database res",rest);

        return NextResponse.json({messege:"Data ssaved successfully"},{status:200});

    }
    catch(err){
        console.log("This is my error",err);

        return NextResponse.json({messege:"Somethinf went wrong"},{status:500});
    }
}