import express from 'express';
import clothesRouter from './ClothesRouter.js';
import orderRouter from './OrdersRouter.js';
import userRouter from './UserRouter.js';
import multer from 'multer';
import path from 'path';
import { create } from '../controllers/ClothesController.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/clothes', clothesRouter);
router.use('/orders', orderRouter);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/clothes', upload.array('images', 5), create);

export default router;
