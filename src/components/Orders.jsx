import React, { useContext, useEffect, useState } from 'react';
import { Package, MapPin, CheckCircle, XCircle, Clock, ShoppingBag, Truck, Calendar } from 'lucide-react';
import SampleContext from '../contexts/SampleContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      <style jsx>{`
        .orders-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #ebf8ff 100%);
          padding: 2rem 1rem;
        }

        .orders-content {
          max-width: 1200px;
          margin: 0 auto;
        }

        .orders-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .orders-title {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #374151 0%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1rem;
        }

        .orders-subtitle {
          color: #6b7280;
          font-size: 1.125rem;
        }

        /* Loading Skeleton */
        .loading-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .skeleton-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
        }

        .skeleton-animation {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .skeleton-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .skeleton-icon {
          width: 3rem;
          height: 3rem;
          background: #e5e7eb;
          border-radius: 0.75rem;
        }

        .skeleton-title {
          width: 12rem;
          height: 1.5rem;
          background: #e5e7eb;
          border-radius: 0.5rem;
        }

        .skeleton-badge {
          width: 5rem;
          height: 2rem;
          background: #e5e7eb;
          border-radius: 9999px;
        }

        .skeleton-content {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .skeleton-line {
          height: 1rem;
          background: #e5e7eb;
          border-radius: 0.25rem;
        }

        .skeleton-line.short {
          width: 8rem;
        }

        .skeleton-line.long {
          width: 16rem;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 5rem 0;
        }

        .empty-icon-container {
          position: relative;
          margin-bottom: 2rem;
        }

        .empty-icon-bg {
          width: 8rem;
          height: 8rem;
          margin: 0 auto;
          background: linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-icon {
          width: 2.5rem;
          height: 2.5rem;
          color: #3b82f6;
        }

        .empty-badge {
          position: absolute;
          top: -0.5rem;
          right: -0.5rem;
          width: 2rem;
          height: 2rem;
          background: #fbbf24;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.875rem;
          color: #92400e;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .empty-description {
          color: #6b7280;
          margin-bottom: 2rem;
          max-width: 28rem;
          margin-left: auto;
          margin-right: auto;
        }

        .empty-button {
          padding: 0.75rem 2rem;
          background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
        }
          .stat-number.failed {
  color: #ef4444;
}


        .empty-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
        }

        /* Error State */
        .error-state {
          text-align: center;
          padding: 5rem 0;
        }

        .error-icon-container {
          width: 6rem;
          height: 6rem;
          margin: 0 auto 1.5rem;
          background: #fee2e2;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .error-icon {
          width: 2.5rem;
          height: 2.5rem;
          color: #ef4444;
        }

        .error-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .error-description {
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .error-button {
          padding: 0.75rem 1.5rem;
          background: #ef4444;
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
        }

        .error-button:hover {
          background: #dc2626;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
        }

        /* Order Stats */
        .order-stats {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: white;
          border-radius: 1rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          color: #374151;
        }

        .stat-number.delivered {
          color: #10b981;
        }

        .stat-number.pending {
          color: #f59e0b;
        }

        .stat-label {
          color: #6b7280;
          font-size: 0.875rem;
          font-weight: 500;
        }

        /* Orders Grid */
        .orders-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        }

        .order-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .order-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border-color: #93c5fd;
        }

        .order-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .order-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .order-icon-container {
          width: 3rem;
          height: 3rem;
          background: linear-gradient(135deg, #dbeafe 0%, #c7d2fe 100%);
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .order-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #2563eb;
        }

        .order-details {
          flex: 1;
        }

        .order-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.25rem;
        }

        .order-quantity {
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0;
        }

        .order-status {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.5rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .order-status.delivered {
          background: #d1fae5;
          color: #065f46;
        }

        .order-status.pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status-icon {
          width: 1rem;
          height: 1rem;
        }

        .order-address {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding: 0.75rem;
          background: #f9fafb;
          border-radius: 0.5rem;
        }

        .address-icon {
          width: 1rem;
          height: 1rem;
          color: #6b7280;
          margin-top: 0.125rem;
          flex-shrink: 0;
        }

        .address-text {
          font-size: 0.875rem;
          color: #6b7280;
          line-height: 1.5;
          margin: 0;
        }

        .order-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #f3f4f6;
        }

        .order-date,
        .order-tracking {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .date-icon,
        .tracking-icon {
          width: 1rem;
          height: 1rem;
        }

        .order-tracking {
          cursor: pointer;
          color: #3b82f6;
          font-weight: 500;
        }

        .order-tracking:hover {
          color: #2563eb;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .orders-container {
            padding: 1rem;
          }

          .orders-title {
            font-size: 2rem;
          }

          .orders-grid {
            grid-template-columns: 1fr;
          }

          .order-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .order-header {
            flex-direction: column;
            gap: 1rem;
          }

          .order-footer {
            flex-direction: column;
            gap: 0.5rem;
            align-items: flex-start;
          }

          .cart-login-required {
  text-align: center;
  margin-top: 5rem;
  color: #1f2937;
}

.login-redirect-button {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
}

.login-redirect-button:hover {
  background: #2563eb;
}

        }
      `}</style>
    </div>
  );
};

export default Orders;