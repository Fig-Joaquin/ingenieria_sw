import User from '../models/user.js';

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


const login = async (req, res) => {
    const {rut, password} = req.body;

    const user = await User.findOne({rut});
    if(!user) return res.status(400).json({msg: "El usuario no existe"});

    if(user.password !== password) return res.status(401).json({msg: "Contraseña incorrecta"});

    res.json({msg: "Inicio de sesión exitoso"});
};


const getUser = async (req, res) => {
    const {rut} = req.query;

    const user = await User.findOne({rut});
    if(!user) return res.status(404).json({msg: "Usuario no encontrado"});

    res.json({user});
};


const getUserTransactions = async (req, res) => {
    const { rut } = req.query;
  
    try {
      const user = await User.findOne({ rut });
      if (!user) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
      }
  
      const transactions = await Transaction.find({ user: user._id });
      res.json({ transactions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Error al obtener el historial de transacciones' });
    }
  };
  
  export { getUserTransactions, register, login, getUser };





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