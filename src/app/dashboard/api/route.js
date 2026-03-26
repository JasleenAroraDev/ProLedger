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
    const data = await req.json();

    const {
      name,
      email,
      phonenumber,
      city,
      state,
      gstnumber,
      country,
      status,
      address,
    } = data;

    const my_query =
      'INSERT INTO customers(name,email,phone_number,city,state,gst_number,country,status,address) values($1,$2,$3,$4,$5,$6,$7,$8,$9)';

    const value = [
      name,
      email,
      phonenumber,
      city,
      state,
      gstnumber,
      country,
      status,
      address,
    ];

    const res = await pool.query(my_query, value);

    return NextResponse.json({
      message: "Data saved successfully",
      data: res,
    });

  } catch (err) {
    console.log("Error:", err);

    return NextResponse.json(
      { message: "Something went wrong", error: err.message },
      { status: 500 }
    );
  }
}