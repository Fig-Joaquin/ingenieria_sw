import mongoose from 'mongoose';

const fineSchema = new mongoose.Schema({
  rut: { // Persona asociada a la multa
    type: String,
    required: true,
  },
  violationType: { // Tipo de multa
    type: String,
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
    required: true,
  },
  status: { // Estado
    type: String,
    enum: ['pendiente', 'pagada', 'anulado'],
    default: 'pendiente',
  },
});

const Fine = mongoose.model('multa', fineSchema);

export default Fine;
