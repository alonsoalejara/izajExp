import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema(
    {
        nombre: String,
        tipoUsuario: String,
        especialidad: String,
        rut: Number,
        telefono: Number,
        correo: String
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Usuario', usuarioSchema);