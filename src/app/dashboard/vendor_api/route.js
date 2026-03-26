import { NextResponse } from "next/server";
import {Pool} from "pg";

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false,
    }

})

 export async function POST(req){

    const data = await req.json();

    const {name, email, phone, company,gstnumber,city, state,country,status, address} = data;

    const client = await pool.connect();

    try{
        await client.query("Begin");

        const my_query='INSERT INTO vendors(name,email,phone_number,company,gst_number,city,state,country,status,address) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)';

        const value= [name,email,phone,company,gstnumber,city,state,country,status,address];

        const res = await client.query(my_query,value);


         await client.query("Commit");

        return NextResponse.json({message:"Data saved successfully"});


    }
    catch(err){
    client.query("Rollback");
    console.log("this is ur error ",err);
    return NextResponse.json({message:"Something went wrong"});
}

finally{
     client.release();
}



 }