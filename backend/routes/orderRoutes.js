import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrdersByUserId,
  updateDeliveredOrders,
} from '../controllers/orderController.js';

const router = express.Router();

router.post('/create', createOrder);
router.get('/all', getAllOrders);
router.get('/user/:userid', getOrdersByUserId);
router.get('/check-delivered', updateDeliveredOrders);

export default router;
