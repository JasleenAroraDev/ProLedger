import { NextResponse } from "next/server";
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false,
    }
})


export async function POST(req){
    const rest= await req.json();

    const {abc} = rest;
    console.log(rest);

    try{

        if(abc=="sale"){

            const my_query='select id,customer_name as label from customers';

            const res = await pool.query(my_query);

            console.log("customers rows",res.rows);
           

            return NextResponse.json({status:200,data:res.rows});

        }
        else{
            const query= 'select id, vendor_name as label from vendors';

            const res= await pool.query(query);

              console.log("Vendors rows",res.rows);
           

            return NextResponse.json({status:200,data:res.rows});

        }


    }

    catch(err){

        console.log("This is your error",err);

        return NextResponse.json({status:500},{messege:"Something went wrong"});

    }
}


