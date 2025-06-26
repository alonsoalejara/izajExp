import { Schema, model } from 'mongoose';

const revisionHistorySchema = new Schema({
    revisionDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
}, { _id: false });

const setupIzajeSchema = new Schema(
    {
        nombreProyecto: { type: String, required: true },
        capataz: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        supervisor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        jefeArea: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        aparejos: [{
            descripcion: { type: String, required: true },
            cantidad: { type: Number, required: true },
            pesoUnitario: { type: Number, required: true },
            pesoTotal: { type: Number, required: true },
            largo: { type: Number, required: true },
            grillete: { type: String, required: true },
            pesoGrillete: { type: Number, required: true },
            tension: { type: String, required: true }
        }],
        grua: { type: Schema.Types.ObjectId, ref: 'Grua', required: true },
        datos: {
            largoPluma: { type: Number, required: true },
            contrapeso: { type: Number, required: true },
            gradoInclinacion: { type: String, required: true }
        },
        cargas: {
            pesoEquipo: { type: Number, required: true },
            pesoAparejos: { type: Number, required: true },
            pesoGancho: { type: Number, required: true },
            pesoCable: { type: Number, required: true },
            pesoTotal: { type: Number, required: true },
            radioTrabajoMax: { type: Number, required: true },
            anguloTrabajo: { type: String, required: true },
            capacidadLevante: { type: Number, required: true },
            porcentajeUtilizacion: { type: Number, required: true }
        },
        centroGravedad: {
            xAncho: { type: Number, required: true },
            yLargo: { type: Number, required: true },
            zAlto: { type: Number, required: true },
            xCG: { type: Number, required: true },
            yCG: { type: Number, required: true },
            zCG: { type: Number, required: true },
            xPR: { type: Number, required: true },
            yPR: { type: Number, required: true },
            zPR: { type: Number, required: true }
        },
        revisionCount: {
            type: Number,
            default: 0,
            min: 0,
            max: 3,
        },
        revisionHistory: {
            type: [revisionHistorySchema],
            default: [],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default model('SetupIzaje', setupIzajeSchema);