// At the top, add this import
import { pdf } from "@react-pdf/renderer";

import {useState} from 'react';

import axios from 'axios';

import InvoiceDocument from "./InvoiceDocument";

// Add this component above MyDocument
export default function SendPdfButton({ inv, items }) {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // 'sent' | 'error'

  const handleSend = async () => {
    if (!inv) return;
    setSending(true);
    setStatus(null);

    try {
      // 1. Render the PDF to a Blob
      const blob = await pdf(
        <InvoiceDocument inv={inv} items={items} />
      ).toBlob();

      // 2. Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64 = reader.result.split(",")[1]; // strip "data:application/pdf;base64,"

        // 3. Send to API route
        const res = await axios.post("/api/send_invoice_email", {
          base64Pdf: base64,
          invoiceNo: inv.invoice_no,
          partyName: inv.party_name,
          netTotal: inv.net_total,
          invoiceDate: inv.invoice_date?.split("T")[0],
          // Add party email if you have it in your data:
       //   toEmail: inv.party_email,
        });

        if (res.data.success) {
          setStatus("sent");
        } else {
          setStatus("error");
        }
        setSending(false);
      };
    } catch (err) {
      console.error(err);
      setStatus("error");
      setSending(false);
    }
  };

  return (
    <div style={{ margin: "12px 0", display: "flex", alignItems: "center", gap: 12 }}>
      <button
        onClick={handleSend}
        disabled={sending || !inv}
        style={{
          backgroundColor: sending ? "#93c5fd" : "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "10px 22px",
          fontSize: 14,
          fontWeight: 600,
          cursor: sending ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        {sending ? "Sending…" : "📧 Send Invoice PDF"}
      </button>

      {status === "sent" && (
        <span style={{ color: "#059669", fontWeight: 600 }}>✅ Email sent!</span>
      )}
      {status === "error" && (
        <span style={{ color: "#dc2626", fontWeight: 600 }}>❌ Failed to send. Check console.</span>
      )}
    </div>
  );
};