import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  nombre: {
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
  contraseña: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['cliente', 'administrador'],
    default: 'cliente',
  },
  // Información personal del usuario
  direccion: {
    type: String,
    
  },
  telefono: {
    type: String,
  },
  // Historial de transacciones del usuario
  transacciones: [
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

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
