import { Schema, model } from 'mongoose';

const cargasSchema = new Schema(
    {
        item: {
            type: Number,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
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
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Cargas', cargasSchema);