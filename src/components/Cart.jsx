import React, { useContext, useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import SampleContext from '../contexts/SampleContext';
import axios from 'axios';
import './styles/Cart.css';

const Cart = () => {
  const { getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const { URL, userId } = useContext(SampleContext);

if (!userId) {
  return (
    <div className="cart-login-required">
      <h2>Please log in to view your cart.</h2>
      <button 
        className="login-redirect-button" 
        onClick={() => navigate('/auth/Login')}
      >
        Go to Login
      </button>
    </div>
  );
}

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

  useEffect(() => {
    fetchCart();
  }, [userId]);

  return (
    <div className="cart-page-container">
      <div className="cart-header-section">
        <h1 className="cart-main-title">Your Shopping Cart</h1>
        <div className="cart-items-count">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty-state">
          <div className="empty-cart-icon">🛒</div>
          <h2 className="empty-cart-title">Your cart is empty</h2>
          <p className="empty-cart-message">Add some items to get started!</p>
        </div>
      ) : (
        <div className="cart-content-wrapper">
          <div className="cart-items-container">
            {cartItems.map((item, index) => (
              <div 
                key={item.productId} 
                className="cart-item-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="cart-item-image">
                  <img src={item.image} alt={item.title} />
                </div>
                
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <div className="cart-item-price-qty">
                    <span className="cart-item-price">₹{item.price}</span>
                    <span className="cart-item-quantity">Qty: {item.qty}</span>
                  </div>
                  <div className="cart-item-total">
                    Total: ₹{(item.price * item.qty).toFixed(2)}
                  </div>
                </div>

                <div className="cart-item-actions">
                  <button 
                    onClick={() => orderSingleItem(item)}
                    className="cart-btn-order"
                  >
                    Order Now
                  </button>
                  <button 
                    onClick={() => deleteCartItem(item._id)}
                    className="cart-btn-delete"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h3 className="cart-summary-title">Order Summary</h3>
              <div className="cart-summary-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{getTotal().toFixed(2)}</span>
              </div>
              <div className="cart-summary-divider"></div>
              <div className="cart-summary-total">
                <span>Total</span>
                <span>₹{getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;