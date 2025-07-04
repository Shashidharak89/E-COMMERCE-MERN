import express from 'express';
import { addToCart, getUserCart, deleteCartItem } from '../controllers/cartController.js';

const router = express.Router();

router.post('/add', addToCart);
router.get('/user/:userid', getUserCart);
router.delete('/:id', deleteCartItem);

export default router;
