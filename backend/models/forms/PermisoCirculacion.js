import mongoose from 'mongoose';

// Esquema del Permiso de Circulacion:
const PermCircSchema = new mongoose.Schema({
    rut: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Validar el formato del RUT (por ejemplo, 12345678-9)
                return /^\d{7,8}-[\dkK]$/.test(value);
            },
            message: 'El formato del RUT no es válido. No puede tener puntos y debe considerar guión, por ejemplo: 12345678-9.'
        }
    },
    patente: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                // Validar el formato de la patente (por ejemplo, AB123CD)
                return /^[A-Z]{2}\d{3}[A-Z]{2}$/.test(value);
            },
            message: 'El formato de la patente no es válido. Debe ser por ejemplo: AB123CD.'
        }
    },
    pagado: {
        type: Boolean,
        default: false,
    },
});

const FormularioPermisoCirculacion = mongoose.model('FormularioPermisoCirculacion', formSchema);

module.exports = FormularioPermisoCirculacion;
