import { Schema, model } from 'mongoose';

const capacidadSchema = new Schema(
    {
        capacidadInicial: {
            type: Number,
            required: true
        },
        capacidadFinal: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Capacidad', capacidadSchema);