const express = require("express");
const router = express.Router();

const { getOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder, uploadPaymentProof } = require("../controllers/orderController");

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", uploadPaymentProof, createOrder);
router.put("/:id/status", updateOrderStatus);
router.delete("/:id", deleteOrder);

module.exports = router;
