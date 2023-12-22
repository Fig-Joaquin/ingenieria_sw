import PermisoEdificacion from "../../models/forms/PermisoEdificacion.js";
import { v4 as uuidv4 } from 'uuid';
import { obtenerDatosTransferencia } from "../datosTransferenciaController.js";

const crearPermisoEdificacion = async (req, res) => {
    try {
        const {
            nombreSolicitante,
            rutSolicitante,
            tipoEdificacion,
            direccionEdificacion,
            comunaEdificacion,
            telefono,
            email,
        } = req.body;

        // Genera un identificador único para el comprobante de depósito
        const comprobanteId = uuidv4();

        const nuevoPermiso = new PermisoEdificacion({
            nombreSolicitante,
            rutSolicitante,
            tipoEdificacion,
            direccionEdificacion,
            comunaEdificacion,
            telefono,
            email,
        });

        await nuevoPermiso.save();
        
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

const obtenerPermisoEdificacionPorRut = async (req, res) => {
    try {
        const { rutSolicitante } = req.params;

        const permiso = await PermisoEdificacion.findOne({ rutSolicitante });

        if (!permiso) {
            return res.status(404).json({ mensaje: 'Permiso de Edificación no encontrado.' });
        }

        res.status(200).json(permiso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el registro de Permiso de Edificación.' });
    }
};

const marcarComoPagadoPermisoEdificacion = async (req, res) => {
    try {
        const { rutSolicitante } = req.params;

        const permiso = await PermisoEdificacion.findOne({ rutSolicitante });

        if (!permiso) {
            return res.status(404).json({ mensaje: 'Permiso de Edificación no encontrado.' });
        }

        permiso.pagado = true;
        await permiso.save();

        res.status(200).json({ mensaje: 'Permiso de Edificación marcado como pagado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al marcar el Permiso de Edificación como pagado.' });
    }
};

const obtenerTodosLosPermisosEdificacion = async (req, res) => {
    try {
        const permisos = await PermisoEdificacion.find();

        res.status(200).json(permisos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los permisos de edificación.' });
    }
};

export {
    crearPermisoEdificacion,
    obtenerPermisoEdificacionPorRut,
    marcarComoPagadoPermisoEdificacion,
    obtenerTodosLosPermisosEdificacion,
};