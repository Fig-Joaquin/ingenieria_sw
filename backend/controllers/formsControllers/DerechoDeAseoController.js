import DerechosDeAseo from "../../models/forms/DerechoDeAseo.js";
import { v4 as uuidv4 } from 'uuid';
import { obtenerDatosTransferencia } from "../datosTransferenciaController.js";

const crearDerechosDeAseo = async (req, res) => {
    try {
        const {
            nombreResidente,
            rutResidente,
            direccion,
            telefono,
            email,
        } = req.body;

        const nuevoPago = new DerechosDeAseo({
            nombreResidente,
            rutResidente,
            direccion,
            telefono,
            email,
        });

        // Generar un identificador único para el comprobante de depósito
        const comprobanteId = uuidv4();

        await nuevoPago.save();

        const enlaceComprobante = `/upload/subir-comprobante/${comprobanteId}`;
        
        res.status(201).json({ mensaje: `Registro exitoso. Suba su comprobante de transferencia a ${enlaceComprobante}` });
        const getDatos = async (req, res) => {
            try {
                // Llama a la función para obtener los datos de transferencia
                const datos = await obtenerDatosTransferencia(req, res);
        
                // Muestra los datos (solo valido con html)
                console.log(datos);
        
                res.status(200).json({ mensaje: 'Esperamos su depósito.' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ mensaje: 'Error al obtener los datos de transferencia.' });
            }
        };
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Registro de Derecho de Aseo invalido.' });
    }
};

const obtenerDerechosDeAseoPorRut = async (req, res) => {
    try {
        const { rutResidente } = req.params;

        const pago = await DerechosDeAseo.findOne({ rutResidente });

        if (!pago) {
            return res.status(404).json({ mensaje: 'Pago de Derechos de Aseo no encontrado.' });
        }

        res.status(200).json(pago);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el registro de Derechos de Aseo.' });
    }
};

const obtenerTodosLosDerechosDeAseo = async (req, res) => {
    try {
        // Utiliza el método find para obtener todos los pagos de Derechos de Aseo
        const pagos = await DerechosDeAseo.find();

        res.status(200).json(pagos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los pagos de Derechos de Aseo.' });
    }
};

const marcarComoPagadoDerechosDeAseo = async (req, res) => {
    try {
        const { rutResidente } = req.params;

        const pago = await DerechosDeAseo.findOne({ rutResidente });

        if (!pago) {
            return res.status(404).json({ mensaje: 'Pago de Derechos de Aseo no encontrado.' });
        }

        pago.pagado = true;
        await pago.save();

        res.status(200).json({ mensaje: 'Pago de Derechos de Aseo marcado como pagado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al marcar el pago de Derechos de Aseo como pagado.' });
    }
};

export {
    crearDerechosDeAseo,
    obtenerDerechosDeAseoPorRut,
    marcarComoPagadoDerechosDeAseo,
    obtenerTodosLosDerechosDeAseo,
};
