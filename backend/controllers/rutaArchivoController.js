// controllers/RutaArchivoController.js
import RutaArchivo from '../models/rutaArchivo.js';

const buscarRutaPorRutUsuario = async (req, res) => {
  const { rut } = req.body;

  try {
    // Buscar la ruta de archivo por el RUT de usuario
    const rutaArchivo = await RutaArchivo.findOne({ rutUsuario: rut });

    if (!rutaArchivo || !rutaArchivo.original) {
      return res.status(404).json({ error: 'Ruta de archivo no encontrada para este usuario' });
    }

    // Enviar la URL de la imagen al cliente
    const imageUrl = rutaArchivo.original;
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error al buscar la ruta de archivo por RUT de usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default buscarRutaPorRutUsuario;
