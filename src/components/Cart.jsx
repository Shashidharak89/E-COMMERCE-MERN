import React, { useContext, useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import SampleContext from '../contexts/SampleContext';
import axios from 'axios';

const Cart = () => {
  const { getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { URL, userId } = useContext(SampleContext);

  // Fetch cart items for the user
  const fetchCart = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${URL}/api/cart/user/${userId}`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart items:", err);
    }
  };

  // Delete a specific cart item
  const deleteCartItem = async (cartItemId) => {
    try {
      const res = await axios.delete(`${URL}/api/cart/${cartItemId}`, {
        data: { userid: userId },
      });
      if (res.status === 200) {
        setCartItems((prev) => prev.filter((item) => item._id !== cartItemId));
      } else {
        alert("Failed to delete item from cart.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Place order for a single item and remove it from cart
  const orderSingleItem = async (item) => {
    if (!userId) {
      alert("Please log in to order.");
      return;
    }

    const adress = prompt(`Enter delivery address for "${item.title}":`);
    if (!adress) return;

    const payload = {
      userid: userId,
      prdid: String(item.productId),
      prdtitle: item.title,
      prdimg: item.image,
      rating: {
        rate: String(item.rating.rate),
        count: String(item.rating.count),
      },
      qty: String(item.qty),
      adress,
    };

    try {
      const res = await axios.post(`${URL}/api/order/create`, payload);
      if (res.status === 200 || res.status === 201) {
        alert(`✅ Order placed for "${item.title}"`);

        // Delete the item from cart after successful order
        await deleteCartItem(item._id);
      } else {
        alert(`❌ Order failed for "${item.title}"`);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Network error while placing order.");
    }
  };

  // Place orders for all cart items
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
          userid: userId,
          prdid: String(item.productId),
          prdtitle: item.title,
          prdimg: item.image,
          rating: {
            rate: String(item.rating.rate),
            count: String(item.rating.count),
          },
          qty: String(item.qty),
          adress,
        };

        const res = await axios.post(`${URL}/api/order/create`, payload);

        if (res.status !== 200 && res.status !== 201) {
          alert(`❌ Order failed for ${item.title}`);
          return;
        }

        // Delete item from cart after successful individual order
        await deleteCartItem(item._id);
      }

      alert("✅ All orders placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("❌ Network error while placing orders.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, [userId]);

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
                <button onClick={() => orderSingleItem(item)}>Order Now</button>
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
