import { Router } from 'express';
import { register, getMe, login, getAllUser, handleFavorites, handleOrders, handleStatus } from '../controllers/UserController.js';
import { loginValidation, registerValidation } from '../validations/validations.js';
import checkAuth from '../utils/checkAuth.js';

const router = Router();

router.post('/auth/login', loginValidation, login);
router.post('/auth/register', registerValidation, register);
router.get('/me', checkAuth, getMe);
router.get('/', getAllUser);
router.patch('/favorites/:id', handleFavorites);
router.patch('/:id', handleOrders);
router.patch('/status/:id', handleStatus);

export default router;
