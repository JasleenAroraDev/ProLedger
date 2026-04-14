import { NextResponse } from "next/server";
import {Pool} from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false,

    }
})


export async function POST (req){

    const res= await req.json();
    const {search}= res;

    console.log("This is your result", search);

    try{
        
        if(search){
            const qry= "select * from company where lower(company_name) like $1";
            const value= [`%${search}%`];
            const res= await pool.query(qry,value);
        return NextResponse.json({status:200, data: res.rows});

        }else{
        const my_query= 'select * from company';
         const res = await pool.query(my_query);
            return NextResponse.json({status:200, data: res.rows});

        }
        

    }

    catch(err){

         console.log("This is your error",err);
         return NextResponse.json({messege : "Something went wrong"}, {status:500});

    }
    }
