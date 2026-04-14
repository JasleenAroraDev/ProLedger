import { NextResponse } from "next/server";
import {Pool} from 'pg';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false,

    }

})



export async function POST(req){

    const data= await req.json();

    const {email,password} = data;


    try{

      
        const my_query='select id, full_name, password from users where email=$1';
        const value = [email];

        const res_query= await pool.query(my_query,value);

        const fetched_id = res_query.rows[0].id;

        const fetched_full_name = res_query.rows[0].full_name;

         const fetched_password = res_query.rows[0].password;

        const isMatch = await bcrypt.compare(password,fetched_password);

        console.log("isMatch", isMatch);



       if(isMatch){

  const payload ={
    id: fetched_id,
    name:fetched_full_name,
    email:email,
    
  }

  console.log("payload", payload);
  const secret = process.env.JWT_SECRET;

  console.log("secret", secret);

  const expireTime={
    expiresIn:'30d'
  }

  const token =  jwt.sign(payload,secret, expireTime);

  console.log("My Token", token);

   return NextResponse.json({ generatedToken: token }, { status: 200 });
}else{
    return NextResponse.json({message: "Invalid Password"}, {status: 401});
}


    }


catch (err){
      
        console.log("this is ur error ",err);
        return NextResponse.json({ message: "Server error" }, { status: 500 });

}

    }

