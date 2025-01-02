import { Schema, model } from 'mongoose';

const cargasSchema = new Schema(
    {
        pesoEquipo: {
            type: Schema.Types.ObjectId,
            ref: 'Grua',
            required: true
        },
        pesoAparejos: {
            type: Number,
            required: true
        },
        pesoGancho: {
            type: Schema.Types.ObjectId,
            ref: 'Grua',
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
            type: Schema.Types.ObjectId,
            ref: 'Grua',
            required: true
        },
        porcentajeUtilizacion: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Cargas', cargasSchema);