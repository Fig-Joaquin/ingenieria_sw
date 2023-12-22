// models/RutaArchivo.js
import mongoose from 'mongoose';

const rutaArchivoSchema = new mongoose.Schema({
  original: String,
  resized: String,
  rutUsuario: String,
  idFormulario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Formulario',
  },
  categoria: String, 
});


const RutaArchivo = mongoose.model('RutaArchivo', rutaArchivoSchema);

export default RutaArchivo;
