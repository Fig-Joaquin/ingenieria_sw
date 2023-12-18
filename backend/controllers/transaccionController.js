import Transaccion from '../models/transaccion.js';

const crearTransaccion = async (req, res) => {
  try {
    const { numeroTransaccion, fechaTransaccion, montoTransaccion, rut } = req.body;

    const transaccionExistente = await Transaccion.findOne({ numeroTransaccion });
    if (transaccionExistente) {
      return res.status(400).json({ error: 'El número de transacción ya existe.' });
    }

    const nuevaTransaccion = new Transaccion({
      numeroTransaccion,
      fechaTransaccion,
      montoTransaccion,
      rut,
    });

    await nuevaTransaccion.save();

    res.status(201).json({ mensaje: 'Transacción enviada con éxito.', transaccion: nuevaTransaccion });
  } catch (error) {
    console.error('Error al crear transacción:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const buscarPorRut = async (req, res) => {
  try {
    const { rut } = req.params;
    const transacciones = await Transaccion.find({ rut });

    res.status(200).json({ transacciones });
  } catch (error) {
    console.error('Error al buscar transacciones por RUT:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export default { crearTransaccion, buscarPorRut };
