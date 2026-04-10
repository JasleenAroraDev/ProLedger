import {NextResponse} from "next/server";
import {Pool} from 'pg';

const pool = new Pool({
  connectionString:process.env.DATABASE_URL,
  ssl:{
    rejectUnauthorized:false,
  }

})


export async function POST(req){

    const rest = await req.json();
    const{id}= rest;
  //  console.log("my id is ",id);

      const client = await pool.connect();

      try{
          await client.query("Begin");

          const my_query = 'select * from invoice where id=$1';
          const value = [id];

          const result= await client.query(my_query,value);
       //   console.log("Invoice Result",result);

          const qry = 'select * from invoice_items where invoice_id=$1';
          const qry_value = [id];

          const qry_res = await client.query(qry,qry_value);

        //  console.log("Invoice Items Result",qry_res);
            await client.query("commit");

            return NextResponse.json({invoice : result.rows, invoice_items : qry_res.rows},{status:200});


          
      }

      catch(err){
          client.query("Rollback");
        console.log("this is ur error ",err);

        return NextResponse.json({messege: "Something went wrong"},{status:500});
      }
       finally{
        client.query("release");
    }
}