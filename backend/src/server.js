const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const customerRoutes = require("./routes/customerRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const settingRoutes = require("./routes/settingRoutes");
const shippingRoutes = require("./routes/shippingRoutes");
const midtransClient = require("midtrans-client");
const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/settings", settingRoutes);
app.use("/shipping", shippingRoutes);
app.use("/api/admins", adminRoutes);

app.get("/api/shipping/cost", (req, res) => {
  const { city } = req.query;

  const shippingPrices = {
    "Jakarta Pusat": 15000,
    "Jakarta Barat": 18000,
    "Jakarta Selatan": 20000,
    "Jakarta Timur": 18000,
    "Jakarta Utara": 18000,
    Tangerang: 25000,
    Bekasi: 30000,
    Depok: 28000,
    Bogor: 35000,
  };

  const cost = shippingPrices[city];

  if (!cost) {
    return res.status(404).json({
      message: "Kota tidak tersedia",
    });
  }

  res.json({
    city,
    cost,
  });
});

app.post("/api/payment/create", async (req, res) => {
  try {
    const { orderId, total, customerName, customerPhone } = req.body;

    if (!orderId || !total) {
      return res.status(400).json({
        message: "orderId dan total wajib diisi",
      });
    }

    const parameter = {
      transaction_details: {
        order_id: String(orderId),
        gross_amount: Number(total),
      },
      customer_details: {
        first_name: customerName || "Customer",
        phone: customerPhone || "",
      },
    };

    const transaction = await snap.createTransaction(parameter);

    res.json({
      token: transaction.token,
      redirect_url: transaction.redirect_url,
    });
  } catch (error) {
    console.error("MIDTRANS ERROR:", error.ApiResponse || error.message);

    res.status(500).json({
      message: error.ApiResponse?.error_messages?.[0] || error.message || "Gagal membuat payment Midtrans",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
