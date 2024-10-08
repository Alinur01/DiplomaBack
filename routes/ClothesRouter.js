import { Router } from 'express';
import { getAll, getOne, remove, update } from '../controllers/ClothesController.js';
import upload from "../upload.js";

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.delete('/:id', remove);
router.patch('/:id', upload.array('images'), update);


export default router;
