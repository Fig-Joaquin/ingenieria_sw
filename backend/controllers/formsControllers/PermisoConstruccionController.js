import PermisoConstruccion from "../../models/forms/PermisoConstruccion.js";
import { v4 as uuidv4 } from 'uuid';

const crearPermisoConstruccion = async (req, res) => {
    try {
        const {
            nombreSolicitante,
            rutSolicitante,
            direccionObra,
            comunaObra,
            empresa,
            cantidadTrabajadores,
            telefono,
            email,
        } = req.body;

        const nuevoPermiso = new PermisoConstruccion({
            nombreSolicitante,
            rutSolicitante,
            direccionObra,
            comunaObra,
            empresa,
            cantidadTrabajadores,
            telefono,
            email,
        });

        // Generar un identificador único para el comprobante de depósito
        const comprobanteId = uuidv4();


        await nuevoPermiso.save();
        const enlaceComprobante = `/upload/subir-comprobante/${comprobanteId}`;
        res.status(201).json({ mensaje: `Registro exitoso. Suba su comprobante de transferencia a ${enlaceComprobante}` });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el registro de Permiso de Construcción.' });
    }
};

const obtenerPermisoConstruccionPorRut = async (req, res) => {
    try {
        const { rutSolicitante } = req.params;

        const permiso = await PermisoConstruccion.findOne({ rutSolicitante });

        if (!permiso) {
            return res.status(404).json({ mensaje: 'Permiso de Construcción no encontrado.' });
        }

        res.status(200).json(permiso);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el registro de Permiso de Construcción.' });
    }
};

const marcarComoPagadoPermisoConstruccion = async (req, res) => {
    try {
        const { rutSolicitante } = req.params;

        const permiso = await PermisoConstruccion.findOne({ rutSolicitante });

        if (!permiso) {
            return res.status(404).json({ mensaje: 'Permiso de Construcción no encontrado.' });
        }

        permiso.pagado = true;
        await permiso.save();

        res.status(200).json({ mensaje: 'Permiso de Construcción marcado como pagado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al marcar el Permiso de Construcción como pagado.' });
    }
};

const obtenerTodosLosPermisosConstruccion = async (req, res) => {
    try {
        const permisos = await PermisoConstruccion.find();

        res.status(200).json(permisos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener los permisos de construcción.' });
    }
};

export {
    crearPermisoConstruccion,
    obtenerPermisoConstruccionPorRut,
    marcarComoPagadoPermisoConstruccion,
    obtenerTodosLosPermisosConstruccion,
};
