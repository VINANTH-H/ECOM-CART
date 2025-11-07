import tshirt from "./assets/T-Shirt-Gery-Navy.jpg";
import jeans from "./assets/Jeans.jpeg";
import shoes from "./assets/Shoe.jpeg";
import cap from "./assets/Caps.jpeg";
import watch from "./assets/Watch.jpeg";
import jacket from "./assets/Jacket.jpeg";
import socks from "./assets/socks.jpg";


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { useEffect, useState } from "react";

const imageMap = {
  "T-Shirt": tshirt,
  Jeans: jeans,
  Shoes: shoes,
  Cap: cap,
  Watch: watch,
  Jacket: jacket,
  Socks: socks,
};

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = async (productId) => {
    await fetch("http://localhost:5000/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, qty: 1 }),
    });
    alert("🛒 Item added to cart!");
  };

  return (
    <Router>
      <header
  style={{
    backgroundColor: "#fff",
    borderBottom: "1px solid #ddd",
    padding: "15px 50px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <h1
    style={{
      color: "#E50010",
      fontSize: "24px",
      margin: 0,
      fontWeight: "700",
      letterSpacing: "1px",
    }}
  >
    ECOM-CART
  </h1>

  <nav style={{ display: "flex", gap: "15px" }}>
    <Link
      to="/"
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "4px",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "500",
        letterSpacing: "0.5px",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#E50010")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
    >
      Home
    </Link>

    <Link
      to="/cart"
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "4px",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "500",
        letterSpacing: "0.5px",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#E50010")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
    >
      Cart
    </Link>

    <Link
      to="/checkout"
      style={{
        backgroundColor: "#000",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "4px",
        textDecoration: "none",
        fontSize: "15px",
        fontWeight: "500",
        letterSpacing: "0.5px",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#E50010")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#000")}
    >
      Checkout
    </Link>
  </nav>
</header>


      <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2 style={{ fontSize: "22px", marginBottom: "25px" }}>New Arrivals</h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                    gap: "25px",
                  }}
                >
                  {products.map((p) => (
                    <div
                      key={p._id}
                      style={{
                        background: "#fff",
                        borderRadius: "8px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        textAlign: "center",
                        padding: "20px",
                        transition: "transform 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
                    >
                      {/* Placeholder Image */}
                      <img
                          src={imageMap[p.name] || socks}
                          alt={p.name}
                          style={{
                            width: "100%",
                            height: "220px",
                            objectFit: "cover",
                            borderRadius: "6px",
                            marginBottom: "10px",
                        }} 
                      />
                      <h3 style={{ fontSize: "16px", marginBottom: "5px" }}>{p.name}</h3>
                      <p style={{ color: "#555", marginBottom: "10px" }}>₹{p.price}</p>
                      <button
                        onClick={() => addToCart(p._id)}
                        style={{
                          backgroundColor: "#000",
                          color: "#fff",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              </>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
