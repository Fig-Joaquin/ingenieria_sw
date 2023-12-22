import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'secreto', { expiresIn: '5h' });
};

const login = async (req, res) => {
  const { rut, password } = req.body;

  try {
    const user = await User.findOne({ rut });
    if (!user) return res.status(400).json({ msg: 'El usuario no existe' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    // Generar un token JWT
    const token = jwt.sign({ userId: user._id, role: 'user' }, 'secreto', { expiresIn: '1h' });

    // Enviar el token al cliente
    res.json({ msg: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const loginUser = async (req, res) => {
  const { rut, password } = req.body;

  try {
    const user = await User.findOne({ rut });
    if (!user) return res.status(400).json({ msg: 'El usuario no existe' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ msg: 'Contraseña incorrecta' });

    // Generar y enviar el token al cliente
    const token = generateToken(user._id);
    res.json({ msg: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const register = async (req, res) => {
  const { rut, password, name, lastName, statusUser, email, address, phoneNumber } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ rut });
    if (userExists) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Hashear la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con la contraseña hasheada y otros campos
    const newUser = new User({
      rut,
      password: hashedPassword,
      name,
      lastName,
      statusUser,
      email,
      address,
      phoneNumber,
      // Otros campos del usuario que puedas recibir del req.body
    });

    // Guardar el usuario en la base de datos
    const savedUser = await newUser.save();

    // Generar un token JWT y enviarlo al cliente
    const token = generateToken(savedUser._id);
    res.json({ msg: 'Registro exitoso', token });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};





const updateUser = async (req, res) => {
  const { rut, newStatus } = req.body;

  try {
    const user = await User.findOne({ rut });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    user.statusUser = newStatus;
    await user.save();

    res.json({ msg: 'Estado del usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el estado del usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};



  
  export { register ,loginUser, updateUser, login};





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