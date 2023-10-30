import mongoose from 'mongoose';

const permisoConstruccionSchema = new mongoose.Schema({
    nombreSolicitante: {
        type: String,
        required: true,
    },
    rutSolicitante: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Validar el formato del RUT
                return /^\d{7,8}[\dkK]$/.test(value);
            },
            message: 'El formato del RUT no es válido. Debe ser 123456789.',
        }
    },
    direccionObra: {
        type: String,
        required: true,
    },
    comunaObra: {
        type: String, // Agrega el campo ComunaObra
        required: true,
    },
    empresa: {
        type: String, // Agrega el campo Empresa
        required: true,
    },
    cantidadTrabajadores: {
        type: Number, // Agrega el campo Cantidad de Trabajadores
        required: true,
    },
    telefono: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Validar el formato del correo electrónico
                return /\S+@\S+\.\S+/.test(value);
            },
            message: 'El formato del correo electrónico no es válido.',
        }
    },
    montoPago: {
        type: Number,
        required: true,
    },
    pagado: {
        type: Boolean,
        default: false,
    },
});

const PermisoConstruccion = mongoose.model('permisoConstruccion', permisoConstruccionSchema);

export default PermisoConstruccion;
