import Fine from '../models/fine.js';
import { parse} from 'date-fns';

// Controlador para crear una nueva multa
const createFine = async (req, res) => {
try {
    // Obtén los datos de la solicitud
    const { rut, violationType, description, amount, violationDate, location, status } = req.body;

    // Convierte la fecha del formato "31-12-2023" al formato "año-mes-día"
    const parsedDate = parse(violationDate, 'dd-MM-yyyy', new Date());

    // Crea una nueva instancia de la multa
    const newFine = new Fine({
    rut,
    violationType,
    description,
    amount,
    violationDate: parsedDate,
    location,
    status: status || 'pendiente',
    });

    // Guarda la nueva multa en la base de datos
    await newFine.save();

    res.status(201).json(newFine);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la multa' });
}
};
 // obtener todas las multas 
const getAllFines = async (req, res) => {
    try {
      const fines = await Fine.find(); // Encuentra todas las multas en la base de datos
      res.status(200).json(fines); // Devuelve todas las multas como respuesta
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las multas' });
    }
};
// buscar multas por rut
const getFinesByRut = async (req, res) => {
    try {
      const { rut } = req.body; // Obtén el valor del parámetro rut de la URL
      const fines = await Fine.find({ rut }); // Encuentra todas las multas con el rut proporcionado
      res.status(200).json(fines); // Devuelve las multas encontradas como respuesta
    } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las multas por rut' });
    }
};



export {createFine, getAllFines, getFinesByRut};
