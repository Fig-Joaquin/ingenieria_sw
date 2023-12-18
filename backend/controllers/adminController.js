import Admin from '../models/admin.js'
import User from '../models/user.js';
import generateJWT from '../helpers/generateJWT.js'

const profile = async (req, res) => {
    const {rut} = req.params;
    const searchAdmin = await Admin.findOne({rut});
    console.log(searchAdmin);
};

const authprofile= async (req, res) => {
    const {rut, password} = req.body;
    console.log(rut, password);
    const searchAdmin = await Admin.findOne({rut});
    if(!searchAdmin) return res.status(400).json({msg: "El usuario no existe"});

    if (await searchAdmin.matchPassword(password)) { // Compara la contraseña ingresada con la contraseña en la base de datos
    res.json({token: generateJWT(searchAdmin.id, "admin")}); // Genera el token
    console.log(generateJWT(searchAdmin.id, "admin"));
    } else {
        const error = new Error('Contraseña incorrecta');
        return res.status(400).json({msg: error.message});
    };
};

const register = async (req, res) => {   
    const {rut} = req.body;

    const adminExists = await Admin.findOne({rut});
    if(adminExists) return res.status(400).json({msg: "El usuario ya existe"});

    try{
        const admin = new Admin(req.body);
        const savedAdmin = await admin.save();
        res.json({msg: "Se ha guardado el usuario administrador"}); 
    }catch(e){
        console.log(e);
    }
};

const confirmAccount = async (req, res) => {
    const {token} = req.params;
    const confirmAdmin = await Admin.findOne({token: token});
    console.log(confirmAdmin);
    res.json({msg: "El usuario ha sido confirmado"});
};

const statusAdm = async (req, res) => {
  return res.status(200).json({msg: "El usuario ha sido activado"});
};
const extractUserIdFromToken = (req,res) => {
    console.log(req.admin.id);
};
const getAllUser = async (req, res) => {
    try {
    const user = await User.find();
    res.json(user);
    } catch (error) {
    res.status(400).json({ error: 'Error al obtener las apelaciones' });
    }
};

const isValidRut = (rut) => {
    const rutRegex = /^[0-9]{7,8}-?[0-9kK]$/;
  
    return rutRegex.test(rut);
  };
  

const changeUserStatus = async (req, res) => {
    const { rut, status } = req.body;
  
    // Validar el formato del RUT
    if (!isValidRut(rut)) {
      return res.status(400).json({ error: 'RUT no válido' });
    }
  
    // Asegúrate de que el nombre del campo coincida con el enviado en la solicitud
    try {
      const user = await User.findOne({ rut });
  
      if (!user) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
      }
  
      const allowedStatus = ["deudor", "solvente"];
  
      // Validar que el nuevo estado sea válido
      if (!allowedStatus.includes(status.toLowerCase())) {
        console.log(status);
        return res.status(400).json({ error: 'El nuevo estado no es válido' });
      }
  
      user.statusUser = status;
      await user.save();
  
      res.json({ message: 'Estado del usuario actualizado' });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: 'Error al actualizar el estado del usuario' });
    }
  };
  





export {profile,statusAdm,authprofile,register,changeUserStatus,confirmAccount,extractUserIdFromToken,getAllUser};

// Por importar
/*
const showApelacion = async () => {
   const result = await User.aggregate(
    [
        {
            $lookup: 
            {
                from: "apelacion",
                localField: "rut",
                foreignField: "rut",
                as: "apelacion"
            }
        },
      
   ])
   console.log(result);
}
*/