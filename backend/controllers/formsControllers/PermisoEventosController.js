import PermisoEventosEspectaculos from "../../models/forms/PermisoEventos.js";
import { v4 as uuidv4 } from 'uuid';
import { obtenerDatosTransferencia } from "../datosTransferenciaController.js";

const crearPermisoEventosEspectaculos = async (req, res) => {
    try {
        const {
            nombreSolicitante,
            rutSolicitante,
            tipoEvento,
            fechaEvento,
            asistentesAprox,
            lugarEvento,
            telefono,
            email,
        } = req.body;

        // Genera un identificador único para el comprobante de depósito
        const comprobanteId = uuidv4();

        const nuevoPermiso = new PermisoEventosEspectaculos({
            nombreSolicitante,
            rutSolicitante,
            tipoEvento,
            fechaEvento,
            asistentesAprox,
            lugarEvento,
            telefono,
            email,
        });

        await nuevoPermiso.save();
        
        const enlaceComprobante = `/upload/subir-comprobante/${comprobanteId}`;
        res.status(201).json({ mensaje: `Registro exitoso. Suba su comprobante de transferencia a ${enlaceComprobante}` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el registro de Permiso de Eventos y Espectáculos.' });
    }
};

const obtenerPermisoEventosEspectaculosPorRut = async (req, res) => {
    try {
        const { rutSolicitante } = req.params;

        const permiso = await PermisoEventosEspectaculos.findOne({ rutSolicitante });

        if (!permiso) {
            return res.status(404).json({ mensaje: 'Permiso de Eventos y Espectáculos no encontrado.' });
        }

        res.status(200).json(permiso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el registro de Permiso de Eventos y Espectáculos.' });
    }
};

const marcarComoPagadoPermisoEventosEspectaculos = async (req, res) => {
    try {
        const { rutSolicitante } = req.params;

        const permiso = await PermisoEventosEspectaculos.findOne({ rutSolicitante });

        if (!permiso) {
            return res.status(404).json({ mensaje: 'Permiso de Eventos y Espectáculos no encontrado.' });
        }

        permiso.pagado = true;
        await permiso.save();

        res.status(200).json({ mensaje: 'Permiso de Eventos y Espectáculos marcado como pagado exitosamente.' });
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
        res.status(500).json({ mensaje: 'Error al marcar el Permiso de Eventos y Espectáculos como pagado.' });
    }
};

const obtenerTodosLosPermisosEventosEspectaculos = async (req, res) => {
    try {
        const permisos = await PermisoEventosEspectaculos.find();

        res.status(200).json(permisos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los permisos de Eventos y Espectáculos.' });
    }
};

export {
    crearPermisoEventosEspectaculos,
    obtenerPermisoEventosEspectaculosPorRut,
    marcarComoPagadoPermisoEventosEspectaculos,
    obtenerTodosLosPermisosEventosEspectaculos,
};