"use client";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  Image,
  Link,
  StyleSheet,
  Font,
  Canvas,
  Note,
} from "@react-pdf/renderer";

import React, { useEffect,useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from 'axios';


// Create styles
const styles = StyleSheet.create({
 page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Helvetica",
  },
 
  // ── Header section ──────────────────────────────────────────────────────────
  headerView: {
    backgroundColor: "#1a237e",
    padding: 16,
    borderRadius: 6,
    marginBottom: 16,
    alignItems: "center",
    height : "15%",
  },
  headerText: {
    color: "#ffffff",
    fontSize: 28,
    fontFamily: "Helvetica-Bold",
    letterSpacing: 2,
  },
  subHeaderText: {
    color: "#90caf9",
    fontSize: 11,
    marginTop: 4,

  },
 
  // ── Info row ────────────────────────────────────────────────────────────────
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 4,
  },
  infoBlock: {
    flexDirection: "column",
    flex: 1,
     marginBottom: 10,
  },
  infoLabel: {
    fontSize: 9,
    color: "#757575",
    marginBottom: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 11,
    color: "#212121",
     marginBottom: 10,
  },
 
  // ── Section title ───────────────────────────────────────────────────────────
  sectionTitle: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    color: "#1a237e",
    marginBottom: 6,
    borderBottomWidth: 1.5,
    borderBottomColor: "#1a237e",
    paddingBottom: 3,
  },
 
  // ── Table ───────────────────────────────────────────────────────────────────
  table: {
    width: "100%",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#bdbdbd",
    borderRadius: 4,
    overflow: "hidden",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#1a237e",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#f3f4fb",
  },
  tableRowLast: {
    flexDirection: "row",
  },
 
  // Column widths
  colNo: { width: "7%", padding: 7 },
  colDesc: { width: "38%", padding: 7 },
  colQty: { width: "10%", padding: 7, textAlign: "right" },
  colRate: { width: "15%", padding: 7, textAlign: "right" },
  colAmount: { width: "18%", padding: 7, textAlign: "right" },
 
  tableHeaderCell: {
    fontSize: 9,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
  },
  tableCell: {
    fontSize: 10,
    color: "#212121",
  },
  tableCellMuted: {
    fontSize: 9,
    color: "#757575",
    marginTop: 2,
     marginBottom: 10,
  

  },
 
  // ── Totals block ────────────────────────────────────────────────────────────
  totalsBlock: {
    alignSelf: "flex-end",
    width: 200,
    marginBottom: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  totalRowFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    backgroundColor: "#1a237e",
    paddingHorizontal: 6,
    borderRadius: 3,
    marginTop: 2,
  },
  totalLabel: { fontSize: 10, color: "#424242" },
  totalValue: { fontSize: 10, color: "#212121" },
  totalLabelFinal: { fontSize: 11, color: "#ffffff", fontFamily: "Helvetica-Bold" },
  totalValueFinal: { fontSize: 11, color: "#ffffff", fontFamily: "Helvetica-Bold" },
 
  // ── Notes / Link ─────────────────────────────────────────────────────────── 
  notesView: {
    backgroundColor: "#fff8e1",
    borderLeftWidth: 3,
    borderLeftColor: "#ffc107",
    padding: 10,
    marginBottom: 14,
    borderRadius: 3,
  },
  notesTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginBottom: 3,
    color: "#f57f17",
  },
  notesText: {
    fontSize: 10,
    color: "#555555",
    lineHeight: 1.5,
  },
  linkText: {
    fontSize: 10,
    color: "#1565c0",
    textDecoration: "underline",
  },
 
  // ── Footer ───────────────────────────────────────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 6,
  },
  footerText: {
    fontSize: 8,
    color: "#9e9e9e",
  },
 
  // ── Badge ────────────────────────────────────────────────────────────────────
  badge: {
    backgroundColor: "#e8f5e9",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  badgeText: {
    color: "#2e7d32",
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const invoiceItems = [
  // { no: "01", desc: "Website Design", note: "UI/UX mockups & prototypes", qty: 1, rate: 45000,  },
  // { no: "02", desc: "Frontend Development", note: "React + Tailwind", qty: 3, rate: 25000,  },
  // { no: "03", desc: "Backend API", note: "Node.js REST API", qty: 2, rate: 30000,  },
  // { no: "04", desc: "Database Setup", note: "PostgreSQL schema", qty: 1, rate: 15000,  },
  // { no: "05", desc: "Deployment & DevOps", note: "AWS EC2 + CI/CD", qty: 1, rate: 20000, },
];
 
const fmt = (n) => `₹${n.toLocaleString("en-IN")}`;
 
const subtotal = invoiceItems.reduce((s, i) => s + i.qty * i.rate, 0);
const taxTotal = invoiceItems.reduce((s, i) => s + (i.qty * i.rate * i.tax) / 100, 0);


const grandTotal = subtotal + taxTotal;


// Create Document Component
const MyDocument = () => {
  const searchParams = useSearchParams();
  const inv_id = searchParams.get("id");

  const [id, setId] = useState();
  const [inv, setInv] = useState([]);
  const [items, setItems] = useState([]);

  console.log("my recieved id is ", inv_id);

  useEffect(() => {
    setId(inv_id);

    if (!inv_id) return;


    const invData = async () => {
      try {
        console.log("im under call");
        const res = await axios.post("/api/invoice_pdf_api", { id: inv_id });

        console.log("This is my res", res.data.invoice);
        console.log("This is my items res", res.data.invoice_items);

        setInv(res?.data?.invoice[0]);
        setItems(res?.data?.invoice_items);


      } catch (err) {
        console.log("This is your err", err);
      }
    };

    invData();
  }, [id]);

  return (
    <PDFViewer width="100%" height={820} style={{ border: "none" }}>
      <Document
        title="ProLedger Invoice"
        author="Jass Arora"
        subject="Invoice INV-2024-042"
        creator="ProLedger"
        producer="@react-pdf/renderer"
      >
        <Page size="A4" style={styles.page}>
          <View style={styles.headerView}>
            <Text style={styles.headerText}>ProLedger</Text>
            <Text style={styles.subHeaderText}>
              Smart Accounting for Modern Businesses
            </Text>
            <View style={styles.infoBlock}>
              <Text style={styles.tableCellMuted}>
                From: ProLedger Solutions, Chandigarh, India
              </Text>
              <Text style={styles.tableCellMuted}>
                (GSTIN: 04BBBPZ5678B2Z1)
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Invoice No</Text>
              <Text style={styles.infoValue}>{inv?.invoice_no}</Text>
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Date</Text>
              <Text style={styles.infoValue}>{inv?.invoice_date}</Text>
            </View>

            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Status</Text>
              <Text
                style={[
                  styles.infoValue,
                  { color: "#2e7d32", fontFamily: "Helvetica-Bold" },
                ]}
              >
                UNPAID
              </Text>
            </View>
          </View>

          <View style={[styles.infoRow, { marginBottom: 16 }]}>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Billed To</Text>
              <Text style={styles.infoValue}>{inv?.party_name}</Text>
              <Text style={styles.tableCellMuted}>GSTIN : {inv?.gst_no}</Text>
              <Text style={styles.tableCellMuted}>PAN : {inv?.pan_no}</Text>
             
            </View>
            <View style={styles.infoBlock}>
              <Text style={styles.infoLabel}>Billed From</Text>
              <Text style={styles.infoValue}>{process.env.NEXT_PUBLIC_COMP_NAME}</Text>
              <Text style={styles.tableCellMuted}>{process.env.NEXT_PUBLIC_COMP_ADDRESS}, {process.env.NEXT_PUBLIC_COMP_CITY} , {process.env.NEXT_PUBLIC_COMP_STATE} , {process.env.NEXT_PUBLIC_COMP_PINCODE}</Text>
              <Text style={styles.tableCellMuted}>PHONE : {process.env.NEXT_PUBLIC_COMP_PHONE} , EMAIL : {process.env.NEXT_PUBLIC_COMP_EMAIL}</Text>
              <Text style={styles.tableCellMuted}>GSTIN : {process.env.NEXT_PUBLIC_COMP_GSTIN}</Text>
               <Text style={styles.tableCellMuted}>PAN : {process.env.NEXT_PUBLIC_COMP_PAN}</Text>
          
            </View>
          </View>

          <Text style={styles.sectionTitle}>Invoice Items</Text>

          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <View style={styles.colNo}>
                <Text style={styles.tableHeaderCell}>Item Id</Text>
              </View>
              <View style={styles.colDesc}>
                <Text style={styles.tableHeaderCell}>Item Name</Text>
              </View>
              <View style={styles.colQty}>
                <Text
                  style={[styles.tableHeaderCell, { textAlign: "right" }]}
                >
                  Qty
                </Text>
              </View>
              <View style={styles.colRate}>
                <Text
                  style={[styles.tableHeaderCell, { textAlign: "right" }]}
                >
                  Rate
                </Text>
              </View>
              <View style={styles.colAmount}>
                <Text
                  style={[styles.tableHeaderCell, { textAlign: "right" }]}
                >
                  Amount
                </Text>
              </View>
            </View>

            {items.map((item, idx) => {
              const isLast = idx === items.length - 1;

              const rowStyle = isLast
                ? styles.tableRowLast
                : idx % 2 === 0
                ? styles.tableRow
                : styles.tableRowAlt;

              const amount = items.qty * item.item_price;

              return (
                <View key={idx} style={rowStyle}>
                  <View style={styles.colNo}>
                    <Text style={styles.tableCell}>
                      {item?.id}
                    </Text>
                  </View>

                  <View style={styles.colDesc}>
                    <Text style={styles.tableCell}>
                      {item?.item_name}
                    </Text>
                  </View>

                  <View style={styles.colQty}>
                    <Text
                      style={[styles.tableCell, { textAlign: "right" }]}
                    >
                      {item?.item_qty}
                    </Text>
                  </View>

                  <View style={styles.colRate}>
                    <Text
                      style={[styles.tableCell, { textAlign: "right" }]}
                    >
                      {item?.item_price}
                    </Text>
                  </View>

                  <View style={styles.colAmount}>
                    <Text
                      style={[styles.tableCell, { textAlign: "right" }]}
                    >
                      {item?.final_amt}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.totalsBlock}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal</Text>
              <Text style={styles.totalValue}>
                {inv?.gross_total}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Discount</Text>
              <Text style={styles.totalValue}>
                {inv?.discount}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>CGST(9%)</Text>
              <Text style={styles.totalValue}>
                {inv?.cgst_amt}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>SGST (9%)</Text>
              <Text style={styles.totalValue}>
                {inv?.sgst_amt}
              </Text>
            </View>

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>IGST (18%)</Text>
              <Text style={styles.totalValue}>
                {inv?.igst_amt}
              </Text>
            </View>

            <View style={styles.totalRowFinal}>
              <Text style={styles.totalLabelFinal}>
                Grand Total
              </Text>
              <Text style={styles.totalValueFinal}>
                {inv?.net_total}
              </Text>
            </View>
          </View>

          {/* ── Badge ── */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              ✓ Digitally Verified — ProLedger
            </Text>
          </View>

          <Canvas
            style={{ height: 30, marginBottom: 10 }}
            paint={(painter, availableWidth) => {
              painter
                .save()
                .moveTo(0, 15)
                .lineTo(availableWidth, 15)
                .dash(4, { space: 4 })
                .strokeColor("#bdbdbd")
                .stroke()
                .restore();
            }}
          />

          <View style={styles.footer} fixed>
            <Text style={styles.footerText}>
              ProLedger Solutions — Chandigarh, India
            </Text>

            <Text
              style={styles.footerText}
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
              }
            />
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
export default MyDocument;