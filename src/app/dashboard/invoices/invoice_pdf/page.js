"use client";

import {
  PDFViewer,
  StyleSheet,
  Canvas,
} from "@react-pdf/renderer";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

import InvoiceDocument from "./InvoiceDocument";
import SendPdfButton from "./SendPdfButton";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 28,
    fontFamily: "Helvetica",
  },
  topLine: {
    height: 7,
    backgroundColor: "#2563eb",
    borderRadius: 4,
    marginBottom: 18,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  companyBox: { width: "63%" },
  companyName: {
    fontSize: 27,
    fontFamily: "Helvetica-Bold",
    color: "#0f172a",
    letterSpacing: 1,
    marginBottom: 5,
  },
  tagline: {
    fontSize: 10,
    color: "#0891b2",
    fontFamily: "Helvetica-Bold",
    marginBottom: 8,
  },
  companyText: { fontSize: 8.7, color: "#475569", lineHeight: 1.45 },
  invoiceBox: {
    width: "31%",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#dbe5f0",
    borderRadius: 8,
    padding: 12,
  },
  invoiceTitle: {
    fontSize: 18,
    color: "#2563eb",
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
    marginBottom: 10,
  },
  invoiceMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  metaLabel: {
    fontSize: 8,
    color: "#64748b",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  metaValue: { fontSize: 9, color: "#0f172a", fontFamily: "Helvetica-Bold" },
  partyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },
  partyCard: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#dbe5f0",
    borderRadius: 8,
    padding: 12,
  },
  partyTitle: {
    fontSize: 9,
    color: "#2563eb",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    marginBottom: 7,
  },
  partyName: {
    fontSize: 12,
    color: "#0f172a",
    fontFamily: "Helvetica-Bold",
    marginBottom: 6,
  },
  partyText: { fontSize: 8.6, color: "#475569", lineHeight: 1.45, marginBottom: 3 },
  sectionBar: {
    backgroundColor: "#0f172a",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 11,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  table: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#dbe5f0",
    borderTopWidth: 0,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 16,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#eff6ff",
    borderBottomWidth: 1,
    borderBottomColor: "#dbe5f0",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#ffffff",
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
  },
  colNo: { width: "12%", padding: 8 },
  colDesc: { width: "38%", padding: 8 },
  colQty: { width: "12%", padding: 8, textAlign: "right" },
  colRate: { width: "17%", padding: 8, textAlign: "right" },
  colAmount: { width: "21%", padding: 8, textAlign: "right" },
  tableHeaderCell: {
    fontSize: 8.5,
    color: "#0f172a",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  tableCell: { fontSize: 9.5, color: "#334155" },
  tableCellStrong: { fontSize: 9.5, color: "#0f172a", fontFamily: "Helvetica-Bold" },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  paymentBox: {
    width: "52%",
    backgroundColor: "#ecfeff",
    borderWidth: 1,
    borderColor: "#cffafe",
    borderRadius: 8,
    padding: 11,
  },
  paymentTitle: { fontSize: 10, color: "#0e7490", fontFamily: "Helvetica-Bold", marginBottom: 5 },
  paymentText: { fontSize: 8.7, color: "#334155", lineHeight: 1.45 },
  totalsBox: {
    width: "45%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dbe5f0",
    borderRadius: 8,
    padding: 10,
  },
  totalLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  totalLabel: { fontSize: 9.5, color: "#475569" },
  totalValue: { fontSize: 9.5, color: "#0f172a", fontFamily: "Helvetica-Bold" },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
    paddingVertical: 8,
    paddingHorizontal: 9,
    backgroundColor: "#2563eb",
    borderRadius: 6,
  },
  grandLabel: { fontSize: 11, color: "#ffffff", fontFamily: "Helvetica-Bold" },
  grandValue: { fontSize: 11, color: "#ffffff", fontFamily: "Helvetica-Bold" },
  verifiedBadge: {
    backgroundColor: "#dcfce7",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  verifiedText: { color: "#059669", fontSize: 9, fontFamily: "Helvetica-Bold" },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 28,
    right: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#dbe5f0",
    paddingTop: 7,
  },
  footerText: { fontSize: 8, color: "#64748b" },
});

// ─── Inner component: uses useSearchParams ────────────────────────────────────
function MyDocumentContent() {
  const searchParams = useSearchParams();
  const inv_id = searchParams.get("id");

  const [inv, setInv] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!inv_id) return;

    const invData = async () => {
      try {
        const res = await axios.post("/api/invoice_pdf_api", { id: inv_id });
        setInv(res?.data?.invoice?.[0]);
        setItems(res?.data?.invoice_items || []);
      } catch (err) {
        console.log("This is your err", err);
      }
    };

    invData();
  }, [inv_id]);

  return (
    <>
      <SendPdfButton inv={inv} items={items} />

      <PDFViewer width="100%" height={820} style={{ border: "none" }}>
        <InvoiceDocument inv={inv} items={items} />
      </PDFViewer>
    </>
  );
}

// ─── Outer component: wraps content in Suspense ───────────────────────────────
const MyDocument = () => {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 820,
            fontSize: 16,
            color: "#64748b",
          }}
        >
          Loading invoice...
        </div>
      }
    >
      <MyDocumentContent />
    </Suspense>
  );
};

export default MyDocument;