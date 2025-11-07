import { useEffect, useState } from "react";

function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch cart data from backend
  const fetchCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart");
      const data = await res.json();
      console.log("Cart data:", data); // Check what’s coming from backend
      setCart(data.cart || []); // ensure array
      setTotal(data.total || 0);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setLoading(false);
    }
  };

  // Remove an item from cart
  const removeItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, { method: "DELETE" });
      fetchCart(); // Refresh cart after delete
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;

  return (
  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "40px",
      fontFamily: "Poppins, Arial, sans-serif",
    }}
  >
    <h2
      style={{
        fontSize: "24px",
        marginBottom: "25px",
        textAlign: "center",
        letterSpacing: "1px",
      }}
    >
      Your Shopping Bag 🛍️
    </h2>

    {cart.length === 0 ? (
      <p style={{ textAlign: "center", color: "#666" }}>Your cart is empty 🛒</p>
    ) : (
      <>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "left",
                }}
              >
                Product
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                Quantity
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "right",
                }}
              >
                Price
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ddd",
                  padding: "12px",
                  textAlign: "center",
                }}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td style={{ padding: "12px" }}>
                  {item.productId?.name || "Unknown Product"}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  {item.qty}
                </td>
                <td style={{ padding: "12px", textAlign: "right" }}>
                  ₹{item.productId?.price * item.qty}
                </td>
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <button
                    onClick={() => removeItem(item._id)}
                    style={{
                      backgroundColor: "#000",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#E50010")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#000")
                    }
                  >
                    ❌ Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          style={{
            marginTop: "25px",
            textAlign: "right",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Total: ₹{total}
        </div>
      </>
    )}
  </div>
);

}

export default Cart;
