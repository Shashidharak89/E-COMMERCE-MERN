import React, { useContext, useEffect, useState } from 'react';
import SampleContext from '../contexts/SampleContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const {URL,userId}=useContext(SampleContext);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${URL}/api/order/user/${userId}`);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err.message);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <div className="page">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <strong>{order.prdtitle}</strong> - Qty: {order.qty} - Delivered: {order.delivered ? '✅' : '❌'}
              <br />
              <small>Address: {order.adress}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
