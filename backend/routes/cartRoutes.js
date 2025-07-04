import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
  rate: { type: Number, required: true },
  count: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  userid: { type: String, required: true },
  productId: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  rating: ratingSchema,
  qty: { type: Number, default: 1 },
  cartAddedDate: { type: Date, default: Date.now },
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
