import express from 'express';
import { signup, login } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protected route using token in URL
router.get('/profile/:token', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'Authorized user!',
    user: req.user
  });
});

export default router;
