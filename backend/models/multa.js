import mongoose from 'mongoose';

const fineSchema = new mongoose.Schema({
  // Detalles de la multa
  amount: {
    type: Number,
    required: true,
  },
  fineDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  // Otros detalles de la multa
  // ...

  // Referencia al usuario a quien se le aplicó la multa
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Nombre de tu modelo de usuario
  },
}, { timestamps: true });

const Fine = mongoose.model('Multa', fineSchema);

export default Fine;