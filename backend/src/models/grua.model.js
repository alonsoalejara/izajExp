import { Schema, model } from 'mongoose';

const gruaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la grúa es obligatorio'],
      unique: true,
      trim: true,
    },

    largoPluma: {
      type: Number,
      required: [true, 'El largo de la pluma es obligatorio'],
      min: [0, 'El largo de la pluma no puede ser negativo'],
    },
    contrapeso: {
      type: Number,
      required: [true, 'El contrapeso es obligatorio'],
      min: [0, 'El contrapeso no puede ser negativo'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('Grua', gruaSchema);
