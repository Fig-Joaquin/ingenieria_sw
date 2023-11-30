import Fine from '../models/fine.js';
import { parse} from 'date-fns';


const createFine = async (req, res) => {
  try {
    const { rut, violationType, description, amount, violationDate, location, status } = req.body;

    // Validar el formato del RUT
    if (!isValidRut(rut)) {
      return res.status(400).json({ error: 'RUT no válido' });
    }

    // Validar el formato de la fecha (dd-MM-yyyy)
    const dateRegex = /^([0-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
    if (!dateRegex.test(violationDate)) {
      return res.status(400).json({ error: 'Formato de fecha no válido. Debe ser dd-MM-yyyy' });
    }

    // Validar el rango del amount (mayor a 1 y menor que 99999999)
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || numericAmount <= 1 || numericAmount >= 99999999) {
      return res.status(400).json({ error: 'El monto debe ser mayor a 1 y menor que 99999999' });
    }

    // Validar que violationType sea uno de los valores permitidos
    const allowedViolationTypes = ['falta gravisima', 'falta grave', 'falta menos grave', 'falta leve'];
    if (!allowedViolationTypes.includes(violationType.toLowerCase())) {
      return res.status(400).json({ error: 'Tipo de infracción no válido' });
    }

    // Convierte la fecha del formato "31-12-2023" al formato "año-mes-día"
    const parsedDate = parse(violationDate, 'dd-MM-yyyy', new Date());

    // Crea una nueva instancia de la multa
    const newFine = new Fine({
      rut,
      violationType,
      description,
      amount: numericAmount,
      violationDate: parsedDate,
      location,
      status: status || 'pendiente',
    });

    // Guarda la nueva multa en la base de datos
    await newFine.save();

    res.status(200).json(newFine);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al crear la multa' });
  }
};



 // obtener todas las multas 
const getAllFines = async (req, res) => {
    try {
      const fines = await Fine.find(); // Encuentra todas las multas en la base de datos
      res.status(200).json(fines); // Devuelve todas las multas como respuesta
    } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al obtener las multas' });
    }
};

const isValidRut = (rut) => {
  const rutRegex = /^[0-9]{7,8}-?[0-9kK]$/;

  return rutRegex.test(rut);
};

// buscar multas por rut
const getFinesByRut = async (req, res) => {
  const { rut } = req.body; // Obtén el valor del parámetro rut de la URL
  if (!isValidRut(rut)) {
    return res.status(400).json({ error: 'RUT no válido' });
  }
    try {
      const fines = await Fine.find({ rut }); // Encuentra todas las multas con el rut proporcionado
      res.status(200).json(fines); // Devuelve las multas encontradas como respuesta
    } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al obtener las multas por rut' });
    }
};

const updateFineStatus = async (req, res) => {
  try {
    const { fineId, newStatus } = req.body;

    // Busca la multa por su ID en la base de datos
    const fine = await Fine.findById(fineId);

    if (!fine) {
      return res.status(400).json({ error: 'Multa no encontrada' });
    }

    const allowedStatus = ['pendiente', 'pagada', 'anulado'];

    // Validar que el nuevo estado sea válido
    if (!allowedStatus.includes(newStatus.toLowerCase())) {
      return res.status(400).json({ error: 'Nuevo estado no válido' });
    }

    // Actualiza el estado de la multa
    fine.status = newStatus;

    // Guarda la multa actualizada en la base de datos
    await fine.save();

    res.status(200).json(fine); // Devuelve la multa actualizada como respuesta
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Error al actualizar el estado de la multa' });
  }
};


const getFinesByRutUser = async (req, res) => {
  const { rut } = req.params; // Obtén el RUT del parámetro de la solicitud

  try {
      // Busca las multas asociadas al RUT proporcionado
      const fines = await Fine.findOne({ rut });

      if (!fines || fines.length === 0) {
          return res.status(400).json({ error: 'No se encontraron multas para este RUT' });
      }

      res.json(fines); // Devuelve las multas encontradas para el RUT especificado
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al buscar las multas por RUT' });
  }
};


export {createFine, getAllFines, getFinesByRut, updateFineStatus,getFinesByRutUser };
