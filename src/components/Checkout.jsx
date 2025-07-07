import React, { useContext } from 'react';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SampleContext from '../contexts/SampleContext';
import './styles/checkout.css';

const Checkout = () => {
  const { cart, clearCart, getTotal } = useCart();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {URL} = useContext(SampleContext);

  const handlePlaceOrder = async () => {
    if (!token) {
      alert("Please login to place an order.");
      navigate('/login');
      return;
    }

    const payload = {
      items: cart,
      total: getTotal(),
    };

    try {
      const res = await axios.post(`${URL}/api/orders/place`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 201) {
        alert('✅ Order placed successfully!');
        clearCart();
        navigate('/orders');
      } else {
        alert('❌ Failed to place order.');
      }
    } catch (err) {
      console.error('Order placing failed ❌:', err);
      alert('Error placing order.');
    }
  };

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="page">
      <h1>Checkout</h1>
      <ul>
        {cart.map((item) => (
          <li key={item.productId}>
            {item.title} - ₹{item.price} × {item.qty}
          </li>
        ))}
      </ul>
      <h3>Total: ₹{getTotal()}</h3>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
