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
  },
  lastName: {
    type: String,
    required: true,
    
  },
  statusUser: {
    type: String,
    enum: ['Deudor', 'Solvente'], // Solvente de deuda significa que no carga con deudas pendientes.
    default: 'Solvente',
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
  // Información personal del usuario
  address: { // Direccion del usuario
    type: String,
  },
  phoneNumber: { // Numero de telefono 
    type: String,
  },
  // Historial de transacciones del usuario
}, {timestamps: true});


const User = mongoose.model('usuario', userSchema,'cliente');

export default User;
