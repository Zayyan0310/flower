exports.getShippingCost = async (req, res) => {
  const { city } = req.query;

  const shippingPrices = {
    "Jakarta Pusat": 15000,
    "Jakarta Barat": 18000,
    "Jakarta Selatan": 20000,
    Tangerang: 25000,
    Bekasi: 30000,
  };

  const cost = shippingPrices[city] || 0;

  res.json({
    cost,
  });
};
