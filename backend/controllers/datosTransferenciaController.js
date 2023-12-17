import TransferenciaDatos from "../models/datosTransferencia.js";

// crear datos de transferencia fijos
const crearDatosTransferenciaFijos = async (req, res) => {
    try {
        const datosFijos = new TransferenciaDatos({});
        await datosFijos.save();

        res.status(200).json({ mensaje: 'Datos de transferencia fijos creados exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: 'Error al crear los datos de transferencia fijos.' });
    }
};
const obtenerDatosTransferencia = async (req, res) => {
    try {
        const datosTransferencia = await TransferenciaDatos.findOne();
        
        if (!datosTransferencia) {
            return res.status(400).json({ mensaje: 'Datos de transferencia no encontrados.' });
        }

        res.status(200).json(datosTransferencia);
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: 'Error al obtener los datos de transferencia.' });
    }
};

export {
    crearDatosTransferenciaFijos,
    obtenerDatosTransferencia,
};
