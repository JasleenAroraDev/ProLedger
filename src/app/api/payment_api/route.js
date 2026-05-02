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
     console.log("REST",rest);

     const{invoice,paymentDate,paymentType,paidAmount, paidAmountReadOnly, payableAmount, totalAmount}=rest;

       const client = await pool.connect();


try {
  await client.query("BEGIN");

  // 1️⃣ Insert Payment
  const insertQry = `
    INSERT INTO invoice_payment 
    (invoice_no, payment_date, payment_mode, paid_amt) 
    VALUES ($1, $2, $3, $4)
  `;
  await client.query(insertQry, [invoice, paymentDate, paymentType, paidAmount]);

  // 2️⃣ Get total paid from DB (IMPORTANT)
  const sumQry = `
    SELECT COALESCE(SUM(paid_amt), 0) AS total_paid
    FROM invoice_payment
    WHERE invoice_no = $1
  `;
  const sumRes = await client.query(sumQry, [invoice]);
  const totalPaid = Number(sumRes.rows[0].total_paid);

  // 3️⃣ Get invoice total
  const invoiceQry = `
    SELECT net_total FROM invoice WHERE invoice_no = $1
  `;
  const invoiceRes = await client.query(invoiceQry, [invoice]);
  const netTotal = Number(invoiceRes.rows[0].net_total);

  // 4️⃣ Decide payment status
  let status = "part_paid";

  if (totalPaid >= netTotal) {
    status = "paid";
  }

  // 5️⃣ Update invoice table
  const updateQry = `
    UPDATE invoice 
    SET payment_status = $1 
    WHERE invoice_no = $2
  `;
  await client.query(updateQry, [status, invoice]);

  await client.query("COMMIT");

  return NextResponse.json({
    status: 200,
    message: "Payment Saved & Status Updated",
  });

} catch (err) {
  await client.query("ROLLBACK");
  console.log("This is my error", err);

  return NextResponse.json(
    { message: "Something Went wrong" },
    { status: 500 }
  );
} finally {
  client.release();
}
}