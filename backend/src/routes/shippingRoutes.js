const express = require("express");
const router = express.Router();

router.get("/cost", (req, res) => {
  const city = req.query.city;

  const shippingPrices = {
    "Jakarta Pusat": 15000,
    "Jakarta Barat": 18000,
    "Jakarta Selatan": 20000,
    Tangerang: 25000,
    Bekasi: 30000,
  };

  res.json({
    cost: shippingPrices[city] || 0,
  });
});

module.exports = router;
