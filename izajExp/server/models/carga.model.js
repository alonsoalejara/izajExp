import { Schema, model } from 'mongoose';

const datosCargaSchema = new Schema(
    {
        pesoGancho: {
            type: Number,
            required: true
        }, 
        pesoHerramientas: {
            type: Number,
            required: true
        }, 
        pesoCarga: {
            type: Number,
            required: true
        },
        otrosPesos: {
            type: Number,
            required: true
        },
        cargaBruta: {
            type: Number
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('DatosCarga', datosCargaSchema);