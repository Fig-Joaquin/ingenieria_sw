import mongoose from 'mongoose';

const permisoEdificacionSchema = new mongoose.Schema({
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
    tipoEdificacion: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25,
        validate: {
            validator: function (value) {
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: 'El formato del tipo de edificación no es válido. Debe ser "Casa" o "Edificio".',
        }
    },
    direccionEdificacion: {
        type: String,
        required: [true, 'La dirección es obligatoria.'],
        unique: true,
        minlength: 5,
        maxlength: 100,
        validate: {
            validator: function (value) {
                return /^([A-Za-z0-9]+(\s?)[A-Za-z0-9]+)+$/.test(value) || /^([A-Za-z0-9]+(\s?)[A-Za-z0-9]+)+(\s?)[#](\s?)[0-9]+$/.test(value);
            },
            message: 'El formato de la dirección no es válido. Debe ser "Calle 1234" o "Calle #1234.',
        }
    },
    comunaEdificacion: {
        type: String,
        required: [true, 'La comuna es obligatoria.'],
        unique: false,
        minlength: 5,
        maxlength: 30,
        validate: {
            validator: function (value) {
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: 'El formato de la comuna no es válido. Debe ser por ejemplo: "Santiago".',
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

const PermisoEdificacion = mongoose.model('permisoEdificacion', permisoEdificacionSchema);

export default PermisoEdificacion;
