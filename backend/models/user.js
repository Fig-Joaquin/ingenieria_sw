import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  rut: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['cliente', 'administrador'],
    default: 'cliente',
  },
  // Información personal del usuario
  adress: {
    type: String,
    
  },
  phonenumber: {
    type: String,
  },
  // Historial de transacciones del usuario
  transactions: [
    {
      fecha: {
        type: Date,
        default: Date.now,
      },
      tipo: String, // Puedes definir los tipos de transacción necesarios
      monto: Number,
    },
  ],
});

const User = mongoose.model('Usuario', userSchema,'cliente');

export default User;
