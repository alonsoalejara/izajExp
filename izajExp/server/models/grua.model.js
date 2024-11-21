import { Schema, model } from 'mongoose';

const gruaSchema = new Schema(
    {
        tipo: { 
            type: String, 
            required: true, 
            enum: ['Terex RT555', 'Grua Ejemplo'] 
        },
        radioIzaje: {
            type: Number,
            required: true
        },
        radioMontaje: {
            type: Number,
            required: true
        },
    }, 
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Grua', gruaSchema);
