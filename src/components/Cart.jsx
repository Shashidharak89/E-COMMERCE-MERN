import React, { useContext, useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import SampleContext from '../contexts/SampleContext';

const Cart = () => {
  const { getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const{URL,userId}=useContext(SampleContext);

  const fetchCart = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${URL}/api/cart/user/${userId}`);
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  const deleteCartItem = async (cartItemId) => {
  try {
    const res = await fetch(`${URL}/api/cart/${cartItemId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
    } else {
      alert("Failed to delete item from cart.");
    }
  } catch (err) {
    console.error("Delete failed:", err);
  }
};



  useEffect(() => {
    fetchCart();
  }, [userId]);

  const handleCheckout = async () => {
    if (!userId) {
      alert("Please log in to place an order.");
      return;
    }

    const adress = prompt("Enter delivery address:");
    if (!adress) return;

    try {
      for (const item of cartItems) {
        const payload = {
          userId,
          prdid: item.productId,
          prdtitle: item.title,
          prdimg: item.image,
          rating: item.rating,
          qty: item.qty,
          adress,
        };

        const res = await fetch("http://localhost:5000/api/order/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          alert(`❌ Order failed for ${item.title}`);
          return;
        }
      }

      alert("✅ All orders placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("❌ Network error while placing orders.");
    }
  };

  return (
    <div className="page">
      <h1>Your Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in the cart yet.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.productId}>
                {item.title} - ₹{item.price} x {item.qty}
                <button onClick={() => deleteCartItem(item._id)}>Delete</button>

              </li>
            ))}
          </ul>
          <p><strong>Total: ₹{getTotal().toFixed(2)}</strong></p>
          <button onClick={handleCheckout} className="btn btn-primary mt-4">
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
