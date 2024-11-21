import { Schema, model } from 'mongoose';

const maniobraSchema = new Schema(
    {
        cantidad: {
            type: Number,
            required: true,
            enum: [1, 2, 4] 
        },
        tipo: {
            type: String,
            required: true,
            enum: ['Eslinga', 'Estrobo']
        },
        radioInicial: {
            type: Number,
            required: true
        },
        radioFinal: {
            type: Number,
            required: true
        },
        longitudPluma: {
            type: Number,
            required: true
        },
        angulo: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Maniobra', maniobraSchema);
