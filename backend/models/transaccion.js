import mongoose from 'mongoose';

const transaccionSchema = new mongoose.Schema({
  numeroTransaccion: {
    type: String,
    required: true,
  },
  fechaTransaccion: {
    type: Date,
    required: true,
  },
  montoTransaccion: {
    type: Number,
    required: true,
  },
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
});

const Transaccion = mongoose.model('Transaccion', transaccionSchema);

export default Transaccion;
