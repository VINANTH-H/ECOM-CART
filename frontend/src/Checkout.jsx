import { useState, useEffect } from "react";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [form, setForm] = useState({ name: "", email: "" });
  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/cart")
      .then((res) => res.json())
      .then((data) => {
        setCart(data.cart);
        setTotal(data.total);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        cartItems: cart,
      }),
    });

    const data = await res.json();
    setReceipt(data);
  };

  // 🧾 Receipt View
  if (receipt) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "60px auto",
          padding: "40px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          borderRadius: "10px",
          fontFamily: "Poppins, Arial, sans-serif",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#E50010", marginBottom: "15px" }}>Order Confirmed 🎉</h2>
        <p style={{ fontSize: "18px", marginBottom: "10px" }}>
          Thank you, <strong>{receipt.name}</strong>!
        </p>
        <p style={{ color: "#555", marginBottom: "25px" }}>
          Your order receipt has been sent to <strong>{receipt.email}</strong>.
        </p>

        <div
          style={{
            textAlign: "left",
            backgroundColor: "#fafafa",
            padding: "20px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          <p>
            <strong>Date:</strong>{" "}
            {new Date(receipt.timestamp).toLocaleString()}
          </p>
          <p>
            <strong>Total Paid:</strong> ₹{receipt.total}
          </p>
        </div>

        <p
          style={{
            color: "green",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          ✅ {receipt.message}
        </p>
      </div>
    );
  }

  // 💳 Checkout Form View
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "60px auto",
        padding: "40px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        borderRadius: "10px",
        fontFamily: "Poppins, Arial, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "24px",
          marginBottom: "25px",
          letterSpacing: "1px",
        }}
      >
        Checkout
      </h2>

      <p
        style={{
          textAlign: "center",
          marginBottom: "25px",
          fontSize: "18px",
        }}
      >
        Total Amount: <strong>₹{total}</strong>
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          style={{
            padding: "12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#E50010")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#000")
          }
        >
          Confirm Checkout
        </button>
      </form>
    </div>
  );
}

export default Checkout;
