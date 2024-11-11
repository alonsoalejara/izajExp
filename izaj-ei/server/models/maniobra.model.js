import { Schema, model } from 'mongoose';

const maniobraSchema = new Schema(
    {
        cantidad: {
            type: Number,
            required: true,
            enum: [1, 2, 4],
        },
        
        tipo: {
            type: String,
            required: true,
            enum: ['Eslinga', 'Estrobo'],
        },

        radioInicial: {
            type: Number,
            required: true,
        },

        radioFinal: {
            type: Number,
            required: true,
        },

        longitudPluma: {
            type: Number,
            required: true,
        },

        angulo: {
            type: Number,
            required: true,
        },

        datosCarga: {
            pesoGancho: { type: Number, required: true }, 
            pesoHerramientas: { type: Number, required: true }, 
            pesoCarga: { type: Number, required: true },
            otrosPesos: { type: Number, required: true },
            cargaBruta: { type: Number, required: false },
        },

        capacidades: {
            capacidadInicial: { type: Number, required: true },
            capacidadFinal: { type: Number, required: true },
        },

        capacidadCarga: {
            type: Number,
            required: false
        },

        porcentajeCapacidad: {
            type: Number,
            required: false
        },

        observaciones: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Maniobra', maniobraSchema);