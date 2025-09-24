import { Schema, model } from 'mongoose';

const proyectoSchema = new Schema(
    {
        nombre: {
            type: String,
            required: [true, 'El nombre del proyecto es obligatorio'],
            unique: true,
            trim: true,
        },
        cliente: {
            type: String,
            required: [true, 'El cliente es obligatorio'],
        },
        ubicacion: {
            type: String,
            required: [true, 'La ubicación es obligatoria'],
        },
        descripcion: {
            type: String,
            required: false,
        },
        fechaInicio: {
            type: Date,
            required: false,
        },
        fechaFin: {
            type: Date,
            required: false,
        },
        estado: {
            type: String,
            enum: ['En curso', 'Completado', 'Pausado', 'Cancelado'],
            default: 'En curso',
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Proyecto', proyectoSchema);