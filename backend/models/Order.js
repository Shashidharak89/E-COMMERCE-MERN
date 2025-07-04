import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  rate: { type: String, required: true },
  count: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  prdid: { type: String, required: true },
  prdtitle: { type: String, required: true },
  prdimg: { type: String, required: true },
  rating: ratingSchema,
  qty: { type: String, required: true },
  adress: { type: String, required: true },
  orderdate: { type: Date, default: Date.now },
  estdelivery: {
    type: Date,
    default: () => new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  status: {
    type: String,
    enum: ['pending', 'failed', 'delivered', 'transport'],
    default: 'pending',
  },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
