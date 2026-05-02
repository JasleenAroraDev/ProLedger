import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { search } = body;

    console.log("Search value:", search);

    // ✅ SEARCH MODE
    if (search) {
      const qry = `
        SELECT *
        FROM invoice_payment
        WHERE LOWER(invoice_no) LIKE LOWER($1)
      `;
      const value = [`%${search}%`];

      const result = await pool.query(qry, value);

      return NextResponse.json({
        data: result.rows,
      });
    }

    // ✅ DEFAULT MODE (ALL PAYMENTS)
    const qry = `
      SELECT *
      FROM invoice_payment
      ORDER BY id DESC
    `;

    const result = await pool.query(qry);

    return NextResponse.json({
      data: result.rows,
    });
  } catch (err) {
    console.log("DB Error:", err);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}