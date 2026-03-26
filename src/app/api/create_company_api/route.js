import { NextResponse } from "next/server";
import {Pool} from 'pg';


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false,
    }
})


export async function POST(req){

    const data = await req.json();

    console.log("This is my data", data);

    const{ companyName, businessType, industry, country, state, city, logo, gstNumber, panNumber,email, address, phone,website,userId} =data;


    console.log("This my user_id",userId );


    try{


    const my_email= 'select * from company where company_email= $1';
       const mail_value= [email];

       const qry_email= await pool.query(my_email,mail_value);

       console.log("This is my query_res",qry_email);


       if(qry_email.rowCount>0)
       {
      return NextResponse.json({message:"This email is already exist"}, {status:409});
       }

       const my_website= 'select * from company where company_website =$1';

       const website_value=[website];

       const qry_website = await pool.query(my_website,website_value);

       if(qry_website.rowCount>0)
       {
      return NextResponse.json({message:"This website is already exist"}, {status:409});
       }

       const my_gst= 'select * from company where gst_number= $1';

       const gst_value=[gstNumber];

       const qry_gst = await pool.query(my_gst,gst_value);

       if(qry_gst.rowCount>0)
       {
      return NextResponse.json({message:"This GST Number is already exist"}, {status:409});
       }


       const my_pan= 'select * from company where pan_number= $1';

       const pan_value=[panNumber];

       const qry_pan = await pool.query(my_pan,pan_value);

       if(qry_pan.rowCount>0)
       {
      return NextResponse.json({message:"This PAN Number is already exist"}, {status:409});
       }

       const my_phone= 'select * from company where phone_number= $1';

       const phone_value=[phone];

       const qry_phone = await pool.query(my_phone,phone_value);

       if(qry_phone.rowCount>0)
       {
      return NextResponse.json({message:"This Phone Number is already exist"}, {status:409});
       }

       const userid = 'select * from company where user_id=$1';

       const user_value=[userId];

       const qry_user= await pool.query(userid, user_value);


       if(qry_user.rowCount>0)
       {
      return NextResponse.json({message:"Company already exists for this user"}, {status:409});
       }




        const my_query='Insert into company(company_name,business_type, industry, country,state, city, company_logo,gst_number,pan_number,company_address,company_email, phone_number,company_website,user_id) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)';

        const value=[companyName,businessType, industry, country,state, city, logo,gstNumber,panNumber,address,email, phone,website,userId]; 

        const res = await pool.query(my_query, value);
        console.log (res);

        return NextResponse.json({message:"Data saved successfully"} , {status:200});
    }

    catch(err){
           console.log("this is ur error ",err);
           return NextResponse.json({message:"Something went wrong"}, {status:500});
    }
    
}