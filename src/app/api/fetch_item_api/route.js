import { NextResponse} from "next/server";
import {Pool} from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false,
    }
})

export async function POST(req){
   //  const res= await req.json();

    // console.log("this is my res",res);

    try{
        const my_query='select id,item_name as label from items';
        const rest= await pool.query(my_query);

        console.log(rest.rows);

        return NextResponse.json({status: 200,data: rest.rows});

    }

    catch(err){
        console.log("This is your error",err);
            return NextResponse.json({status:500,messege:"Something went wrong"});

    }

}