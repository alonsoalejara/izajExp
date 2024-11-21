import { Schema, model } from 'mongoose';

const setupIzajeSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },
        grua: {
            type: Schema.Types.ObjectId,
            ref: 'Grua',
            required: true
        },
        maniobra: {
            type: Schema.Types.ObjectId,
            ref: 'Maniobra',
            required: true
        },
        carga: {
            type: Schema.Types.ObjectId,
            ref: 'Carga',
            required: true
        },
        capacidad: {
            type: Schema.Types.ObjectId,
            ref: 'Capacidad',
            required: true
        },
        grilletes: {
            type: Schema.Types.ObjectId,
            ref: 'Grilletes',
            required: true
        },
        porcentajeCapacidad: {
            type: Number
        },
        observaciones: {
            type:String
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('SetupIzaje', setupIzajeSchema);
