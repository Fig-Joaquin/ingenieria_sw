import mongoose from 'mongoose'

const appealSchema = new mongoose.Schema({
  user: { // El usuario que presenta la apelación
    type: String, 
    required: true 
  },
  fine: { // La multa a la que se refiere la apelación
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Multa', // Reemplazar 'Multa' con el nombre de tu modelo de multa si es diferente
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