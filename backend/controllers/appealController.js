import Appeal from '../models/appeal.js'

// Controlador para crear una apelación asignada a un usuario específico
const createAppealForUser = async (req, res) => {
    try {
      const { userId } = req.params; // Obtiene el ID del usuario de los parámetros de la URL
      const { reason } = req.body; // Obtiene el motivo de la apelación del cuerpo de la solicitud
  
      // Crea una nueva apelación asignada al usuario con el ID proporcionado
      const newAppeal = new Appeal({
        user: userId, // Asigna el ID del usuario al campo 'user'
        reason,
      });
  
      // Guarda la apelación en la base de datos
      await newAppeal.save();
  
      res.status(201).json(newAppeal);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la apelación' });
    }
  };

//  Formatear la fecha en el formato "día/mes/año"
const getAppeal = async (req, res) => {
  try {
    const appeal = await Appeal.findById(req.params.id);
    if (!appeal) {
      return res.status(404).json({ error: 'Apelación no encontrada' });
    }

    // Formatear la fecha en el formato "día/mes/año"
    const formattedDate = appeal.dateSubmitted.toLocaleDateString('es-ES'); // 'es-ES' para el formato día/mes/año

    // Enviar la apelación con la fecha formateada en la respuesta
    res.status(200).json({ ...appeal._doc, dateSubmitted: formattedDate });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la apelación' });
  }
};




export {getAppeal,createAppealForUser};