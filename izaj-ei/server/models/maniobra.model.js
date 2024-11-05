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

        diametroCable: {
            cantidad: {
                type: Number,
                required: true,
            },

            unidad: {
                type: String,
                required: true,
                enum: ['mm', 'pulgadas'],
            },
        },

        capacidadCarga: {
            type: Number,
            required: false
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Maniobra', maniobraSchema);