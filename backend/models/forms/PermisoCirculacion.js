import mongoose from 'mongoose';

// Esquema del Permiso de Circulacion:
const formSchema = new mongoose.Schema({
    rut: {
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
    patente: {
        type: String,
        required: [true, 'La patente es obligatoria.'],
        unique: true,
        validate: {
            validator: function (value) {
                // Validar el formato de la patente
                // Formato antiguo: XX1234 (dos letras y cuatro números)
                // Formato nuevo: BBBBXX (cuatro letras B y dos letras X)
                // Formato para motos: XX123 (dos letras y tres números)
                return /^[A-Z]{2}\d{4}$/.test(value) || /^[A-Z]{4}\d{2}$/.test(value) || /^[A-Z]{2}\d{3}$/.test(value);
            },
            message: 'El formato de la patente no es válido. Debe ser por ejemplo: AB1234, BBBB12 o AB123.'
        }
    },
    pagado: {
        type: Boolean,
        default: false,
    },
    image: Buffer,
});

const FormularioPermisoCirculacion = mongoose.model('formularioPermisoCirculacion', formSchema);

//module.exports = FormularioPermisoCirculacion;
export default FormularioPermisoCirculacion;