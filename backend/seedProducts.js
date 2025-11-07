const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose.connect("mongodb://127.0.0.1:27017/mockEcomCart", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
  { name: "T-Shirt", price: 499 },
  { name: "Jeans", price: 899 },
  { name: "Shoes", price: 1299 },
  { name: "Cap", price: 299 },
  { name: "Watch", price: 999 },
  { name: "Jacket", price: 1499 },
  { name: "Socks", price: 199 },
];

async function seed() {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("✅ Products added to MongoDB!");
  mongoose.connection.close();
}

seed();
