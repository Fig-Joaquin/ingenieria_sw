import RutaArchivo from '../models/rutaArchivo.js';

const buscarRutaPorRutUsuario = async (req, res) => {
  const { rutUsuario, idFormulario, categoria } = req.body;

  try {
    const filtroBusqueda = { rutUsuario };

    if (idFormulario) {
      filtroBusqueda.idFormulario = idFormulario;
    }

    if (categoria) {
      filtroBusqueda.categoria = categoria;
    }

    const rutaArchivo = await RutaArchivo.findOne(filtroBusqueda);

    if (!rutaArchivo || !rutaArchivo.original) {
      return res.status(404).json({ error: 'Ruta de archivo no encontrada para este usuario' });
    }

    // Enviar la ruta de la imagen al cliente
    const imageUrl = rutaArchivo.original;
    res.json({ imageUrl });
  } catch (error) {
    console.error('Error al buscar la ruta de archivo por RUT de usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export default buscarRutaPorRutUsuario;
