import { fromUnixTime } from 'date-fns'
import Appeal from '../models/appeal.js'
import Fine from '../models/fine.js'

// Funcion para crear una apelación asignada a un usuario específico


const createAppealForClient = async (req, res) => {
  try {
    const {reason, rut, status } = req.body;
    const objID = req.params.objID;
    // Validar el formato del RUT
    console.log(rut);
    if (!isValidRut(rut)) {
      console.log(rut);
      return res.status(400).json({ error: 'RUT no válido' });
    }
    console.log(objID);
    const client = await Fine.findOne({ _id: objID });
    console.log(client);
    if (!client) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Crea una nueva apelación asignada al usuario con el ID proporcionado
    const newAppeal = new Appeal({
      user: rut,
      fine: objID,
      reason,
      status: status || 'pendiente',
    });

    // Guarda la apelación en la base de datos
    await newAppeal.save();
    res.status(200).json(newAppeal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor', details: error.message });
  }
};



const decisionAppeal = async (req, res) => {
  const { status, _id } = req.body;

  try {
    // Encuentra la apelación por su _id y actualiza el estado
    const updatedAppeal = await Appeal.findByIdAndUpdate(
      _id,
      { $set: { status } },
      { new: true }
    );

    if (!updatedAppeal) {
      return res.status(404).json({ error: 'Apelación no encontrada' });
    }

    res.json({ message: 'Estado de apelación actualizado', updatedAppeal });
  } catch (error) {
    console.error('Error al actualizar el estado de la apelación:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


  const findAppealsByClientRut = async (req, res) => {
    const { rut } = req.body; // Obtén el `rut` del cliente desde los parámetros de la solicitud
  
    try {
      const appeals = await Appeal.find({ clientRut: rut });
  
      if (!appeals || appeals.length === 0) {
        return res.status(400).json({ error: 'No se encontraron apelaciones para este cliente' });
      }
  
      res.json(appeals);
    } catch (error) {
      res.status(400).json({ error: 'Error al buscar apelaciones por el rut del cliente' });
    }
  };
/*
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
*/

const isValidRut = (rut) => {
  const rutRegex = /^[0-9]{7,8}-?[0-9kK]$/;

  return rutRegex.test(rut);
};

const getUserAppeals = async (req, res) => {
  try {
    const { rut } = req.body;

    // Realiza la búsqueda de apelaciones por el campo 'user' (que representa el rut)
    const appeals = await Appeal.find({ user: rut });

    res.status(200).json({ appeals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las apelaciones.' });
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

{/*

const decisionAppeal = async (req, res) => {
  const { status, rut } = req.body;
  
  // Validar el formato del RUT 
  if (!isValidRut(rut)) {
    return res.status(400).json({ error: 'RUT no válido' });
  }

  const client = await User.findOne({ rut });
  if (!client) {
    return res.status(400).json({ error: 'Usuario no encontrado' });
  }

  // Validar el formato del status
  const allowedStatus = ["pendiente", "aprobada", "rechazada"];
  if (!allowedStatus.includes(status.toLowerCase())) {
    return res.status(400).json({ error: 'Estado no válido. Debe ser "pendiente", "aprobada" o "rechazada"' });
  }

  try {
    const latestAppeal = await Appeal.findOne({ user: client._id })
      .sort({ dateSubmitted: -1 })
      .exec();

    if (!latestAppeal) {
      return res.status(400).json({ error: 'No se encontró la última apelación para este usuario' });
    }

    latestAppeal.status = status;
    await latestAppeal.save();

    res.json({ message: 'Estado de la última apelación actualizado' });
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar la última apelación' });
  }
};

*/}