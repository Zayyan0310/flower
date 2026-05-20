const prisma = require("../lib/prisma");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "uploads/payment-proofs",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
exports.uploadPaymentProof = multer({ storage }).single("paymentProof");

exports.getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, customerAddress, note, total, paymentMethod, bankName, items } = req.body;

    const parsedItems = typeof items === "string" ? JSON.parse(items) : items;

    const proofPath = req.file ? `/uploads/payment-proofs/${req.file.filename}` : null;

    const order = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        customerAddress,
        note,
        total: Number(total),
        paymentMethod: paymentMethod || "COD",
        paymentStatus: paymentMethod === "TRANSFER" ? "WAITING_CONFIRMATION" : "PENDING",
        bankName: bankName || null,
        paymentProof: proofPath,
        items: {
          create: parsedItems.map((item) => ({
            productId: Number(item.productId),
            quantity: Number(item.quantity),
            price: Number(item.price),
          })),
        },
      },
      include: {
        items: true,
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: {
        status: req.body.status,
      },
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await prisma.orderItem.deleteMany({
      where: { orderId: Number(req.params.id) },
    });

    await prisma.order.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
