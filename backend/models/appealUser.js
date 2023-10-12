import mongoose from 'mongoose'

const appealUserSchema = new mongoose.Schema({
    user: { // El usuario que presenta la apelación
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'usuario', 
      required: true 
    }, 
    reason: {  // Motivo de la apelación
      type: String, 
      required: true 
    },
    dateSubmitted: { // Fecha de presentación de la apelación
      type: Date, 
      default: Date.now },
  });
    
    const AppealUser = mongoose.model('apelacionUsuario', appealUserSchema);
    
    export default  AppealUser;