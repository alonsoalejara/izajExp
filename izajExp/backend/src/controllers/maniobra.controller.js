import Maniobra from '../../models/maniobra.model.js';

const calcularCargaBruta = ({ pesoGancho, pesoHerramientas, pesoCarga, otrosPesos }) => {
    return pesoGancho + pesoHerramientas + pesoCarga + otrosPesos;
};

const calcularPorcentajeCapacidad = (cargaBruta, capacidadMenor) => {
    return (cargaBruta / capacidadMenor) * 100;
};

export const crearManiobra = async (req, res) => {
    try {
        const { cantidad, tipo, radioInicial, radioFinal, longitudPluma, angulo, datosCarga, capacidades } = req.body;

        // Calcular carga bruta
        const cargaBruta = calcularCargaBruta(datosCarga);

        // Determinar la capacidad menor
        const capacidadMenor = Math.min(capacidades.capacidadInicial, capacidades.capacidadFinal);

        // Calcular porcentaje de capacidad
        const porcentajeCapacidad = calcularPorcentajeCapacidad(cargaBruta, capacidadMenor);

        // Definir observaciones
        let observaciones = 'Se puede realizar el izaje sin restricciones.';
        if (porcentajeCapacidad >= 80) {
            observaciones = 'Requiere precaución, el porcentaje de capacidad es alto.';
        }

        // Crear nueva maniobra
        const nuevaManiobra = new Maniobra({
            cantidad,
            tipo,
            radioInicial,
            radioFinal,
            longitudPluma,
            angulo,
            datosCarga: {
                ...datosCarga,
                cargaBruta,
            },
            capacidades,
            capacidadCarga: capacidadMenor,
            porcentajeCapacidad,
            observaciones
        });

        const maniobraGuardada = await nuevaManiobra.save();
        res.status(201).json(maniobraGuardada);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear maniobra', error: error.message });
    }
};
