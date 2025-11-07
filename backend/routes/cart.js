const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItem");
const Product = require("../models/product"); 

// GET /api/cart → Fetch all cart items + total
router.get("/", async (req, res) => {
  try {
    const items = await CartItem.find().populate("productId");
    const total = items.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );
    res.json({ cart: items, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  POST /api/cart → Add new item or update existing one
router.post("/", async (req, res) => {
  try {
    const { productId, qty } = req.body;
    if (!productId || !qty) {
      return res.status(400).json({ error: "productId and qty required" });
    }

    
    const existing = await CartItem.findOne({ productId });
    if (existing) {
      existing.qty += qty;
      await existing.save();
    } else {
      await CartItem.create({ productId, qty });
    }

    // Return updated cart with total
    const updatedCart = await CartItem.find().populate("productId");
    const total = updatedCart.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );
    res.json({ cart: updatedCart, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/cart/:id → Remove an item from cart
router.delete("/:id", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);

    const updated = await CartItem.find().populate("productId");
    const total = updated.reduce(
      (sum, item) => sum + item.productId.price * item.qty,
      0
    );

    res.json({ cart: updated, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
