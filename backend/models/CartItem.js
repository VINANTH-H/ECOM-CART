const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  qty: { type: Number, required: true },
});

module.exports = mongoose.models.CartItem || mongoose.model("CartItem", cartItemSchema);

