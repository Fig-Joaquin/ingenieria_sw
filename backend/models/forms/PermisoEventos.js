import mongoose from 'mongoose';

const permisoEventosEspectaculosSchema = new mongoose.Schema({
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
    tipoEvento: {
        type: String,
        required: true,
    },
    fechaEvento: {
        type: Date,
        required: true,
    },
    asistentesAprox: {
        type: Number,
        required: true,
    },
    lugarEvento: {
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

const PermisoEventosEspectaculos = mongoose.model('permisoEventosEspectaculos', permisoEventosEspectaculosSchema);

export default PermisoEventosEspectaculos;
