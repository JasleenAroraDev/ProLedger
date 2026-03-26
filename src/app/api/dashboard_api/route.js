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
console.log(userId);
    try{
        const my_query=('select * from company where user_id=$1');
        const value=[userId];

        const rest= await pool.query(my_query,value);
console.log("this is my rest ",rest);

        if(rest.rowCount>0){

            return NextResponse.json({status:200,valid : true});

        }
        else{
            return NextResponse.json({staus:410,valid:false})
        }
    }

    catch(err){
        console.log("This is your error",err);
        return NextResponse.json({staus:500,valid : false});
    }
}

