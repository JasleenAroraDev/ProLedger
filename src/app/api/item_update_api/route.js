import { NextResponse } from "next/server";
import {Pool} from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized:false,
    }
})


export async function POST(req){
    try{
    const res = await req.json();
 
    const {item_sku,item_name,item_unit,id}=res;

    console.log("This is your is", res);



        const my_query='update items set item_sku=$1,item_name=$2,item_unit=$3 where id=$4';

        const value= [item_sku,item_name,item_unit,id];

        console.log("value is ",value);

        const result= await pool.query(my_query,value);

     console.log("This is my result", result);

     return NextResponse.json({ message:"Data Updated Successfully", status:200});

  } catch (err) {
    console.log("This is your error", err);
  

    return NextResponse.json({ message: "Database error" },{ status: 500 });
  }
}
