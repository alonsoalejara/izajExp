import { Schema, model } from 'mongoose';

const aparejosSchema = new Schema(
    {
        descripcion: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        pesoUnitario: {
            type: Number,
            required: true
        },
        pesoTotal: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Aparejos', aparejosSchema);
