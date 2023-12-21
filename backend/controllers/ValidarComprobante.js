import PermisoCirculacion from '../models/forms/PermisoCirculacion.js';
import PatenteComercial from '../models/forms/PatenteComercial.js';
import PermisoConstruccion from '../models/forms/PermisoConstruccion.js';
import DerechosDeAseo from '../models/forms/DerechoDeAseo.js';
import PermisoEdificacion from '../models/forms/PermisoEdificacion.js';
import PermisoEventos from '../models/forms/PermisoEventos.js';


const validarComprobante = async (req, res) => {
    try {
      const { rutUsuario, categoria } = req.body;

      // Seleccionar el controlador correcto según la categoría
      let formularioEncontrado;
      switch (categoria) {
        case 'Circulacion':
          formularioEncontrado = await PermisoCirculacion.findOne({ rut: rutUsuario });
          break;
        case 'Comercial':
          formularioEncontrado = await PatenteComercial.findOne({ rutTitular: rutUsuario });
          break;
        case 'Construccion':
          formularioEncontrado = await PermisoConstruccion.findOne({ rutSolicitante: rutUsuario });
          break;
        case 'DerechoAseo':
          formularioEncontrado = await DerechosDeAseo.findOne({ rutResidente: rutUsuario });
          break;
        case 'Edificacion':
          formularioEncontrado = await PermisoEdificacion.findOne({ rutSolicitante: rutUsuario });
          break;
        case 'Eventos':
          formularioEncontrado = await PermisoEventos.findOne({ rutSolicitante: rutUsuario });
          break;
        default:
          return res.status(400).json({ existe: false, mensaje: 'Categoría no reconocida.' });
      }
  
      if (formularioEncontrado) {
        // Si se encuentra el formulario, responder que el comprobante existe y retornar el ID
        return res.status(200).json({ existe: true, idFormulario: formularioEncontrado._id });
      } else {
        // Si no se encuentra el formulario, responder que el comprobante no existe y retorna el ID como null
        return res.status(200).json({ existe: false, idFormulario: null });
      }
    } catch (error) {
      console.error(error);
      return res.status(505).json({ existe: false, mensaje: 'Error al validar el comprobante.' });
    }      
};

export default validarComprobante;
