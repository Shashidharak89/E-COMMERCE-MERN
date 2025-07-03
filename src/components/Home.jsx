import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Search, Filter, ShoppingCart, Star, RefreshCw, Heart, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [cartFeedback, setCartFeedback] = useState("");
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  // Fetch products with better error handling
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://fakestoreapi.com/products");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(error.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories;
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      localStorage.setItem("favorites", JSON.stringify(Array.from(newFavorites)));
      return newFavorites;
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartFeedback(`Added '${product.title}' to cart!`);
    setTimeout(() => setCartFeedback(""), 1500);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="products-grid">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="product-card skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-category"></div>
            <div className="skeleton-line skeleton-price"></div>
            <div className="skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Product card component
  const ProductCard = ({ product }) => (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        <div className="product-overlay">
          <button
            className="overlay-btn"
            aria-label="View Product"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            className="overlay-btn"
            aria-label="Add to Cart"
            onClick={() => handleAddToCart(product)}
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            className={`overlay-btn${favorites.has(product.id) ? " favorited" : ""}`}
            aria-label={favorites.has(product.id) ? "Remove from Favorites" : "Add to Favorites"}
            onClick={() => toggleFavorite(product.id)}
          >
            <Heart className="w-5 h-5" fill={favorites.has(product.id) ? "#ef4444" : "none"} />
          </button>
        </div>
        {product.rating && (
          <div className="product-rating-badge">
            <Star className="w-3 h-3" />
            {product.rating.rate}
          </div>
        )}
      </div>
      <div className="product-info">
        <p className="product-category">{product.category}</p>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-price-section">
          <span className="product-price">${product.price}</span>
          {product.rating && (
            <span className="product-reviews">({product.rating.count} reviews)</span>
          )}
        </div>
        <button
          className="add-to-cart-btn"
          onClick={() => handleAddToCart(product)}
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );

  // Error state
  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h1 className="error-title">Oops! Something went wrong</h1>
          <p className="error-message">{error}</p>
          <button onClick={fetchProducts} className="retry-btn">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      <style jsx>{`
        .homepage {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        .main-title {
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          margin-bottom: 2rem;
          letter-spacing: -2px;
        }

        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .search-container {
          position: relative;
          flex: 1;
          max-width: 400px;
        }

        .search-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          border: 2px solid rgba(102, 126, 234, 0.2);
          border-radius: 25px;
          font-size: 1rem;
          background: rgba(255, 255, 255, 0.9);
          transition: all 0.3s ease;
          outline: none;
        }

        .search-input:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #667eea;
        }

        .filters {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .filter-select {
          padding: 0.75rem 1rem;
          border: 2px solid rgba(102, 126, 234, 0.2);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.9);
          font-size: 0.9rem;
          color: #374151;
          transition: all 0.3s ease;
          outline: none;
          cursor: pointer;
        }

        .filter-select:hover {
          border-color: #667eea;
          transform: translateY(-1px);
        }

        .filter-select:focus {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .main-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 3rem 2rem;
        }

        .results-info {
          text-align: center;
          margin-bottom: 3rem;
          color: rgba(255, 255, 255, 0.9);
          font-size: 1.1rem;
          font-weight: 500;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        .product-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .product-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
        }

        .product-image-container {
          position: relative;
          height: 280px;
          overflow: hidden;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.4s ease;
          padding: 1rem;
        }

        .product-card:hover .product-image {
          transform: scale(1.1);
        }

        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .overlay-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #667eea;
        }

        .overlay-btn:hover {
          background: white;
          transform: scale(1.1);
        }

        .overlay-btn.favorited {
          background: #ef4444;
          color: white;
        }

        .product-rating-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: white;
          padding: 0.5rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .product-info {
          padding: 1.5rem;
        }

        .product-category {
          font-size: 0.8rem;
          color: #667eea;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 1px;
          margin-bottom: 0.5rem;
        }

        .product-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 1rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 2.8rem;
        }

        .product-price-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .product-price {
          font-size: 1.5rem;
          font-weight: 700;
          color: #059669;
        }

        .product-reviews {
          font-size: 0.8rem;
          color: #6b7280;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .add-to-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .empty-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .empty-message {
          font-size: 1rem;
          opacity: 0.8;
        }

        .error-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2rem;
        }

        .error-content {
          text-align: center;
          color: white;
          max-width: 500px;
        }

        .error-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
        }

        .error-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }

        .error-message {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          opacity: 0.9;
        }

        .retry-btn {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          padding: 1rem 2rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .retry-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        /* Skeleton Loading Styles */
        .skeleton {
          background: rgba(255, 255, 255, 0.8);
          pointer-events: none;
        }

        .skeleton-image {
          height: 280px;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
        }

        .skeleton-content {
          padding: 1.5rem;
        }

        .skeleton-line {
          height: 1rem;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 4px;
          margin-bottom: 1rem;
        }

        .skeleton-title {
          height: 1.5rem;
          width: 80%;
        }

        .skeleton-category {
          height: 1rem;
          width: 60%;
        }

        .skeleton-price {
          height: 1.25rem;
          width: 40%;
        }

        .skeleton-button {
          height: 2.5rem;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 12px;
          margin-top: 1rem;
        }

        @keyframes loading {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .main-title {
            font-size: 2.5rem;
          }
          
          .controls {
            flex-direction: column;
            align-items: stretch;
          }
          
          .search-container {
            max-width: none;
          }
          
          .filters {
            justify-content: center;
          }
          
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1.5rem;
          }
          
          .header-content {
            padding: 1.5rem;
          }
          
          .main-content {
            padding: 2rem 1rem;
          }
        }

        /* Floating Cart Icon */
        .floating-cart {
          position: fixed;
          bottom: 32px;
          right: 32px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 50%;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(102, 126, 234, 0.2);
          z-index: 2000;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .floating-cart:hover {
          transform: scale(1.08) translateY(-4px);
        }
        .cart-count {
          position: absolute;
          top: 10px;
          right: 10px;
          background: #ef4444;
          color: white;
          border-radius: 50%;
          padding: 0.2em 0.6em;
          font-size: 1rem;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.2);
        }
      `}</style>

      {/* Header */}
      <div className="header">
        <div className="header-content">
          <h1 className="main-title">Premium Collection</h1>
          
          <div className="controls">
            <div className="search-container">
              <Search className="search-icon w-5 h-5" />
              <input
                type="text"
                placeholder="Search amazing products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filters">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="default">Sort by</option>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {cartFeedback && (
          <div style={{
            position: "fixed",
            top: 80,
            right: 30,
            background: "#059669",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: 12,
            fontWeight: 600,
            zIndex: 9999,
            boxShadow: "0 4px 24px rgba(5,150,105,0.2)"
          }}>
            {cartFeedback}
          </div>
        )}
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <div className="results-info">
              <p>
                Showing {filteredAndSortedProducts.length} of {products.length} premium products
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "all" && ` in ${selectedCategory}`}
              </p>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">🔍</div>
                <h2 className="empty-title">No products found</h2>
                <p className="empty-message">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Floating Cart Icon */}
        <button
          className="floating-cart"
          aria-label="View Cart"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="w-7 h-7" />
          {cart.length > 0 && (
            <span className="cart-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default HomePage;