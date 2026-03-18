import { CssBaseline } from "@mui/material";

export const metadata = {
  title: "ProLedger ERP",
  description: "ERP Based Billing & Accounting System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        {children}
      </body>
    </html>
  );
}