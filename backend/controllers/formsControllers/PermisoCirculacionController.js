import FormularioPermisoCirculacion from "../../models/forms/PermisoCirculacion.js";

//  Crear un nuevo formulario de Permiso de Circulación
const crearFormulario = async (req, res) => {
    try {
        const { rut, patente } = req.body;

        // Crea un nuevo formulario
        const nuevoFormulario = new FormularioPermisoCirculacion({
            rut,
            patente,
        });

        // Guardar el formulario en la base de datos
        await nuevoFormulario.save();

        res.status(201).json({ mensaje: 'Registro exitoso.' });
        res.redirect('/datos-de-transferencia');
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
// -IMPORTANTE: VALIDAR RANGO ADMIN PARA HACER PUT AQUÍ-
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
