import {NextResponse} from "next/server";
import {Pool} from 'pg';
import bcrypt from 'bcrypt';



const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized:false,
  }

})


export async function  POST(req){
    
    const data = await req.json();

    const {fullName, email,phoneNumber, password}= data;

    const client = await pool.connect();

    try{

        const enc_password = await bcrypt.hash(password,20);

        await client.query("Begin");

       const my_qry= 'select * from users where email= $1';
       const values= [email];

       const qry_res= await client.query(my_qry,values);

       console.log("This is my query_res",qry_res);


       if(qry_res.rowCount>0)
       {
      return NextResponse.json({message:"This email is already exist"}, {status:409});
       }


        const my_query = 'INSERT INTO users(full_name, email, phone_no,password) values($1,$2,$3,$4)';

        const value=[fullName, email, phoneNumber, enc_password];

        const res = await client.query(my_query,value);

        console.log("This is my result",res);

        await client.query("commit");
        
         return NextResponse.json({message:"Data saved successfully"},{status:200});

    }

    catch(err){
        client.query("Rollback");
        console.log("this is ur error ",err);
        return NextResponse.json({message:"Something went wrong"},{status:500});
    }

    finally{
        client.query("release");
    }
}