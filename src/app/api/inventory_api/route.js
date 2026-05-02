import { NextResponse } from "next/server";
import{Pool} from 'pg';

const pool = new Pool({
    connectionString:process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false,
    }
})

export async function POST(req){
    const res= await req.json();

    const {userId}= res;
console.log("userId", userId);

try{
    const qry= 'select * from items where user_id=$1';
    const value= [userId];

    const rest= await pool.query(qry,value);
    console.log("This is my res",rest.rows);

     return NextResponse.json({status:200,data: rest.rows});

}

catch(err){
    console.log("This is my error",err);
    return NextResponse.json({status:500,messege: "Something Went Wrong"});

}
}