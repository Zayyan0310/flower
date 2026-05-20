const express = require("express");
const router = express.Router();

const { getCart, addToCart, updateCartQty, deleteCartItem, clearCart } = require("../controllers/cartController");

router.get("/", getCart);
router.post("/", addToCart);
router.put("/:id", updateCartQty);

router.delete("/clear", clearCart);

router.delete("/:id", deleteCartItem);

module.exports = router;
