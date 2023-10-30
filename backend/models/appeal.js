import mongoose from 'mongoose'

const appealSchema = new mongoose.Schema({
  user: { // El usuario que presenta la apelación
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'usuario', 
    required: true 
  },
 appealOriginal: { // Apelación original
  type: mongoose.Schema.Types.ObjectId, 
    ref: 'apelacionUsuario', 
    required: true 
},
  reason: {  // Motivo de la apelación
    type: String, 
    required: true 
  },
  status: { // Estado de la apelción
    type: String,
    enum: ['pendiente', 'aprobada', 'rechazada'],
    default: 'pendiente',
  }, 
  dateSubmitted: { // Fecha de presentación de la apelación
    type: Date, 
    default: Date.now },
});
  
  const Appeal = mongoose.model('apelacion', appealSchema);


    export default  Appeal ;