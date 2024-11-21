import { Schema, model } from 'mongoose';

const grilletesSchema = new Schema(
    {
        cantidad: {
            type: Number,
            required: true,
            enum: [1, 2]
        },
        tipo: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('Grilletes', grilletesSchema);