import { Schema, model } from 'mongoose';

const formaSchema = new Schema(
    {
        codigo: {
        type: String,
        required: [true, 'El código es obligatorio'],
        unique: true,
        trim: true,
        },
        tipo: {
        type: String,
        required: [true, 'El tipo de forma es obligatorio'],
        enum: ['Cuadrado', 'Triángulo', 'Círculo'],
        },
        peso: {
        type: Number,
        required: [true, 'El peso es obligatorio'],
        min: [0, 'El peso no puede ser negativo'],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Forma', formaSchema);
