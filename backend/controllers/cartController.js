import Cart from '../models/Cart.js';

// Add to cart
export const addToCart = async (req, res) => {
  try {
    const { userid, productId, title, price, image, rating, qty } = req.body;

    const newCartItem = new Cart({
      userid,
      productId,
      title,
      price,
      image,
      rating,
      qty,
    });

    await newCartItem.save();
    res.status(201).json({ message: 'Product added to cart', cartItem: newCartItem });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add to cart', details: err.message });
  }
};

// Get all cart items for a user
export const getUserCart = async (req, res) => {
  try {
    const { userid } = req.params;
    const cartItems = await Cart.find({ userid });
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve cart items' });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { userid } = req.body; // or from req.query or req.user if using authentication

    // Ensure both ID and UserID match
    const deleted = await Cart.findOneAndDelete({ _id: id, userid });

    if (deleted) {
      res.json({ message: 'Item removed from cart', deleted });
    } else {
      res.status(404).json({ error: 'Cart item not found or does not belong to the user' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete cart item' });
  }
};

