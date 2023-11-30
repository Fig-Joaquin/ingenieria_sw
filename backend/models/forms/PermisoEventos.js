import mongoose from 'mongoose';

const permisoEventosEspectaculosSchema = new mongoose.Schema({
    nombreSolicitante: {
        type: String,
        required: [true, 'El nombre del residente es obligatorio.'],
        minlength: 3,
        maxlength: 30,
        validate: {
            validator: function (value) {
                // Validar el formato del nombre
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: 'El formato del nombre no es válido. Debe ser formato "Juan Perez".',
        }
    },
    rutSolicitante: {
        type: String,
        required: [true, 'El RUT del titular es obligatorio.'],
        unique: true,
        validate: {
            validator: function (value) {
                return /^\d{7,8}[\dkK]$/.test(value);
            },
            message: 'El formato del RUT no es válido. Debe ser 123456789 o 12345678K.',
        }
    },
    tipoEvento: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        validate: {
            validator: function (value) {
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: 'El formato del tipo de evento no es válido. Debe ser "Cultural" o "Deportivo".',
        }
    },
    fechaEvento: {
        type: Date,
        required: [true, 'La fecha del evento es obligatoria.'],
        validate: {
            validator: function (value) {
                //validar que sea una fecha y que sea después de la fecha actual
                return value > Date.now();
            },
            message: 'El valor proporcionado no es una fecha valida, debe ser después de la fecha actual.',
        }
    },
    asistentesAprox: {
        type: Number,
        required: true,
        min: 1,
        max: 100000,
        validate: {
            validator: function (value) {
                return /^[0-9]+$/.test(value);
            },
            message: 'El formato de la cantidad de asistentes no es válido. Debe ser un número.',
        }
    },
    lugarEvento: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        validate: {
            validator: function (value) {
                return /^([A-Za-z0-9]+(\s?)[A-Za-z0-9]+)+$/.test(value) || /^([A-Za-z0-9]+(\s?)[A-Za-z0-9]+)+(\s?)[#](\s?)[0-9]+$/.test(value);
            },
            message: 'El formato de la dirección no es válido. Debe ser "Calle 1234" o "Calle #1234.',
        }
    },
    telefono: {
        type: String,
        required: [true, 'El número de teléfono es obligatorio.'],
        validate: {
            validator: function (value) {
                // Validar el formato del número de teléfono
                return /^\+569\d{8}$/.test(value);
            },
            message: 'El formato del número de teléfono no es válido. Debe ser +56912345678.',
        }
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

