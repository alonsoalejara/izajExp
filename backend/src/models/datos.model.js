import { Schema, model } from 'mongoose';

const datosSchema = new Schema(
    {
        item: {
            type: Number,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        largoPluma: {
            type: Number,
            required: true
        },
        contrapeso: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Datos', datosSchema);
