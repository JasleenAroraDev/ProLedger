import { NextResponse} from "next/server";
import {Pool} from 'pg';

const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized: false,
  }
})

export async function POST(req){

   // console.log("Received request is ",req);
     


  try{

  const qry = "SELECT COUNT(*) AS total_customers FROM customers";
      const res_cust=  await pool.query(qry);

  const qry1 = "SELECT COUNT(*) AS total_invoices FROM invoice";
    const res_inv=  await pool.query(qry1);

 const qry2= 'SELECT COUNT(*) AS total_items FROM items';
 const res_item=  await pool.query(qry2);

 const qry3= 'SELECT COUNT(*) AS total_users FROM users';
  const res_user=  await pool.query(qry3);

const qry4 = 'SELECT COUNT(*) AS total_vendors FROM vendors';
 const res_ven=  await pool.query(qry4);

    console.log("MY RES CUSTOMER",res_cust.rows);
    console.log("MY RES INVOICE",res_inv.rows);
console.log("MY RES ITEMS",res_item.rows);
     console.log("MY RES USERS",res_user.rows);
     console.log("MY RES VENDORS",res_ven.rows);


           
      return NextResponse.json({messege: "Data saved successfully " , status : 200, data_cust: res_cust.rows, data_inv: res_inv.rows,data_item: res_item.rows, data_user: res_user.rows, data_ven: res_ven.rows});
    }
  

  catch(err){

    return NextResponse.json({messege: "Something went wrong"}, {status : 500});
    
  }

}