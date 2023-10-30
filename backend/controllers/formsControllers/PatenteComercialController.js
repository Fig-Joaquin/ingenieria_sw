import FormularioPatenteComercial from "../../models/forms/PatenteComercial.js";

// Crear un nuevo formulario de Patentes Comerciales
const crearFormulario = async (req, res) => {
    try {
        const {
            nombreComercio,
            rubro,
            direccion,
            numeroLocal,
            rutTitular,
            nombreTitular,
            telefono,
            email,
            fechaInicioActividades,
            actividadEconomica,
            cantidadEmpleados,
            ingresosAnuales
        } = req.body;

        // Crea un nuevo formulario
        const nuevoFormulario = new FormularioPatenteComercial({
            nombreComercio,
            rubro,
            direccion,
            numeroLocal,
            rutTitular,
            nombreTitular,
            telefono,
            email,
            fechaInicioActividades,
            actividadEconomica,
            cantidadEmpleados,
            ingresosAnuales
        });

        // Guardar el formulario en la base de datos
        await nuevoFormulario.save();

        res.status(201).json({ mensaje: 'Registro exitoso.' });
       // res.redirect('/datos-de-transferencia');
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al crear el registro.' });
    }
};

// Obtener un formulario de Patentes Comerciales a partir del RUT
const obtenerFormularioPorRut = async (req, res) => {
    try {
        const { rutTitular } = req.params;

        const formulario = await FormularioPatenteComercial.findOne({ rutTitular });

        if (!formulario) {
            return res.status(404).json({ mensaje: 'Registro no encontrado.' });
        }

        res.status(200).json(formulario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener el registro.' });
    }
};

// Eliminar un formulario de Patentes Comerciales
const eliminarFormulario = async (req, res) => {
    try {
        const { rutTitular } = req.params;

        // Eliminar el formulario de Patentes Comerciales por su RUT
        await FormularioPatenteComercial.findOneAndRemove({ rutTitular });

        res.status(200).json({ mensaje: 'Registro eliminado exitosamente.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al eliminar el formulario.' });
    }
};

// Marcar un formulario de Patentes Comerciales como pagado por RUT
// -IMPORTANTE: VALIDAR RANGO ADMIN PARA HACER PUT AQUÍ-
const marcarComoPagado = async (req, res) => {
    try {
        const { rutTitular } = req.params;

        const formulario = await FormularioPatenteComercial.findOne({ rutTitular });

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
