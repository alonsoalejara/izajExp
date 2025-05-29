import { Schema, model } from 'mongoose';

const cgSchema = new Schema(
    {
        xAncho: {
            type: Number,
            required: true
        },
        yLargo: {
            type: Number,
            required: true
        },
        zAlto: {
            type: Number,
            required: true
        },
        xCG: {
            type: Number,
            required: true
        },
        yCG: {
            type: Number,
            required: true
        },
        zCG: {
            type: Number,
            required: true
        },
        xPR: {
            type: Number,
            required: true
        },
        yPR: {
            type: Number,
            required: true
        },
        zPR: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('CG', cgSchema);