import Maniobra from '../../models/maniobra.model.js';

const calcularCapacidadCarga = (diametro, unidad, cantidad) => {
    let capacidadPorCable;
    if (unidad === 'pulgadas') {
        capacidadPorCable = diametro * 2.5; 
    } else if (unidad === 'mm') {
        capacidadPorCable = diametro * 0.1;
    } else {
        throw new Error('Unidad no válida');
    }
    return capacidadPorCable * cantidad;
};

export const crearManiobra = async (req, res) => {
    try {
        const { cantidad, tipo, diametroCable } = req.body;

        const capacidadCarga = calcularCapacidadCarga(diametroCable.cantidad, diametroCable.unidad, cantidad);

        const nuevaManiobra = new Maniobra({
            cantidad,
            tipo,
            diametroCable,
            capacidadCarga,
        });

        const maniobraGuardada = await nuevaManiobra.save();
        res.status(201).json(maniobraGuardada);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear maniobra', error: error.message });
    }
};