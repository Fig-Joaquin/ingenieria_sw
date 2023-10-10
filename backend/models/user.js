import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
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
  // Información personal del usuario
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  // Historial de transacciones del usuario
}, {timestamps: true});

const User = mongoose.model('usuario', userSchema,'cliente');

export default User;
