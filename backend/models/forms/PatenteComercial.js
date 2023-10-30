import mongoose from 'mongoose';

// Esquema de Patentes Comerciales:
const formPatenteSchema = new mongoose.Schema({
    nombreComercio: {
        type: String,
        required: true,
    },
    rubro: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
    },
    numeroLocal: {
        type: String,
    },
    rutTitular: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Validar el formato del RUT
                return /^\d{7,8}[\dkK]$/.test(value);
            },
            message: 'El formato del RUT no es válido. Debe ser 123456789.'
        }
    },
    nombreTitular: {
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
    fechaInicioActividades: {
        type: String,
        required: true,
    },
    actividadEconomica: {
        type: String,
        required: true,
    },
    cantidadEmpleados: {
        type: Number,
        required: true,
    },
    ingresosAnuales: {
        type: Number,
        required: true,
    },
    pagado: {
        type: Boolean,
        default: false,
    },
});

const FormularioPatenteComercial = mongoose.model('formularioPatenteComercial', formPatenteSchema);

export default FormularioPatenteComercial;