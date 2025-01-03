import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const { genSalt, hash, compare } = bcryptjs;
import { ROLES } from "../constants/roles.constants.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      match: [/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s-]+$/, 'El nombre solo puede contener letras, tildes, espacios y guiones'],
      set: (value) => {
        return value
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      },
    },
    apellido: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
      match: [/^[A-Za-záéíóúÁÉÍÓÚüÜñÑ\s-]+$/, 'El apellido solo puede contener letras, tildes, espacios y guiones'],
      set: (value) => {
        return value
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(' ');
      },
    },
    password: {
      type: String,
      required: true,
    },
    rut: {
      type: String,
      required: [true, 'El RUT es obligatorio'],
      unique: true,
      match: [/^\d{7,8}-[0-9Kk]{1}$/, 'El RUT debe seguir el formato X-Y, donde X es un número entre 1.000.000 y 99.999.999, y Y es un número o "K" mayúscula.'],
    },
    phone: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
      match: [/^\+569\d{8}$/, 'El teléfono debe seguir el formato +569 seguido de 8 dígitos'],
    },
    specialty: {
      type: String,
      required: [true, 'La especialidad es obligatoria'],
      enum: {
        values: ['Estructura', 'Obras Civiles', 'Piping', 'Mecánica', 'Eléctrica'],
        message: 'La especialidad debe ser una de las siguientes: Estructura, Obras Civiles, Piping, Mecánica, Eléctrica',
      },
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      unique: true,
      match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Por favor ingrese un correo electrónico válido'],
    },
    roles: [
      {
        type: String,
        enum: [ROLES.USER, ROLES.ADMIN], // Roles predefinidos usando las constantes
        required: true,
      },
    ],
  },
  {
    versionKey: false,
  }
);

// Métodos para encriptar y comparar contraseñas
userSchema.statics.encryptPassword = async (password) => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  try {
    const result = await compare(password, receivedPassword);
    return result;
  } catch (error) {
    console.error("Error en comparación de contraseñas", error);
    throw new Error("Error al comparar las contraseñas");
  }
};

export const User = mongoose.model("User", userSchema);
export default User;
