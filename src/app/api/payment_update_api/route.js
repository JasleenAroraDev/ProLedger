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
    console.log("REST", rest);

    const { id, invoice, paymentDate, paymentType, paidAmount } = rest;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // 1️⃣ Update existing payment row
        const updatePaymentQry = `
            UPDATE invoice_payment 
            SET invoice_no = $1,
                payment_date = $2,
                payment_mode = $3,
                paid_amt = $4
            WHERE id = $5
        `;
        await client.query(updatePaymentQry, [invoice, paymentDate, paymentType, paidAmount, id]);

        // 2️⃣ Recalculate total paid from DB (sum all payments for this invoice)
        const sumQry = `
            SELECT COALESCE(SUM(paid_amt), 0) AS total_paid
            FROM invoice_payment
            WHERE invoice_no = $1
        `;
        const sumRes = await client.query(sumQry, [invoice]);
        const totalPaid = Number(sumRes.rows[0].total_paid);

        // 3️⃣ Get invoice net total
        const invoiceQry = `
            SELECT net_total FROM invoice WHERE invoice_no = $1
        `;
        const invoiceRes = await client.query(invoiceQry, [invoice]);
        const netTotal = Number(invoiceRes.rows[0].net_total);

        // 4️⃣ Decide payment status
        let status = "part_paid";
        if (totalPaid <= 0) {
            status = "unpaid";
        } else if (totalPaid >= netTotal) {
            status = "paid";
        }

        // 5️⃣ Update invoice payment_status + total_paid_amt
        const updateInvoiceQry = `
            UPDATE invoice 
            SET payment_status = $1
            WHERE invoice_no = $2
        `;
        await client.query(updateInvoiceQry, [status, invoice]);

        await client.query("COMMIT");

        return NextResponse.json({
            status: 200,
            message: "Payment Updated & Status Recalculated",
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