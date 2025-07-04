import Order from '../models/Order.js';

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { userid, prdid, prdtitle, prdimg, rating, qty, adress } = req.body;

    const newOrder = new Order({
      userid,
      prdid,
      prdtitle,
      prdimg,
      rating,
      qty,
      adress,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order', details: err.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get orders by user ID
export const getOrdersByUserId = async (req, res) => {
  try {
    const { userid } = req.params;
    const orders = await Order.find({ userid });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user orders' });
  }
};

// Auto-update orders to delivered if estdelivery is due
export const updateDeliveredOrders = async (req, res) => {
  try {
    const today = new Date();
    const updated = await Order.updateMany(
      { estdelivery: { $lte: today }, status: { $ne: 'delivered' } },
      { $set: { status: 'delivered' } }
    );

    res.json({
      message: 'Updated delivered orders',
      updatedCount: updated.modifiedCount,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update delivery status' });
  }
};
