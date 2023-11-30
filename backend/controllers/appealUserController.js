import AppealUser from '../models/appealUser.js'
import User from '../models/user.js'

const createAppealUser = async (req, res) => {
try {
    const { rut, reason } = req.body; // Obtén los datos necesarios del cuerpo de la solicitud
    const client = await User.findOne({ rut }); // Busca el usuario por su rut
    // Crea una nueva instancia de AppealUser
    console.log(client.id);
    const newAppealUser = new AppealUser({
    user: client.id, // Asigna el ID del usuario que presenta la apelación
    reason,
    });
      // Guarda la nueva apelación en la base de datos
    await newAppealUser.save();
    res.status(200).json(newAppealUser);
    } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'Error al crear la apelación' });
    }
};

export default createAppealUser;