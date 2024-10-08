import { Router } from 'express';
import {createOrder, getOrders, updateOrderStatus} from "../controllers/OrderController.js";

const router = Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.patch('/status/:id', updateOrderStatus);

export default router;
