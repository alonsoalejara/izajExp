import { Router } from 'express';
import {
    getUsuarios,
    createUsuarios,
    getUsuariosById,
    updateUsuarios,
    deleteUsuarios,
} from '../controller/usuario.controller.js';

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuariosById);
router.post('/', createUsuarios);
router.put('/:id', updateUsuarios);
router.delete('/:id', deleteUsuarios);

export default router;