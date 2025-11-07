const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { name, email, cartItems } = req.body;
  const timestamp = new Date().toISOString();

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.qty,
    0
  );

  // Mock receipt
  res.json({
    name,
    email,
    total,
    timestamp,
    message: "Checkout successful! 🎉",
  });
});

module.exports = router;
