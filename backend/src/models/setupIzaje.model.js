import { Schema, model } from 'mongoose';

const setupIzajeSchema = new Schema(
    {
        usuario: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
        },
        aparejos: {
            type: Schema.Types.ObjectId,
            ref: 'Aparejos',
            required: true
        },
        datos: {
            type: Schema.Types.ObjectId,
            ref: 'Datos',
            required: true
        },
        cargas: {
            type: Schema.Types.ObjectId,
            ref: 'Cargas',
            required: true
        },
        forma: {
            type: Schema.Types.ObjectId,
            ref: 'Forma',
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('SetupIzaje', setupIzajeSchema);
