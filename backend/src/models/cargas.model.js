import { Schema, model } from 'mongoose';

const cargasSchema = new Schema(
    {
        pesoEquipo: {
            type: Number,
            required: true
        },
        pesoAparejos: {
            type: Number,
            required: true
        },
        pesoGancho: {
            type: Number,
            required: [true, 'El peso del gancho es obligatorio'],
            min: [0, 'El peso no puede ser negativo'],
        },
        pesoCable: {
            type: Number,
            required: [true, 'El peso del gancho es obligatorio'],
            min: [0, 'El peso no puede ser negativo'],
        },
        pesoTotal: {
            type: Number,
            required: true
        },
        radioTrabajoMax: {
            type: Number,
            required: true
        },
        anguloTrabajo: {
            type: String,
            required: true
        },
        capacidadLevante: {
            type: Number,
            required: [true, 'La capacidad de levante es obligatoria'],
            min: [0, 'La capacidad de levante no puede ser negativa'],
        },
        porcentajeUtilizacion: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Cargas', cargasSchema);