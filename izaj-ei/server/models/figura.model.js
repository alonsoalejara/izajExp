import { Schema, model } from 'mongoose';

const figuraSchema = new Schema(
    {
        forma: {
            type: String,
            required: true,
            enum: ['Cuadrado', 'Rectangulo', 'Circulo'],
        },
        
        peso: {
            cantidad: {
                type: Number,
                required: true
            },
            unidad: {
                type: String,
                required: true,
                enum: ['Kg', 'toneladas'],
            },
        },

        dimensiones: {
            largo: {
                type: Number,
                required: function() { return this.forma === 'Rectangulo'; }
            },
            ancho: {
                type: Number,
                required: function() { return this.forma === 'Rectangulo'; }
            },
            lado: {
                type: Number,
                required: function() { return this.forma === 'Cuadrado'; }
            },
            diametro: {
                type: Number,
                required: function() { return this.forma === 'Circulo'; }
            },
            altura: {
                type: Number,
                required: true // La altura es requerida para todas las figuras en 3D
            }
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default model('Figura', figuraSchema);