import User from './models/user';

const register = async (req, res) => {   
    const {rut} = req.body;

    const UserExists = await User.findOne({rut});
    if(UserExists) return res.status(400).json({msg: "El usuario ya existe"});

    try{
        const user = new User(req.body);
        const savedUser = await user.save();
        res.json({msg: "Se ha guardado el usuario "}); 
    }catch(e){
        console.log(e);
    }
};

export const loginUser = async (req, res) => {
    try {
      const { rut, password } = req.body;
  
      // Verificar si el usuario existe
      const user = await User.findOne({ rut });
  
      if (!user) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
      }
  
      // Verificar la contraseña
     // const validPassword = await bcrypt.compare(contraseña, user.contraseña);
  
     // if (!validPassword) {
     //   return res.status(401).json({ message: 'Credenciales inválidas' });
     // }
  
      // Generar un token de autenticación
      const token = jwt.sign({ userId: user._id }, 'tu_clave_secreta');
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  };
  
  export const updateUser = async (req, res) => {
    try {
      const { rut } = req.params; // El Rut del usuario que se va a actualizar
      const newData = req.body; // Los nuevos datos del usuario
      
      // Verificar si el usuario existe
      const user = await User.findOne({ rut });
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Actualizar la información personal del usuario
      user.name = newData.name || user.name;
      user.lastname = newData.lastname || user.lastname;
      user.email = newData.email || user.email;
      user.adress = newData.adress || user.adress;
      user.phonenumber = newData.phonenumber || user.phonenumber;
  
      // Guardar los cambios en la base de datos
      await user.save();
  
      res.status(200).json({ message: 'Información de usuario actualizada con éxito' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la información del usuario' });
    }
  };
  

  // getUserProfile(req, res): Obtiene el perfil de un usuario.
export const getUserProfile = async (req, res) => {
    try {
      const { rut } = req.params; // Identificador único (Rut) del usuario
  
      // Buscar al usuario por su Rut
      const user = await User.findOne({ rut });
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Excluir la contraseña del perfil antes de enviarlo
      const userProfile = { ...user.toObject() };
      delete userProfile.password;
  
      res.status(200).json(userProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
    }
  };
  
  // getUserTransactions(req, res): Obtiene el historial de transacciones de un usuario.
  export const getUserTransactions = async (req, res) => {
    try {
      const { rut } = req.params; // Identificador único (Rut) del usuario
  
      // Buscar al usuario por su Rut
      const user = await User.findOne({ rut });
  
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Obtener el historial de transacciones del usuario
      const userTransactions = user.transactions;
  
      res.status(200).json(userTransactions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener el historial de transacciones del usuario' });
    }
  };

  import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import User from '../models/user'; // Asegúrate de importar el modelo de usuario




//registerUser(req, res): Registra un nuevo usuario en el sistema.
//loginUser(req, res): Inicia sesión de un usuario existente.
//updateUser(req, res): Actualiza la información personal de un usuario.
//getUserProfile(req, res): Obtiene el perfil de un usuario.
//getUserTransactions(req, res): Obtiene el historial de transacciones de un usuario.
//resetPassword(req, res): Permite a un usuario restablecer su contraseña.
//changeUserRole(req, res): Cambia el rol de un usuario (administrador, cliente, etc.).
//manageUserAccounts(req, res): Realiza operaciones de administración en las cuentas de usuario (activar, desactivar, eliminar, etc.).
//recordPayment(req, res): Registra un pago realizado por un usuario.
//recordFine(req, res): Registra una multa aplicada a un usuario.
//submitAppeal(req, res): Permite a un usuario presentar una apelación.
//approveAppeal(req, res): Permite a un administrador aprobar una apelación.
//rejectAppeal(req, res): Permite a un administrador rechazar una apelación. //