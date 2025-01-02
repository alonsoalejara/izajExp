import { Schema, model } from 'mongoose';

const datosSchema = new Schema(
    {
        largoPluma: {
            type: Schema.Types.ObjectId,
            ref: 'Grua',
            required: true
        },
        contrapeso: {
            type: Schema.Types.ObjectId,
            ref: 'Grua',
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Datos', datosSchema);
