import {NextResponse} from "next/server";
import {Pool} from 'pg';


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:{
        rejectUnauthorized: false,
    }
})

export async function POST(req){
    const rest = await req.json();
    const { userId } = rest;

    try {
        const qry = `
          SELECT 
            i.*, 
            COALESCE(SUM(ip.paid_amt), 0) AS total_paid_amt
          FROM invoice i
          LEFT JOIN invoice_payment ip 
            ON i.invoice_no = ip.invoice_no
          WHERE i.user_id = $1
          GROUP BY i.id
        `;

        const qry_value = [userId];
        const qry_res = await pool.query(qry, qry_value);

        return NextResponse.json({ status: 200, data: qry_res.rows });

    } catch (err) {
        console.log("This is my error", err);
        return NextResponse.json({ message: "Database error" }, { status: 500 });
    }
}