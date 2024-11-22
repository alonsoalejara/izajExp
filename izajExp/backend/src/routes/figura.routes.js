import { Router } from 'express';
import {
    getFiguras,
    createFiguras,
    getFigurasById,
    updateFiguras,
    deleteFiguras,
} from '../controller/figura.controller.js';

const router = Router();

router.get('/', getFiguras);
router.get('/:id', getFigurasById);
router.post('/', createFiguras);
router.put('/:id', updateFiguras);
router.delete('/:id', deleteFiguras);

export default router;