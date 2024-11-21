import { Schema, model } from 'mongoose';

const usuarioSchema = new Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        especialidad: { 
            type: String, 
            required: true, 
            enum: ['Estructura', 'Obras Civiles (OOCC)', 'Piping', 'Mecánica', 'Eléctrica'] 
        },
        rut: {
            type: String,
            required: true,
            unique: true
        },
        telefono: {
            type: String,
            required: true
        },
        correo: { 
            type: String,
            required: true,
            unique: true
        },
        rol: { 
            type: String, 
            required: true, 
            enum: ['Maestro Mayor', 'Capataz', 'Supervisor'] 
        },
    },
    { 
        timestamps: true,
        versionKey: false
    }
);

export default model('Usuario', usuarioSchema);
