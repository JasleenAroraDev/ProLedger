// app/api/send_invoice_email/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    base64Pdf,
    invoiceNo,
    partyName,
    netTotal,
    invoiceDate,
    toEmail, // pass party email from frontend, or hardcode below
  } = await req.json();

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const FROM_EMAIL = process.env.BREVO_FROM_EMAIL;
  const FROM_NAME = process.env.BREVO_FROM_NAME;

  const payload = {
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: [
      {
      //  email: toEmail || "", // replace with dynamic party email
      email:'jasleen0469@gmail.com',
        name: partyName,
      },
    ],
    subject: `Invoice #${invoiceNo} from ${FROM_NAME}`,
    htmlContent: `
      <div style="font-family: sans-serif; max-width: 600px;">
        <h2 style="color: #2563eb;">Invoice #${invoiceNo}</h2>
        <p>Dear <strong>${partyName}</strong>,</p>
        <p>Please find your invoice attached for <strong>₹${netTotal}</strong> dated <strong>${invoiceDate}</strong>.</p>
        <p>Thank you for your business.</p>
        <br/>
        <p style="color: #64748b; font-size: 12px;">${FROM_NAME}</p>
      </div>
    `,
    attachment: [
      {
        content: base64Pdf,
        name: `Invoice-${invoiceNo}.pdf`,
      },
    ],
  };

  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      console.error("Brevo error:", err);
      return NextResponse.json({ success: false, error: err }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send email error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}