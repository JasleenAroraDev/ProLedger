"use client";

import { Document, Page, View, Text, StyleSheet, Canvas } from "@react-pdf/renderer";

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
  companyBox: {
    width: "63%",
  },
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
  companyText: {
    fontSize: 8.7,
    color: "#475569",
    lineHeight: 1.45,
  },

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
  metaValue: {
    fontSize: 9,
    color: "#0f172a",
    fontFamily: "Helvetica-Bold",
  },

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
  partyText: {
    fontSize: 8.6,
    color: "#475569",
    lineHeight: 1.45,
    marginBottom: 3,
  },

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
  tableCell: {
    fontSize: 9.5,
    color: "#334155",
  },
  tableCellStrong: {
    fontSize: 9.5,
    color: "#0f172a",
    fontFamily: "Helvetica-Bold",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  paymentBox: {
    width: "52%",
    backgroundColor: "#ecfeff",
    borderWidth: 1,
    borderColor: "#cffafe",
    borderRadius: 8,
    padding: 11,
  },
  paymentTitle: {
    fontSize: 10,
    color: "#0e7490",
    fontFamily: "Helvetica-Bold",
    marginBottom: 5,
  },
  paymentText: {
    fontSize: 8.7,
    color: "#334155",
    lineHeight: 1.45,
  },
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
  totalLabel: {
    fontSize: 9.5,
    color: "#475569",
  },
  totalValue: {
    fontSize: 9.5,
    color: "#0f172a",
    fontFamily: "Helvetica-Bold",
  },
  grandTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
    paddingVertical: 8,
    paddingHorizontal: 9,
    backgroundColor: "#2563eb",
    borderRadius: 6,
  },
  grandLabel: {
    fontSize: 11,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
  },
  grandValue: {
    fontSize: 11,
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
  },

  verifiedBadge: {
    backgroundColor: "#dcfce7",
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  verifiedText: {
    color: "#059669",
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },

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
  footerText: {
    fontSize: 8,
    color: "#64748b",
  },
});

