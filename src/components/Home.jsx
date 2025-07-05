import React, { useEffect, useState, useCallback, useMemo, useContext } from "react";
import { Search, Filter, ShoppingCart, Star, RefreshCw, Heart, Eye, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import SampleContext from "../contexts/SampleContext";
import axios from "axios";
import "./styles/Home.css";

const Home = () => {
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
  const [addingToCart, setAddingToCart] = useState(new Set());
  const [addedToCart, setAddedToCart] = useState(new Set());
  
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const { URL, userId, islogin } = useContext(SampleContext);

  // Fetch products with axios
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
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

  const handleAddToCart = async (product) => {
    // Check if user is logged in
    if (!islogin) {
      alert("Please log in to add items to cart.");
      return;
    }

    if (!userId) {
      alert("Please log in to add items to cart.");
      return;
    }

    // Set adding state
    setAddingToCart(prev => new Set([...prev, product.id]));

    try {
      const response = await axios.post(URL + "/api/cart/add", {
        userid: userId,
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        rating: product.rating,
        qty: 1
      });

      console.log("Added to cart");
      console.log("Cart Add Response:", response.data);

      // Remove from adding state and add to added state
      setAddingToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });

      setAddedToCart(prev => new Set([...prev, product.id]));

      setCartFeedback(`Added '${product.title}' to cart!`);
      setTimeout(() => setCartFeedback(""), 2000);

      // Remove from added state after 2 seconds
      setTimeout(() => {
        setAddedToCart(prev => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      }, 2000);

    } catch (error) {
      console.error("Add to Cart Error:", error);
      setCartFeedback("Failed to add to cart!");
      setTimeout(() => setCartFeedback(""), 2000);
      
      // Remove from adding state
      setAddingToCart(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="home-products-grid">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="home-product-card home-skeleton">
          <div className="home-skeleton-image"></div>
          <div className="home-skeleton-content">
            <div className="home-skeleton-line home-skeleton-title"></div>
            <div className="home-skeleton-line home-skeleton-category"></div>
            <div className="home-skeleton-line home-skeleton-price"></div>
            <div className="home-skeleton-button"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const ProductCard = ({ product }) => {
    const isAdding = addingToCart.has(product.id);
    const isAdded = addedToCart.has(product.id);

    return (
      <div className="home-product-card">
        <div className="home-product-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="home-product-image"
            loading="lazy"
          />
          <div className="home-product-overlay">
            <button
              className="home-overlay-btn"
              aria-label="View Product"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              className="home-overlay-btn"
              aria-label="Add to Cart"
              onClick={() => handleAddToCart(product)}
              disabled={isAdding || isAdded}
            >
              {isAdding ? (
                <div className="home-spinner" />
              ) : isAdded ? (
                <Check className="w-5 h-5" />
              ) : (
                <ShoppingCart className="w-5 h-5" />
              )}
            </button>
            <button
              className={`home-overlay-btn ${favorites.has(product.id) ? "home-favorited" : ""}`}
              aria-label={favorites.has(product.id) ? "Remove from Favorites" : "Add to Favorites"}
              onClick={() => toggleFavorite(product.id)}
            >
              <Heart className="w-5 h-5" fill={favorites.has(product.id) ? "#FFD700" : "none"} />
            </button>
          </div>
          {product.rating && (
            <div className="home-product-rating-badge">
              <Star className="w-3 h-3" />
              {product.rating.rate}
            </div>
          )}
        </div>
        <div className="home-product-info">
          <p className="home-product-category">{product.category}</p>
          <h3 className="home-product-title">{product.title}</h3>
          <div className="home-product-price-section">
            <span className="home-product-price">${product.price}</span>
            {product.rating && (
              <span className="home-product-reviews">({product.rating.count} reviews)</span>
            )}
          </div>
          <button
            className={`home-add-to-cart-btn ${isAdding ? 'home-adding' : ''} ${isAdded ? 'home-added' : ''}`}
            onClick={() => handleAddToCart(product)}
            disabled={isAdding || isAdded}
          >
            {isAdding ? (
              <>
                <div className="home-spinner" />
                Adding...
              </>
            ) : isAdded ? (
              <>
                <Check className="w-4 h-4" />
                Added to Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  // Error state
  if (error) {
    return (
      <div className="home-error-container">
        <div className="home-error-content">
          <div className="home-error-icon">⚠</div>
          <h1 className="home-error-title">Oops! Something went wrong</h1>
          <p className="home-error-message">{error}</p>
          <button onClick={fetchProducts} className="home-retry-btn">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Header */}
      <div className="home-header">
        <div className="home-header-content">
          <h1 className="home-main-title">Premium Collection</h1>
          
          <div className="home-controls">
            <div className="home-search-container">
              <Search className="home-search-icon w-5 h-5" />
              <input
                type="text"
                placeholder="Search amazing products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="home-search-input"
              />
            </div>
            
            <div className="home-filters">
              <Filter className="w-5 h-5 home-filter-icon" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="home-filter-select"
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
                className="home-filter-select"
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
      <div className="home-main-content">
        {cartFeedback && (
          <div className="home-cart-feedback">
            {cartFeedback}
          </div>
        )}
        
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <div className="home-results-info">
              <p>
                Showing {filteredAndSortedProducts.length} of {products.length} premium products
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== "all" && ` in ${selectedCategory}`}
              </p>
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className="home-empty-state">
                <div className="home-empty-icon">🔍</div>
                <h2 className="home-empty-title">No products found</h2>
                <p className="home-empty-message">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="home-products-grid">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Floating Cart Icon */}
        <button
          className="home-floating-cart"
          aria-label="View Cart"
          onClick={() => navigate("/cart")}
        >
          <ShoppingCart className="w-7 h-7" />
          {cart.length > 0 && (
            <span className="home-cart-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Home;