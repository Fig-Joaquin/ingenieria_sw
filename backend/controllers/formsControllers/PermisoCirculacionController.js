import FormularioPermisoCirculacion from "../../models/forms/PermisoCirculacion.js";
import { v4 as uuidv4 } from 'uuid';
import { obtenerDatosTransferencia } from "../datosTransferenciaController.js";

const crearFormulario = async (req, res) => {
    try {
        const { rut, patente } = req.body;

        // Generar un identificador único para el comprobante de depósito
        const comprobanteId = uuidv4();

        // Crea un nuevo formulario
        const nuevoFormulario = new FormularioPermisoCirculacion({
            rut,
            patente,
        });

        // Guardar el formulario en la base de datos
        await nuevoFormulario.save();
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
        res.status(500).json({ mensaje: 'Error al crear el registro.' });
    }
};

//  Obtener un formulario a partir del RUT
const obtenerFormularioPorRut = async (req, res) => {
    try {
        const { rut } = req.params;

        const formulario = await FormularioPermisoCirculacion.findOne({ rut });

        if (!formulario) {
            return res.status(404).json({ mensaje: 'Registro no encontrado.' });
        }

        res.status(200).json(formulario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el registro.' });
    }
};

// Eliminar un formulario
const eliminarFormulario = async (req, res) => {
    try {
        const { rut } = req.params;

        // Eliminar el formulario por su RUT
        await FormularioPermisoCirculacion.findOneAndRemove({ rut });

        res.status(200).json({ mensaje: 'Registro eliminado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el formulario.' });
    }
};

//  Marcar un formulario como pagado por RUT

const marcarComoPagado = async (req, res) => {
    try {
        const { rut } = req.params;

        const formulario = await FormularioPermisoCirculacion.findOne({ rut });

        if (!formulario) {
            return res.status(404).json({ mensaje: 'Registro no encontrado.' });
        }

        formulario.pagado = true;
        await formulario.save();

        res.status(200).json({ mensaje: 'Registro marcado como pagado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al marcar el registro como pagado.' });
    }
};


export {
    crearFormulario,
    obtenerFormularioPorRut,
    eliminarFormulario,
    marcarComoPagado,
};