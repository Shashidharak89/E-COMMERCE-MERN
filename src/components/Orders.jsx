import React, { useContext, useEffect, useState } from 'react';
import { Package, MapPin, CheckCircle, XCircle, Clock, ShoppingBag, Truck, Calendar } from 'lucide-react';
import SampleContext from '../contexts/SampleContext';
import { useNavigate } from 'react-router-dom';
import './styles/Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { URL, userId } = useContext(SampleContext);


  if (!userId) {
  return (
    <div className="cart-login-required">
      <h2>Please log in to view your Orders.</h2>
      <button 
        className="login-redirect-button" 
        onClick={() => navigate('/auth/Login')}
      >
        Go to Login
      </button>
    </div>
  );
}


 useEffect(() => {
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${URL}/api/order/user/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      
      // Sort by createdAt descending
      const sortedOrders = [...data].sort((a, b) => {
  return new Date(b.orderdate).getTime() - new Date(a.orderdate).getTime();
});
setOrders(sortedOrders);

    } catch (err) {
      console.error("❌ Error fetching orders:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (userId) {
    fetchOrders();
  }
}, [userId, URL]);


  const LoadingSkeleton = () => (
    <div className="loading-container">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-animation">
            <div className="skeleton-header">
              <div className="skeleton-icon"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-badge"></div>
            </div>
            <div className="skeleton-content">
              <div className="skeleton-line short"></div>
              <div className="skeleton-line long"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const EmptyState = () => (
    <div className="empty-state">
      <div className="empty-icon-container">
        <div className="empty-icon-bg">
          <ShoppingBag className="empty-icon" />
        </div>
        <div className="empty-badge">0</div>
      </div>
      <h3 className="empty-title">No Orders Yet</h3>
      <p className="empty-description">
        You haven't placed any orders yet. Start shopping to see your orders here!
      </p>
      <button className="empty-button">
        Start Shopping
      </button>
    </div>
  );

  const ErrorState = () => (
    <div className="error-state">
      <div className="error-icon-container">
        <XCircle className="error-icon" />
      </div>
      <h3 className="error-title">Something went wrong</h3>
      <p className="error-description">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="error-button"
      >
        Try Again
      </button>
    </div>
  );

  const OrderCard = ({ order, index }) => (
    <div 
      className="order-card"
      style={{
        animationDelay: `${index * 100}ms`
      }}
    >
      <div className="order-header">
        <div className="order-info">
          <div className="order-icon-container">
            <Package className="order-icon" />
          </div>
          <div className="order-details">
            <h3 className="order-title">{order.prdtitle}</h3>
            <p className="order-quantity">Quantity: {order.qty}</p>
          </div>
        </div>
<div className={`order-status ${order.status}`}>
  {order.status === 'delivered' && (
    <>
      <CheckCircle className="status-icon" />
      <span>Delivered</span>
    </>
  )}
  {order.status === 'pending' && (
    <>
      <Clock className="status-icon" />
      <span>Pending</span>
    </>
  )}
  {order.status === 'failed' && (
    <>
      <XCircle className="status-icon" />
      <span>Failed</span>
    </>
  )}
</div>

      </div>
      
      <div className="order-address">
        <MapPin className="address-icon" />
        <p className="address-text">{order.adress}</p>
      </div>
      
      <div className="order-footer">
        <div className="order-date">
          <Calendar className="date-icon" />
          <span>Order placed recently</span>
        </div>
        {!order.delivered && (
          <div className="order-tracking">
            <Truck className="tracking-icon" />
            
          </div>
        )}
      </div>
    </div>
  );

  const OrderStats = () => {
  const deliveredCount = orders.filter(o => o.status === 'delivered').length;
  const pendingCount = orders.filter(o => o.status === 'pending').length;
  const failedCount = orders.filter(o => o.status === 'failed').length;

  return (
    <div className="order-stats">
      <div className="stat-item">
        <span className="stat-number">{orders.length}</span>
        <span className="stat-label">Total Orders</span>
      </div>
      <div className="stat-item">
        <span className="stat-number delivered">{deliveredCount}</span>
        <span className="stat-label">Delivered</span>
      </div>
      <div className="stat-item">
        <span className="stat-number pending">{pendingCount}</span>
        <span className="stat-label">Pending</span>
      </div>
      <div className="stat-item">
        <span className="stat-number failed">{failedCount}</span>
        <span className="stat-label">Failed</span>
      </div>
    </div>
  );
};


  return (
    <div className="orders-container">
      <div className="orders-content">
        {/* Header */}
        <div className="orders-header">
          <h1 className="orders-title">My Orders</h1>
          <p className="orders-subtitle">Track and manage your purchases</p>
        </div>

        {loading && <LoadingSkeleton />}
        {error && <ErrorState />}
        {!loading && !error && orders.length === 0 && <EmptyState />}
        
        {!loading && !error && orders.length > 0 && (
          <div className="orders-list">
            <OrderStats />
            
            <div className="orders-grid">
              {orders.map((order, index) => (
                <OrderCard key={index} order={order} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;