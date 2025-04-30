import { Schema, model } from 'mongoose';

const gruaSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre de la grúa es obligatorio'],
      unique: true,
      trim: true,
    },
    pesoEquipo: {
      type: Number,
      required: [true, 'El peso del equipo es obligatorio'],
      min: [0, 'El peso no puede ser negativo'],
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
    capacidadLevante: {
      type: Number,
      required: [true, 'La capacidad de levante es obligatoria'],
      min: [0, 'La capacidad de levante no puede ser negativa'],
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
