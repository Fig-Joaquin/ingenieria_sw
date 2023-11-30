import mongoose from 'mongoose';

// Esquema de Patentes Comerciales:
const formPatenteSchema = new mongoose.Schema({
    nombreComercio: {
        type: String,
        required: [true, 'El nombre del comercio es obligatorio.'],
        minlength: 3,
        maxlength: 100,
        validate: {
            validator: function (value) {
                return /^[A-Za-z0-9\s]+$/.test(value);
            },
            message: 'El formato del nombre no es válido. Debe ser, como ejemplo: "Empresa Ejemplo".',
        }
    },
    rubro: {
        type: String,
        required: [true, 'El rubro es obligatorio.'],
        minlength: 3,
        maxlength: 100,
        validate: {
            validator: function (value) {
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: 'El formato del rubro no es válido. Debe ser, como ejemplo: "Venta de insumos".',
        }
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es obligatoria.'],
        minlength: 5,
        maxlength: 100,
        validate: {
            validator: function (value) {
                return /^([A-Za-z0-9]+(\s?)[A-Za-z0-9]+)+$/.test(value) || /^([A-Za-z0-9]+(\s?)[A-Za-z0-9]+)+(\s?)[#](\s?)[0-9]+$/.test(value);
            },
            message: 'El formato de la dirección no es válido. Debe ser "Calle 1234" o "Calle #1234.',
        }
    },
    numeroLocal: {
        type: Number,
        minlength: 1,
        maxlength: 10,
        validate: {
            validator: function (value) {
                return /^\d{1,10}$/.test(value);
            },
            message: 'El formato del número de local no es válido. Debe ser, por ejemplo "123".',
        }
    },
    rutTitular: {
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
    nombreTitular: {
        type: String,
        required: [true, 'El nombre del titular es obligatorio.'],
        minlength: 3,
        maxlength: 30,
        validate: {
            validator: function (value) {
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: 'El formato del nombre no es válido. Debe ser "Juan Pérez".',
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
        required: [true, 'El correo electrónico es obligatorio.'],
        unique: true,
        validate: {
            validator: function (value) {
                // Validar el formato del correo electrónico
                return /\S+@\S+\.\S+/.test(value);
            },
            message: 'El formato del correo electrónico no es válido, debe ser "ejemplo@gmail.com".',
        }
    },
    fechaInicioActividades: {
        type: Date,
        required: [true, 'La fecha de inicio de actividades es obligatoria.'],
        validate: {
            validator: function (value) {
                //validar que sea una fecha y que sea después de 1900 y antes de la fecha actual
                return value instanceof Date && value.getFullYear() > 1900 && value < new Date();
            },
            message: 'El valor proporcionado no es una fecha válida.',
        }
    },
    actividadEconomica: {
        type: String,
        required: [true, 'La actividad económica es obligatoria.'],
        minlength: 3,
        maxlength: 30,
        validate: {
            validator: function (value) {
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: 'El formato de la actividad económica no es válido. Debe ser "Comercio al por mayor".',
        }
    },
    cantidadEmpleados: {
        type: Number,
        required: [true, 'La cantidad de empleados es obligatoria.'],
        min: 0,
        validate: {
            validator: function (value) {
                return /^\d{1,10}$/.test(value);
            },
            message: 'El formato de la cantidad de empleados no es válido. Debe ser, por ejemplo "23".',
        }
    },
    ingresosAnuales: {
        type: Number,
        required: [true, 'Los ingresos anuales son obligatorios.'],
        min: 0,
        validate: {
            validator: function (value) {
                return /^\d{1,10}$/.test(value);
            },
            message: 'El formato de los ingresos anuales no es válido. Debe ser, por ejemplo "1000000".',
        }
    },
    pagado: {
        type: Boolean,
        default: false,
    },
});

const FormularioPatenteComercial = mongoose.model('formularioPatenteComercial', formPatenteSchema);

export default FormularioPatenteComercial;