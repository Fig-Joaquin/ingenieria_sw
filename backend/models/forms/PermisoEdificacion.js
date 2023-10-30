import mongoose from 'mongoose';

const permisoEdificacionSchema = new mongoose.Schema({
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
    tipoEdificacion: {
        type: String,
        required: true,
    },
    direccionEdificacion: {
        type: String,
        required: true,
    },
    comunaEdificacion: {
        type: String,
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
    pagado: {
        type: Boolean,
        default: false,
    },
});

const PermisoEdificacion = mongoose.model('permisoEdificacion', permisoEdificacionSchema);

export default PermisoEdificacion;
