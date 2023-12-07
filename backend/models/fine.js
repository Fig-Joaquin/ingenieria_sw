import mongoose from 'mongoose';

const fineSchema = new mongoose.Schema({
  rut: { // Persona asociada a la multa
    type: String,
    required: true,
  },
  violationType: { // Tipo de multa
    type: String,
    enum: ['falta gravisima', 'falta grave', 'falta menos grave', 'falta leve'],
    required: true,
  },
  description: { // Descripccion
    type: String,
    required: true,
  },
  amount: { // Monto
    type: Number,
    required: true,
  },
  violationDate: {  // Fecha de la infracción
    type: Date,
    required: true,
  },
  location: { // Lugar de la infracción
    type: String,
    required: [true, 'Lugar de la fraccion es obligatoria.'],
    minlength: 5,
    maxlength: 100,
    validate: {
        validator: function (value) {
            return /^([A-Za-z0-9]+(\s?)[A-Za-z0-9]+)+$/.test(value) || /^([A-Za-z0-9]+(\s?)[A-Za-z0-9]+)+(\s?)[#](\s?)[0-9]+$/.test(value);
        },
        message: 'El formato de la dirección no es válido. Debe ser "Calle 1234" o "Calle #1234.',
    }
  },
  status: { // Estado
    type: String,
    enum: ['pendiente', 'pagada', 'anulado'],
    default: 'pendiente',
  },
});

const Fine = mongoose.model('multa', fineSchema);

export default Fine;