const InvoiceDocument = ({ inv, items }) => (
  <Document
    title="ProLedger Invoice"
    author="Jass Arora"
    subject="Invoice"
    creator="ProLedger"
    producer="@react-pdf/renderer"
  >
    <Page size="A4" style={styles.page}>
      <View style={styles.topLine} />

      <View style={styles.headerRow}>
        <View style={styles.companyBox}>
          <Text style={styles.companyName}>
            {process.env.NEXT_PUBLIC_COMP_NAME}
          </Text>
          <Text style={styles.tagline}>
            {process.env.NEXT_PUBLIC_TAGLINE}
          </Text>
          <Text style={styles.companyText}>
            {process.env.NEXT_PUBLIC_COMP_ADDRESS},{" "}
            {process.env.NEXT_PUBLIC_COMP_CITY},{" "}
            {process.env.NEXT_PUBLIC_COMP_STATE},{" "}
            {process.env.NEXT_PUBLIC_COMP_PINCODE}
          </Text>
          <Text style={styles.companyText}>
            GSTIN: {process.env.NEXT_PUBLIC_COMP_GSTIN} | PAN:{" "}
            {process.env.NEXT_PUBLIC_COMP_PAN}
          </Text>
          <Text style={styles.companyText}>
            Phone: {process.env.NEXT_PUBLIC_COMP_PHONE} | Email:{" "}
            {process.env.NEXT_PUBLIC_COMP_EMAIL}
          </Text>
        </View>

        <View style={styles.invoiceBox}>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <View style={styles.invoiceMetaRow}>
            <Text style={styles.metaLabel}>No</Text>
            <Text style={styles.metaValue}>#{inv?.invoice_no}</Text>
          </View>
          <View style={styles.invoiceMetaRow}>
            <Text style={styles.metaLabel}>Date</Text>
            <Text style={styles.metaValue}>
              {inv?.invoice_date?.split("T")[0]}
            </Text>
          </View>
          <View style={styles.invoiceMetaRow}>
            <Text style={styles.metaLabel}>Type</Text>
            <Text style={styles.metaValue}>{inv?.invoice_type}</Text>
          </View>
        </View>
      </View>

      <View style={styles.partyRow}>
        <View style={styles.partyCard}>
          <Text style={styles.partyTitle}>Billed To</Text>
          <Text style={styles.partyName}>{inv?.party_name}</Text>
          <Text style={styles.partyText}>GSTIN: {inv?.gst_no}</Text>
          <Text style={styles.partyText}>PAN: {inv?.pan_no}</Text>
        </View>

        <View style={styles.partyCard}>
          <Text style={styles.partyTitle}>Billed From</Text>
          <Text style={styles.partyName}>
            {process.env.NEXT_PUBLIC_COMP_NAME}
          </Text>
          <Text style={styles.partyText}>
            {process.env.NEXT_PUBLIC_COMP_ADDRESS},{" "}
            {process.env.NEXT_PUBLIC_COMP_CITY},{" "}
            {process.env.NEXT_PUBLIC_COMP_STATE}
          </Text>
          <Text style={styles.partyText}>
            GSTIN: {process.env.NEXT_PUBLIC_COMP_GSTIN}
          </Text>
          <Text style={styles.partyText}>
            PAN: {process.env.NEXT_PUBLIC_COMP_PAN}
          </Text>
        </View>
      </View>

      <View style={styles.sectionBar}>
        <Text style={styles.sectionTitle}>Invoice Items</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeaderRow}>
          <View style={styles.colNo}>
            <Text style={styles.tableHeaderCell}>Item ID</Text>
          </View>
          <View style={styles.colDesc}>
            <Text style={styles.tableHeaderCell}>Item Name</Text>
          </View>
          <View style={styles.colQty}>
            <Text style={[styles.tableHeaderCell, { textAlign: "right" }]}>
              Qty
            </Text>
          </View>
          <View style={styles.colRate}>
            <Text style={[styles.tableHeaderCell, { textAlign: "right" }]}>
              Rate
            </Text>
          </View>
          <View style={styles.colAmount}>
            <Text style={[styles.tableHeaderCell, { textAlign: "right" }]}>
              Amount
            </Text>
          </View>
        </View>

        {(items || []).map((item, idx) => (
          <View
            key={idx}
            style={idx % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
          >
            <View style={styles.colNo}>
              <Text style={styles.tableCell}>{item?.id}</Text>
            </View>
            <View style={styles.colDesc}>
              <Text style={styles.tableCellStrong}>{item?.item_name}</Text>
            </View>
            <View style={styles.colQty}>
              <Text style={[styles.tableCell, { textAlign: "right" }]}>
                {item?.item_qty}
              </Text>
            </View>
            <View style={styles.colRate}>
              <Text style={[styles.tableCell, { textAlign: "right" }]}>
                {item?.item_price}
              </Text>
            </View>
            <View style={styles.colAmount}>
              <Text style={[styles.tableCellStrong, { textAlign: "right" }]}>
                {item?.final_amt}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.summaryRow}>
        <View style={styles.paymentBox}>
          <Text style={styles.paymentTitle}>Payment Note</Text>
          <Text style={styles.paymentText}>
            This invoice is generated from ProLedger ERP. Please verify
            billing, GST, and payment details before processing.
          </Text>
        </View>

        <View style={styles.totalsBox}>
          <View style={styles.totalLine}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{inv?.gross_total}</Text>
          </View>
          <View style={styles.totalLine}>
            <Text style={styles.totalLabel}>Discount</Text>
            <Text style={styles.totalValue}>{inv?.discount}</Text>
          </View>

          {inv?.cgst_pers > 0 && (
            <View style={styles.totalLine}>
              <Text style={styles.totalLabel}>CGST {inv?.cgst_pers}%</Text>
              <Text style={styles.totalValue}>{inv?.cgst_amt}</Text>
            </View>
          )}
          {inv?.sgst_pers > 0 && (
            <View style={styles.totalLine}>
              <Text style={styles.totalLabel}>SGST {inv?.sgst_pers}%</Text>
              <Text style={styles.totalValue}>{inv?.sgst_amt}</Text>
            </View>
          )}
          {inv?.igst_pers > 0 && (
            <View style={styles.totalLine}>
              <Text style={styles.totalLabel}>IGST {inv?.igst_pers}%</Text>
              <Text style={styles.totalValue}>{inv?.igst_amt}</Text>
            </View>
          )}

          <View style={styles.grandTotal}>
            <Text style={styles.grandLabel}>Grand Total</Text>
            <Text style={styles.grandValue}>{inv?.net_total}</Text>
          </View>
        </View>
      </View>

      <View style={styles.verifiedBadge}>
        <Text style={styles.verifiedText}>
          {process.env.NEXT_PUBLIC_VERIFIED}
        </Text>
      </View>

      <Canvas
        style={{ height: 28, marginTop: 6 }}
        paint={(painter, availableWidth) => {
          painter
            .save()
            .moveTo(0, 14)
            .lineTo(availableWidth, 14)
            .dash(4, { space: 4 })
            .strokeColor("#cbd5e1")
            .stroke()
            .restore();
        }}
      />

      <View style={styles.footer} fixed>
        <Text style={styles.footerText}>
          {process.env.NEXT_PUBLIC_COMP_NAME} —{" "}
          {process.env.NEXT_PUBLIC_COMP_CITY},{" "}
          {process.env.NEXT_PUBLIC_COMP_STATE}
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
);

export default InvoiceDocument;