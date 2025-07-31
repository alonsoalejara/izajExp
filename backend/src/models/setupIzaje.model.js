import { Schema, model } from 'mongoose';

const setupIzajeSchema = new Schema(
    {
        nombreProyecto: { type: String, required: true },
        capataz: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        supervisor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        jefeArea: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        firmaSupervisor: {
            type: String,
            required: [true, 'La firma del supervisor es obligatoria'],
            default: null // Aunque es requerido, un valor por defecto para inicialización.
                         // Se espera que la aplicación envíe el valor real.
        },
        firmaJefeArea: {
            type: String,
            required: [true, 'La firma del jefe de área es obligatoria'],
            default: null // Similar al anterior
        },
        aparejos: [{
            descripcion: { type: String, required: true },
            cantidad: { type: Number, required: true },
            pesoUnitario: { type: Number, required: true },
            pesoTotal: { type: Number, required: true },
            largo: { type: Number, required: true },
            grillete: { type: String, required: true },
            pesoGrillete: { type: Number, required: true },
            tension: { type: String, required: true },
            altura: { type: String, required: true },
        }],
        grua: { type: Schema.Types.ObjectId, ref: 'Grua', required: true },
        datos: {
            largoPluma: { type: Number, required: true },
            contrapeso: { type: Number, required: true },
            gradoInclinacion: { type: String, required: true }
        },
        cargas: {
            pesoEquipo: { type: Number, required: true },
            pesoAparejos: { type: Number, required: true },
            pesoGancho: { type: Number, required: true },
            pesoCable: { type: Number, required: true },
            pesoTotal: { type: Number, required: true },
            radioTrabajoMax: { type: Number, required: true },
            anguloTrabajo: { type: String, required: true },
            capacidadLevante: { type: Number, required: true },
            porcentajeUtilizacion: { type: Number, required: true }
        },
        centroGravedad: {
            diametro: { type: Number, required: true },
            xAncho: { type: Number, required: true },
            yLargo: { type: Number, required: true },
            zAlto: { type: Number, required: true },
            xCG: { type: Number, required: true },
            yCG: { type: Number, required: true },
            zCG: { type: Number, required: true },
            xPR: { type: Number, required: true },
            yPR: { type: Number, required: true },
            zPR: { type: Number, required: true }
        },
        version: {
            type: Number,
            required: [true, 'La versión es obligatoria'],
            enum: [0, 1, 2, 3], // Solo permite estos valores
            default: 0 // Valor por defecto al crear un nuevo documento
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('SetupIzaje', setupIzajeSchema);