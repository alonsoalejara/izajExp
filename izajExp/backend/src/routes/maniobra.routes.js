import { Router } from 'express';
import { crearManiobra } from '../controller/maniobra.controller.js';

const router = Router();

// Ruta para crear una nueva maniobra
router.post('/', crearManiobra);

export default router;