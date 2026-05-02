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

         const total_query= 'select sum(gross_total) as total_sales from invoice where user_id=$1';
            const total_value=[userId];

            const res= await pool.query(total_query,total_value);

             const totalSales = res.rows[0].total_sales;
             console.log("Total sales",totalSales);


             const total_cust = 'SELECT COUNT(*) AS total_customers FROM invoice WHERE user_id = $1';
             const total_cust_value= [userId];
             const res_cust= await pool.query(total_cust,total_cust_value);

             const totalCust= res_cust.rows[0].total_customers;
             console.log("Total Customers", totalCust);  



         const reve_query= 'select sum(net_total) as total_revenue from invoice where user_id=$1';
            const reve_value=[userId];

            const reve_res= await pool.query(reve_query,reve_value);

             const totalReve = reve_res.rows[0].total_revenue;
             console.log("Total Revenue",totalReve);


             const active_query= 'select count(*) as active_users from customers where user_id=$1';
             const active_value= [userId];

             const active_res= await pool.query(active_query,active_value);
            const Active = active_res.rows[0].active_users;
             console.log("Active Users",Active);


              const inactive_query= 'select count(*) as inactive_users from customers where user_id=$1';
             const inactive_value= [userId];

             const inactive_res= await pool.query(inactive_query,inactive_value);
            const inActive = inactive_res.rows[0].inactive_users;
             console.log("InActive Users",inActive);

  const sales_query = `SELECT TO_CHAR(date_trunc('month', invoice_date), 'Mon YYYY') AS month,SUM(gross_total) AS total FROM invoice WHERE user_id = $1 AND invoice_date >= date_trunc('month', CURRENT_DATE) - INTERVAL '5 months' AND invoice_date < date_trunc('month', CURRENT_DATE) + INTERVAL '1 month' GROUP BY date_trunc('month', invoice_date)ORDER BY date_trunc('month', invoice_date);`;

  const sales_value = [userId];

  const sales_res= await pool.query(sales_query,sales_value);

  const sales= sales_res.rows;

  console.log("Month Wise Total Sales",sales);





            return NextResponse.json({status:200,valid : true,totalSale: totalSales, totalCustomers : totalCust, totalRevenue: totalReve, Active_user: Active, inActive_user : inActive , sale_overview : sales});

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



