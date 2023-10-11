import Appeal from '../models/appeal.js'
import User from '../models/user.js'

// Funcion para crear una apelación asignada a un usuario específico
const createAppealForClient = async (req, res) => {
    try {
      const { reason, rut } = req.body; // Obtiene el motivo de la apelación del cuerpo de la solicitud
      const client = await User.findOne({ rut }); // Busca el usuario por su rut
      console.log(client._id);
      if (!client) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      };
      // Crea una nueva apelación asignada al usuario con el ID proporcionado
    const newAppeal = new Appeal({
      user: client._id,
      reason,
      status: 'pendiente', 
    });
      // Guarda la apelación en la base de datos
      await newAppeal.save();
  
      res.status(201).json(newAppeal);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear la apelación' });
    };
  };

    // Actualizar la apelación - valores: pendiente - aprobada - rechazada
  const decisionAppeal = async (req, res) => {
    const { status, rut } = req.body; // Obtiene el motivo de la apelación del cuerpo de la solicitud
    const client = await User.findOne({ rut }); // Busca al usuario por su RUT
    if (!client) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
  
    try {
      // Buscar apelaciones relacionadas con el RUT del cliente
      const appeals = await Appeal.find({ user: client._id });
      
      if (appeals.length === 0) {
        return res.status(404).json({ error: 'No se encontraron apelaciones para este usuario' });
      }
      
      // Modificar el estado de todas las apelaciones encontradas
      for (const appeal of appeals) {
        appeal.status = status;
        await appeal.save();
      }
  
      res.json({ message: 'Estado de apelaciones actualizado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar las apelaciones' });
    }
  };

  const findAppealsByClientRut = async (req, res) => {
    const { rut } = req.body; // Obtén el `rut` del cliente desde los parámetros de la solicitud
  
    try {
      const appeals = await Appeal.find({ clientRut: rut });
  
      if (!appeals || appeals.length === 0) {
        return res.status(404).json({ error: 'No se encontraron apelaciones para este cliente' });
      }
  
      res.json(appeals);
    } catch (error) {
      res.status(500).json({ error: 'Error al buscar apelaciones por el rut del cliente' });
    }
  };

  const getUserAppeals = async (req, res) => {
    const { rut } = req.body; // Obtiene el RUT del usuario de los parámetros de la URL
    try {
      const client = await User.findOne({ rut }); // Busca al usuario por su RUT
      if (!client) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Buscar apelaciones relacionadas con el usuario
      const appeals = await Appeal.find({ user: client._id });
      res.json(appeals);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las apelaciones del usuario' });
    }
  };

  const getAllAppeals = async (req, res) => {
    try {
      const appeals = await Appeal.find();
      res.json(appeals);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las apelaciones' });
    }
  };


export {createAppealForClient,decisionAppeal,findAppealsByClientRut,getUserAppeals,getAllAppeals};