"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  InputAdornment,
  TextField,
  Dialog,
  DialogContent,
  DialogTitle,
  Avatar,
  LinearProgress,
  Tooltip,
  Divider,
  alpha,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Stack,
  Fade,
  Slide,
} from "@mui/material";
import {
  Inventory2Outlined,
  WarningAmberRounded,
  QrCodeScannerRounded,
  SearchRounded,
  CloseRounded,
  CheckCircleOutlineRounded,
  ErrorOutlineRounded,
  FilterListRounded,
  DownloadRounded,
  AddRounded,
  SpeedOutlined,
  CameraAltOutlined,
} from "@mui/icons-material";
import axios from "axios";

// ─── Theme ────────────────────────────────────────────────────────────────────
const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1565C0" },
    secondary: { main: "#FF6B35" },
    success: { main: "#2E7D32" },
    warning: { main: "#F57C00" },
    error: { main: "#C62828" },
    background: { default: "#F0F4F8", paper: "#FFFFFF" },
    text: { primary: "#1A2B3C", secondary: "#5A7A96" },
  },
  typography: {
    fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    h4: { fontWeight: 700, letterSpacing: "-0.5px" },
    h6: { fontWeight: 600 },
    body2: { fontFamily: "'IBM Plex Sans', sans-serif" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: "1px solid rgba(21,101,192,0.1)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: "#EEF3F9",
          color: "#5A7A96",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          borderBottom: "1px solid rgba(21,101,192,0.1)",
          fontFamily: "'IBM Plex Mono', monospace",
        },
        body: {
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          fontFamily: "'IBM Plex Sans', sans-serif",
        },
      },
    },
  },
});

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, accent, progress }) {
  return (
    <Card
      sx={{
        background: `linear-gradient(135deg, ${alpha(accent, 0.08)} 0%, #FFFFFF 100%)`,
        border: `1px solid ${alpha(accent, 0.2)}`,
        position: "relative",
        overflow: "hidden",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: `0 12px 40px ${alpha(accent, 0.18)}`,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -30,
          right: -30,
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: alpha(accent, 0.12),
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />
      <CardContent sx={{ p: "20px !important" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontSize: "0.68rem",
              }}
            >
              {label}
            </Typography>
            <Typography
              variant="h4"
              sx={{ color: accent, mt: 0.5, fontWeight: 800, lineHeight: 1 }}
            >
              {value}
            </Typography>
            {sub && (
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", mt: 0.5, display: "block" }}
              >
                {sub}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: alpha(accent, 0.15), color: accent, width: 44, height: 44 }}>
            {icon}
          </Avatar>
        </Stack>
        {progress !== undefined && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 4,
                borderRadius: 2,
                bgcolor: alpha(accent, 0.1),
                "& .MuiLinearProgress-bar": { bgcolor: accent, borderRadius: 2 },
              }}
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Stock Badge ──────────────────────────────────────────────────────────────
function StockBadge({ stock, reorder }) {
  if (stock === 0)
    return (
      <Chip
        label="Out of Stock"
        size="small"
        sx={{ bgcolor: "#FDECEA", color: "#C62828", fontWeight: 600, fontSize: "0.68rem" }}
      />
    );
  if (reorder && stock <= reorder)
    return (
      <Chip
        label="Low Stock"
        size="small"
        sx={{ bgcolor: "#FFF3E0", color: "#E65100", fontWeight: 600, fontSize: "0.68rem" }}
      />
    );
  return (
    <Chip
      label="In Stock"
      size="small"
      sx={{ bgcolor: "#E8F5E9", color: "#2E7D32", fontWeight: 600, fontSize: "0.68rem" }}
    />
  );
}

// ─── Scanner Dialog ───────────────────────────────────────────────────────────
function ScannerDialog({ open, onClose, inventory, onProductUpdated }) {
  const inputRef = useRef(null);
  const [scannedItems, setScannedItems] = useState([]);
  const [manualCode, setManualCode] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanLine, setScanLine] = useState(0);
  const intervalRef = useRef(null);

  // ── FIX 1: Use != null so falsy values like 0 are kept ──────────────────────
  const normalizeCode = (value) => String(value ?? "").trim().toLowerCase();

  const productLookupMap = useMemo(() => {
    return Object.fromEntries(
      (inventory || []).flatMap((p) =>
        [p.item_barcode, p.p_id]
          // FIX: was .filter(Boolean) which drops 0 — now only drops null/undefined/""
          .filter((code) => code != null && code !== "")
          .map((code) => [normalizeCode(code), p])
      )
    );
  }, [inventory]);

  // Sample hint codes — barcode preferred, fall back to p_id
  const hintBarcodes = (inventory || [])
    .map((p) => p.item_barcode || p.p_id)
    .filter((code) => code != null && code !== "")
    .slice(0, 3);

  useEffect(() => {
    if (open && !result && !scanning) {
      intervalRef.current = setInterval(() => {
        setScanLine((p) => (p >= 100 ? 0 : p + 1.4));
      }, 16);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [open, result, scanning]);

  useEffect(() => {
    if (!open) {
      setResult(null);
      setNotFound(false);
      setManualCode("");
      setScanLine(0);
      setScannedItems([]);
    }
  }, [open]);

  const handleLookup = useCallback(
    async (code) => {
      const lookupCode = normalizeCode(code);
      if (!lookupCode || scanning) return;

      clearInterval(intervalRef.current);
      setScanning(true);
      setNotFound(false);

      const found = productLookupMap[lookupCode];


      console.log("=== SCAN DEBUG ===");
console.log("Input code:", code);
console.log("Normalized lookup key:", lookupCode);
console.log("All map keys:", Object.keys(productLookupMap));
console.log("Found:", productLookupMap[lookupCode]);


      // ── FIX 2: Check !found (not !found?.p_id) — p_id could be 0 ────────────
      if (!found) {
        setNotFound(true);
        setScanning(false);
        setManualCode("");
        setTimeout(() => inputRef.current?.focus(), 50);
        return;
      }

      try {
        // ── FIX 3: qtyChange is +1 (increase stock on scan) ──────────────────
        const qtyChange = 1;

        const res = await axios.post("/api/update_product_qty", {
          pid: found.p_id,
          qtyChange,
        });

        const updatedQty =
          res.data?.item_qty ??
          res.data?.data?.item_qty ??
          Number(found.item_qty || 0) + qtyChange;

        const updatedProduct = {
          ...found,
          item_qty: updatedQty,
        };

        setResult(updatedProduct);
        onProductUpdated?.(found.p_id, updatedQty);

        setScannedItems((prev) => [
          {
            ...updatedProduct,
            scannedAt: new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);

        setManualCode("");

        // Auto-clear result after 350ms for rapid successive scans
        setTimeout(() => {
          setResult(null);
          setNotFound(false);
          inputRef.current?.focus();
        }, 350);
      } catch (err) {
        console.error(err);
        setNotFound(true);
      } finally {
        setScanning(false);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    },
    [productLookupMap, scanning, onProductUpdated]
  );

  const handleManual = () => {
    if (manualCode.trim()) handleLookup(manualCode);
  };

  const reset = () => {
    setResult(null);
    setNotFound(false);
    setManualCode("");
    setScanLine(0);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" }}
      PaperProps={{
        sx: {
          bgcolor: "#FFFFFF",
          border: "1px solid rgba(21,101,192,0.12)",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 1,
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar sx={{ bgcolor: alpha("#1565C0", 0.1), width: 32, height: 32 }}>
            <QrCodeScannerRounded sx={{ color: "primary.main", fontSize: 18 }} />
          </Avatar>
          <Typography fontWeight={700} sx={{ fontFamily: "'IBM Plex Mono'", color: "text.primary" }}>
            Barcode Scanner
          </Typography>
        </Stack>
        <IconButton onClick={onClose} size="small" sx={{ color: "text.secondary" }}>
          <CloseRounded fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2.5, pb: 3 }}>
        {/* Camera viewport */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 200,
            bgcolor: "#F0F4F8",
            borderRadius: 2,
            overflow: "hidden",
            border: "1px solid rgba(21,101,192,0.12)",
            mb: 2.5,
          }}
        >
          {/* Corner brackets */}
          {[
            { top: 14, left: 14 },
            { top: 14, right: 14 },
            { bottom: 14, left: 14 },
            { bottom: 14, right: 14 },
          ].map((pos, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                ...pos,
                width: 22,
                height: 22,
                borderTop: i < 2 ? "2.5px solid #1565C0" : "none",
                borderBottom: i >= 2 ? "2.5px solid #1565C0" : "none",
                borderLeft: i % 2 === 0 ? "2.5px solid #1565C0" : "none",
                borderRight: i % 2 === 1 ? "2.5px solid #1565C0" : "none",
                borderRadius:
                  i === 0 ? "3px 0 0 0"
                  : i === 1 ? "0 3px 0 0"
                  : i === 2 ? "0 0 0 3px"
                  : "0 0 3px 0",
              }}
            />
          ))}

          {/* Idle state */}
          {!result && !scanning && !notFound && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -65%)",
                  textAlign: "center",
                }}
              >
                <CameraAltOutlined
                  sx={{ fontSize: 40, color: "rgba(21,101,192,0.25)", mb: 0.5 }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: "rgba(21,101,192,0.4)",
                    display: "block",
                    letterSpacing: "0.08em",
                    fontSize: "0.65rem",
                  }}
                >
                  ENTER BARCODE BELOW TO LOOK UP
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  left: "8%",
                  right: "8%",
                  top: `${scanLine}%`,
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, #1565C0, transparent)",
                  boxShadow: "0 0 6px rgba(21,101,192,0.5)",
                  transition: "top 0.016s linear",
                }}
              />
            </>
          )}

          {/* Processing */}
          {scanning && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <LinearProgress sx={{ width: "50%", borderRadius: 2 }} />
              <Typography
                variant="caption"
                sx={{ color: "primary.main", letterSpacing: "0.15em", fontSize: "0.65rem" }}
              >
                LOOKING UP…
              </Typography>
            </Box>
          )}

          {/* Success overlay */}
          {result && (
            <Fade in>
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: alpha("#2E7D32", 0.06),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <CheckCircleOutlineRounded sx={{ color: "#2E7D32", fontSize: 38 }} />
                <Typography
                  sx={{
                    color: "#2E7D32",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  PRODUCT FOUND — QTY UPDATED
                </Typography>
              </Box>
            </Fade>
          )}

          {/* Not found overlay */}
          {notFound && (
            <Fade in>
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: alpha("#C62828", 0.05),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <ErrorOutlineRounded sx={{ color: "#C62828", fontSize: 38 }} />
                <Typography
                  sx={{
                    color: "#C62828",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    letterSpacing: "0.1em",
                  }}
                >
                  NOT FOUND
                </Typography>
              </Box>
            </Fade>
          )}
        </Box>

        {/* Input row */}
        {!result && (
          <Stack direction="row" spacing={1.5} mb={2}>
            <TextField
              inputRef={inputRef}
              size="small"
              fullWidth
              autoFocus
              placeholder="Scan PID or barcode…"
              value={manualCode}
              onChange={(e) => {
                setManualCode(e.target.value);
                setNotFound(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleManual();
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <QrCodeScannerRounded sx={{ color: "text.secondary", fontSize: 18 }} />
                  </InputAdornment>
                ),
                sx: { fontFamily: "'IBM Plex Mono'", fontSize: "0.85rem" },
              }}
            />
            <Button
              variant="contained"
              onClick={handleManual}
              disabled={!manualCode.trim() || scanning}
              sx={{ minWidth: 90, fontWeight: 700, boxShadow: "none" }}
            >
              Look Up
            </Button>
          </Stack>
        )}

        {/* Hint chips */}
        {!result && !notFound && hintBarcodes.length > 0 && (
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
            <Typography variant="caption" sx={{ color: "text.secondary", alignSelf: "center" }}>
              Try:
            </Typography>
            {hintBarcodes.map((bc) => (
              <Chip
                key={bc}
                label={bc}
                size="small"
                onClick={() => {
                  setManualCode(String(bc));
                  setNotFound(false);
                }}
                sx={{
                  fontFamily: "'IBM Plex Mono'",
                  fontSize: "0.68rem",
                  cursor: "pointer",
                  bgcolor: alpha("#1565C0", 0.06),
                  color: "primary.main",
                  "&:hover": { bgcolor: alpha("#1565C0", 0.12) },
                }}
              />
            ))}
          </Stack>
        )}

        {/* Scanned history */}
        {scannedItems.length > 0 && (
          <Box sx={{ mt: 2.5 }}>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Scanned Products
            </Typography>

            <Stack spacing={1} sx={{ mt: 1, maxHeight: 220, overflowY: "auto" }}>
              {scannedItems.map((item, index) => (
                <Box
                  key={`${item.p_id}-${index}`}
                  sx={{
                    p: 1.5,
                    border: "1px solid rgba(21,101,192,0.12)",
                    borderRadius: 2,
                    bgcolor: "#F8FBFF",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {item.item_name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ fontFamily: "'IBM Plex Mono'", color: "text.secondary" }}
                    >
                      PID: {item.p_id} · SKU: {item.item_sku || "—"}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: "'IBM Plex Mono'", fontWeight: 700, color: "#2E7D32" }}
                    >
                      Qty: {item.item_qty}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                      {item.scannedAt}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>
        )}

        {/* Result details */}
        {result && (
          <Fade in>
            <Box
              sx={{
                bgcolor: "#F8FFF9",
                border: "1px solid rgba(46,125,50,0.2)",
                borderRadius: 2,
                p: 2.5,
                mt: 2,
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={1.5}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "#2E7D32",
                      letterSpacing: "0.08em",
                      fontWeight: 600,
                      fontSize: "0.65rem",
                    }}
                  >
                    ✓ BARCODE: {result.item_barcode || result.p_id}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "text.primary",
                      fontFamily: "'IBM Plex Mono'",
                      mt: 0.3,
                      fontSize: "1rem",
                    }}
                  >
                    {result.item_name}
                  </Typography>
                </Box>
                <StockBadge stock={result.item_qty} reorder={result.reorder_point} />
              </Stack>
              <Divider sx={{ mb: 1.5 }} />
              <Grid container spacing={1.5}>
                {[
                  { label: "SKU", value: result.item_sku },
                  { label: "PID", value: result.p_id },
                  { label: "Supplier", value: result.supplier || "—" },
                  {
                    label: "Unit Price",
                    value: result.item_price ? `$${Number(result.item_price).toFixed(2)}` : "—",
                  },
                  { label: "Stock", value: `${result.item_qty} units` },
                  {
                    label: "Reorder At",
                    value: result.reorder_point ? `${result.reorder_point} units` : "—",
                  },
                  {
                    label: "Stock Value",
                    value: result.item_price
                      ? `$${(result.item_qty * Number(result.item_price)).toFixed(2)}`
                      : "—",
                  },
                  {
                    label: "Last Updated",
                    value: result.updated_at || result.lastUpdated || "—",
                  },
                ].map(({ label, value }) => (
                  <Grid item xs={6} key={label}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: "text.secondary",
                        display: "block",
                        fontSize: "0.62rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {label}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: "text.primary",
                        fontFamily: "'IBM Plex Mono'",
                        fontSize: "0.8rem",
                      }}
                    >
                      {value}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
              <Button
                onClick={reset}
                size="small"
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
              >
                Scan Another
              </Button>
            </Box>
          </Fade>
        )}

        {/* Not found details */}
        {notFound && (
          <Fade in>
            <Box
              sx={{
                bgcolor: "#FFF5F5",
                border: "1px solid rgba(198,40,40,0.15)",
                borderRadius: 2,
                p: 2,
                textAlign: "center",
                mt: 2,
              }}
            >
              <Typography variant="body2" sx={{ color: "#C62828", fontWeight: 600 }}>
                No product found for &quot;{manualCode}&quot;
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block", mt: 0.5 }}
              >
                Check the barcode and try again, or add this product to the system.
              </Typography>
              <Button
                onClick={reset}
                size="small"
                sx={{ mt: 1.5 }}
                variant="outlined"
                color="error"
              >
                Try Again
              </Button>
            </Box>
          </Fade>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InventoryPage() {
  const router = useRouter();

  const [inventory, setInventory] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [recUserId, setRecUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const handleScannedProductUpdated = useCallback((pid, updatedQty) => {
    setInventory((current) =>
      current.map((p) =>
        String(p.p_id) === String(pid) ? { ...p, item_qty: updatedQty } : p
      )
    );
  }, []);

  // ── Auth check ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const testToken = async () => {
      try {
        const resToken = localStorage.getItem("Token");
        if (!resToken) {
          router.push("/signin");
          return;
        }
        const res = await axios.post("/api/jwt_verify", { resToken });
        if (!res.data.valid) {
          router.push("/signin");
          return;
        }
        setRecUserId(res.data.received_id);
      } catch (err) {
        console.error(err);
        router.push("/signin");
      }
    };
    testToken();
  }, [router]);

  // ── Fetch inventory ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!recUserId) return;
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const res = await axios.post("/api/inventory_api", { userId: recUserId });
        setInventory(res.data.data ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, [recUserId]);

  // ── Derived stats ───────────────────────────────────────────────────────────
  const totalProducts = inventory.length;
  const totalUnits = inventory.reduce((s, p) => s + (p.item_qty || 0), 0);
  const inStock = inventory.filter((p) => p.item_qty > 0).length;
  const outOfStock = inventory.filter((p) => p.item_qty === 0).length;
  const lowStock = inventory.filter(
    (p) => p.item_qty > 0 && p.reorder_point && p.item_qty <= p.reorder_point
  ).length;

  const safePct = (num) =>
    totalProducts > 0 ? Math.round((num / totalProducts) * 100) : 0;

  // ── Filtered rows ───────────────────────────────────────────────────────────
  const filtered = inventory.filter(
    (p) =>
      (p.item_name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.item_sku || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <Box sx={{ minHeight: "100vh", bgcolor: "background.default", p: { xs: 2, md: 3 } }}>

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ sm: "center" }}
          mb={4}
          gap={2}
        >
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#2E7D32",
                  boxShadow: "0 0 6px #2E7D32",
                  animation: "pulse 2s infinite",
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: "#2E7D32",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  fontSize: "0.7rem",
                }}
              >
                Live · Inventory Management System
              </Typography>
            </Stack>
            <Typography variant="h4" sx={{ color: "text.primary" }}>
              Warehouse Control
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.3 }}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1.5}>
            <Button
              variant="outlined"
              startIcon={<DownloadRounded />}
              size="small"
              sx={{
                borderColor: "rgba(21,101,192,0.25)",
                color: "text.secondary",
                "&:hover": { borderColor: "primary.main", color: "primary.main" },
              }}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              startIcon={<AddRounded />}
              size="small"
              sx={{
                borderColor: "rgba(21,101,192,0.25)",
                color: "text.secondary",
                "&:hover": { borderColor: "primary.main", color: "primary.main" },
              }}
            >
              Add Item
            </Button>
            <Button
              variant="contained"
              startIcon={<QrCodeScannerRounded />}
              onClick={() => setScannerOpen(true)}
              sx={{
                bgcolor: "primary.main",
                color: "#FFFFFF",
                fontWeight: 700,
                boxShadow: "0 4px 14px rgba(21,101,192,0.35)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(21,101,192,0.45)",
                  transform: "scale(1.02)",
                },
                transition: "all 0.2s",
              }}
            >
              Scan Barcode
            </Button>
          </Stack>
        </Stack>

        {/* ── KPI Cards ──────────────────────────────────────────────────────── */}
        <Grid container spacing={2.5} mb={4}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <StatCard
              label="Total Products"
              value={totalProducts}
              sub="SKUs tracked"
              icon={<Inventory2Outlined fontSize="small" />}
              accent="#1565C0"
              progress={100}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <StatCard
              label="In Stock"
              value={inStock}
              sub={`${safePct(inStock)}% available`}
              icon={<CheckCircleOutlineRounded fontSize="small" />}
              accent="#2E7D32"
              progress={safePct(inStock)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <StatCard
              label="Out of Stock"
              value={outOfStock}
              sub="Needs reorder"
              icon={<ErrorOutlineRounded fontSize="small" />}
              accent="#C62828"
              progress={safePct(outOfStock)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
            <StatCard
              label="Low Stock"
              value={lowStock}
              sub="Below reorder pt."
              icon={<WarningAmberRounded fontSize="small" />}
              accent="#E65100"
              progress={safePct(lowStock)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <StatCard
              label="Total Units"
              value={totalUnits.toLocaleString()}
              sub="Across all SKUs"
              icon={<SpeedOutlined fontSize="small" />}
              accent="#6A1B9A"
              progress={100}
            />
          </Grid>
        </Grid>

        {/* ── Table ──────────────────────────────────────────────────────────── */}
        <Card sx={{ bgcolor: "#FFFFFF" }}>
          {loading && <LinearProgress sx={{ borderRadius: "12px 12px 0 0" }} />}

          <Box
            sx={{
              p: 2.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontFamily: "'IBM Plex Mono'" }}>
              Product Inventory
              <Chip
                label={`${filtered.length} items`}
                size="small"
                sx={{
                  ml: 1.5,
                  bgcolor: alpha("#1565C0", 0.08),
                  color: "primary.main",
                  fontSize: "0.7rem",
                }}
              />
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <TextField
                size="small"
                placeholder="Search products, SKU…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded sx={{ color: "text.secondary", fontSize: 18 }} />
                    </InputAdornment>
                  ),
                  sx: { fontFamily: "'IBM Plex Sans'", fontSize: "0.85rem" },
                }}
                sx={{ width: 240 }}
              />
              <Tooltip title="Filter">
                <IconButton
                  sx={{
                    border: "1px solid rgba(21,101,192,0.15)",
                    borderRadius: 1.5,
                    color: "text.secondary",
                  }}
                >
                  <FilterListRounded fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
          </Box>

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {["SKU", "Product Name", "PID", "Stock", "Status"].map((h) => (
                    <TableCell key={h}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i}>
                      {[1, 2, 3, 4, 5].map((c) => (
                        <TableCell key={c}>
                          <Box
                            sx={{
                              height: 14,
                              borderRadius: 1,
                              bgcolor: alpha("#1565C0", 0.07),
                              width: c === 2 ? "70%" : "50%",
                            }}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      align="center"
                      sx={{ py: 5, color: "text.secondary" }}
                    >
                      No products match your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((p) => (
                      <TableRow
                        key={p.item_sku || p.p_id}
                        sx={{ "&:hover": { bgcolor: alpha("#1565C0", 0.03) } }}
                      >
                        <TableCell>
                          <Typography
                            variant="caption"
                            sx={{
                              fontFamily: "'IBM Plex Mono'",
                              color: "primary.main",
                              fontWeight: 600,
                            }}
                          >
                            {p.item_sku}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{p.item_name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="caption"
                            sx={{
                              fontFamily: "'IBM Plex Mono'",
                              color: "text.secondary",
                              fontWeight: 500,
                            }}
                          >
                            {p.p_id ?? "—"}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant="body2"
                            sx={{ fontFamily: "'IBM Plex Mono'", fontWeight: 600 }}
                          >
                            {p.item_qty}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <StockBadge stock={p.item_qty} reorder={p.reorder_point} />
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={filtered.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(+e.target.value);
              setPage(0);
            }}
            rowsPerPageOptions={[8, 16, 25]}
            sx={{
              color: "text.secondary",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              fontFamily: "'IBM Plex Sans'",
            }}
          />
        </Card>

        {/* ── Footer ─────────────────────────────────────────────────────────── */}
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            color: "rgba(90,122,150,0.5)",
            mt: 3,
            letterSpacing: "0.08em",
          }}
        >
          INVENTORY MANAGEMENT SYSTEM · Last synced just now
        </Typography>
      </Box>

      {/* ── Scanner Dialog ──────────────────────────────────────────────────── */}
      <ScannerDialog
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        inventory={inventory}
        onProductUpdated={handleScannedProductUpdated}
      />
    </ThemeProvider>
  );
}