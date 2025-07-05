import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Heart, Share2, Check } from "lucide-react";
import SampleContext from "../contexts/SampleContext";
import axios from "axios";
import "./styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cartFeedback, setCartFeedback] = useState("");

  const { URL, userId, islogin } = useContext(SampleContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product:", err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = async () => {
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
    setAddingToCart(true);

    try {
      // Add items to cart based on quantity
      for (let i = 0; i < quantity; i++) {
        await axios.post(URL + "/api/cart/add", {
          userid: userId,
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          rating: product.rating,
          qty: 1
        });
      }

      console.log("Added to cart");
      
      // Remove from adding state and add to added state
      setAddingToCart(false);
      setAddedToCart(true);

      setCartFeedback(`Added ${quantity} item(s) to cart!`);
      setTimeout(() => setCartFeedback(""), 3000);

      // Remove from added state after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);

    } catch (error) {
      console.error("Add to Cart Error:", error);
      setCartFeedback("Failed to add to cart!");
      setTimeout(() => setCartFeedback(""), 3000);
      
      // Remove from adding state
      setAddingToCart(false);
    }
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out this product: ${product.title}`,
          url: currentUrl,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        // Fallback to clipboard
        fallbackCopyToClipboard(currentUrl);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      fallbackCopyToClipboard(currentUrl);
    }
  };

  const fallbackCopyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Product link copied to clipboard!');
      }).catch(() => {
        // Final fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Product link copied to clipboard!');
      });
    } else {
      // Very old browser fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Product link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="product-details-loading">
        <div className="product-details-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-not-found">
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/" className="product-details-back-link">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <style jsx>{`
        .product-details-cart-feedback {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #22c55e;
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-weight: 500;
          z-index: 1000;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          animation: slideIn 0.3s ease-out;
        }

        .product-details-cart-feedback.error {
          background: #ef4444;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .product-details-add-to-cart {
          transition: all 0.3s ease;
        }

        .product-details-add-to-cart:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .product-details-add-to-cart.adding {
          background: #3b82f6;
        }

        .product-details-add-to-cart.added {
          background: #22c55e;
        }

        .product-details-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid currentColor;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          display: inline-block;
          margin-right: 8px;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .product-details-share-btn {
          transition: all 0.3s ease;
        }

        .product-details-share-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div className="product-details-wrapper">
        {/* Cart Feedback */}
        {cartFeedback && (
          <div className={`product-details-cart-feedback ${cartFeedback.includes('Failed') ? 'error' : ''}`}>
            {cartFeedback}
          </div>
        )}

        {/* Navigation */}
        <div className="product-details-navigation">
          <Link to="/" className="product-details-back-btn">
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
          <button className="product-details-share-btn" onClick={handleShare}>
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>

        {/* Main Content */}
        <div className="product-details-main">
          {/* Image Section */}
          <div className="product-details-image-section">
            <div className="product-details-image-container">
              <img 
                src={product.image} 
                alt={product.title} 
                className="product-details-main-image"
              />
              {product.rating && (
                <div className="product-details-rating-badge">
                  <Star className="w-4 h-4" />
                  {product.rating.rate}
                </div>
              )}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="product-details-info-section">
            <div className="product-details-category">
              {product.category}
            </div>
            
            <h1 className="product-details-title">
              {product.title}
            </h1>

            <div className="product-details-rating-section">
              {product.rating && (
                <>
                  <div className="product-details-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating.rate)
                            ? 'product-details-star-filled'
                            : 'product-details-star-empty'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="product-details-rating-text">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </>
              )}
            </div>

            <div className="product-details-price">
              ${product.price}
            </div>

            <div className="product-details-description">
              <h3>Description</h3>
              <p>{product.description}</p>
            </div>

            {/* Quantity and Actions */}
            <div className="product-details-actions">
              <div className="product-details-quantity-section">
                <label className="product-details-quantity-label">Quantity:</label>
                <div className="product-details-quantity-controls">
                  <button
                    className="product-details-quantity-btn"
                    onClick={() => handleQuantityChange('decrement')}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="product-details-quantity-display">
                    {quantity}
                  </span>
                  <button
                    className="product-details-quantity-btn"
                    onClick={() => handleQuantityChange('increment')}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="product-details-buttons">
                <button 
                  className={`product-details-add-to-cart ${addingToCart ? 'adding' : ''} ${addedToCart ? 'added' : ''}`}
                  onClick={handleAddToCart}
                  disabled={addingToCart || addedToCart}
                >
                  {addingToCart ? (
                    <>
                      <div className="product-details-spinner" />
                      Adding to Cart...
                    </>
                  ) : addedToCart ? (
                    <>
                      <Check className="w-5 h-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button 
                  className={`product-details-favorite-btn ${isFavorite ? 'product-details-favorited' : ''}`}
                  onClick={toggleFavorite}
                >
                  <Heart className="w-5 h-5" fill={isFavorite ? '#fbbf24' : 'none'} />
                  {isFavorite ? 'Favorited' : 'Add to Favorites'}
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="product-details-specs">
              <h3>Product Details</h3>
              <div className="product-details-specs-grid">
                <div className="product-details-spec-item">
                  <span className="product-details-spec-label">Category:</span>
                  <span className="product-details-spec-value">{product.category}</span>
                </div>
                <div className="product-details-spec-item">
                  <span className="product-details-spec-label">Price:</span>
                  <span className="product-details-spec-value">${product.price}</span>
                </div>
                {product.rating && (
                  <div className="product-details-spec-item">
                    <span className="product-details-spec-label">Rating:</span>
                    <span className="product-details-spec-value">{product.rating.rate}/5</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;