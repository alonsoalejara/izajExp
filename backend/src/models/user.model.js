import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const { genSalt, hash, compare } = bcryptjs;
import { ROLES } from "../constants/roles.constants.js";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
