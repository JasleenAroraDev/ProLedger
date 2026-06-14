import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

console.log("=== LOGIN API FILE LOADED ===");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Check DB connection on startup
pool
  .connect()
  .then((client) => {
    console.log("✅ Database Connected Successfully");
    client.release();
  })
  .catch((err) => {
    console.log("❌ Database Connection Error:", err);
  });

export async function POST(req) {
  console.log("=== LOGIN API HIT ===");

  try {
    // STEP 1: Request parsing
    console.log("➡️ Reading request body...");

    const data = await req.json();

    console.log("✅ Request Body:", data);

    const { email, password } = data;

    console.log("📧 Email:", email);
    console.log("🔑 Password Received:", password ? "YES" : "NO");

    // STEP 2: Validation
    if (!email || !password) {
      console.log("❌ Missing Email or Password");

      return NextResponse.json(
        { message: "Email and Password are required" },
        { status: 400 }
      );
    }

    // STEP 3: Check DATABASE_URL
    console.log(
      "🌍 DATABASE_URL Exists:",
      process.env.DATABASE_URL ? "YES" : "NO"
    );

    // STEP 4: Query execution
    const my_query =
      "select id, full_name, password from users where email=$1";

    const value = [email];

    console.log("🛠 Executing Query...");
    console.log("Query:", my_query);
    console.log("Values:", value);

    const res_query = await pool.query(my_query, value);

    console.log("✅ Query Executed Successfully");
    console.log("📦 Query Result:", res_query.rows);

    // STEP 5: User exists or not
    if (res_query.rows.length === 0) {
      console.log("❌ No user found with this email");

      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // STEP 6: Fetch data
    const fetched_id = res_query.rows[0].id;

    const fetched_full_name = res_query.rows[0].full_name;

    const fetched_password = res_query.rows[0].password;

    console.log("🆔 User ID:", fetched_id);
    console.log("👤 Full Name:", fetched_full_name);
    console.log("🔒 Hashed Password:", fetched_password);

    // STEP 7: Password compare
    console.log("🔍 Comparing Passwords...");

    const isMatch = await bcrypt.compare(password, fetched_password);

    console.log("✅ Password Match Result:", isMatch);

    // STEP 8: Invalid password
    if (!isMatch) {
      console.log("❌ Invalid Password");

      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 401 }
      );
    }

    // STEP 9: JWT payload
    const payload = {
      id: fetched_id,
      name: fetched_full_name,
      email: email,
    };

    console.log("📦 JWT Payload:", payload);

    // STEP 10: JWT Secret
    const secret = process.env.JWT_SECRET;

    console.log("🔑 JWT_SECRET Exists:", secret ? "YES" : "NO");

    if (!secret) {
      console.log("❌ JWT_SECRET Missing");

      return NextResponse.json(
        { message: "JWT Secret Missing" },
        { status: 500 }
      );
    }

    // STEP 11: Token generation
    console.log("🛠 Generating JWT Token...");

    const expireTime = {
      expiresIn: "30d",
    };

    const token = jwt.sign(payload, secret, expireTime);

    console.log("✅ Token Generated Successfully");
    console.log("🎫 Token:", token);

    // STEP 12: Final response
    console.log("🚀 Sending Success Response");

    return NextResponse.json(
      {
        generatedToken: token,
        message: "Login Successful",
      },
      { status: 200 }
    );
  } catch (err) {
    console.log("❌ SERVER ERROR OCCURRED");
    console.log("Error Name:", err?.name);
    console.log("Error Message:", err?.message);
    console.log("Full Error:", err);

    return NextResponse.json(
      {
        message: "Server error",
        error: err?.message,
      },
      { status: 500 }
    );
  }
}