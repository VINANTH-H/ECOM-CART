// Import required packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Create the express app
const app = express();

// Enable middleware
app.use(cors());               // allows frontend requests
app.use(bodyParser.json());    // parses JSON bodies

// Import routes
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const checkoutRoutes = require("./routes/checkout");

// Use routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// Default route (for testing)
app.get("/", (req, res) => {
  res.send("✅ Hello from backend! This is Vinu’s Mock E-Com Server 🚀");
});

// Connect to MongoDB using environment variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// Start the server using PORT from .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
