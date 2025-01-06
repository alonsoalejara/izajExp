import { Schema, model } from 'mongoose';

const setupIzajeSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        aparejos: [{
            descripcion: { type: String, required: true },
            cantidad: { type: Number, required: true },
            pesoUnitario: { type: Number, required: true },
            pesoTotal: { type: Number, required: true },
        }],
        datos: {
            largoPluma: {
                type: Number,
                required: true
            },
            contrapeso: {
                type: Number,
                required: true
            }
        },
        cargas: {
            pesoEquipo: {
                type: Number,
                required: true
            },
            pesoAparejos: {
                type: Number,
                required: true
            },
            pesoGancho: {
                type: Number,
                required: true
            },
            pesoTotal: {
                type: Number,
                required: true
            },
            radioTrabajoMax: {
                type: Number,
                required: true
            },
            capacidadLevante: {
                type: Number,
                required: true
            },
            porcentajeUtilizacion: {
                type: Number,
                required: true
            }
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('SetupIzaje', setupIzajeSchema);
