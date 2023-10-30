import Admin from '../models/admin.js'
import generateJWT from '../helpers/generateJWT.js'

const profile = async (req, res) => {
    const {rut} = req.params;
    const searchAdmin = await Admin.findOne({rut});
    console.log(searchAdmin);
};

const authprofile= async (req, res) => {
    const {rut, password} = req.body;
    const searchAdmin = await Admin.findOne({rut});
    if(!searchAdmin) return res.status(400).json({msg: "El usuario no existe"});

    if (await searchAdmin.matchPassword(password)) { // Compara la contraseña ingresada con la contraseña en la base de datos
    res.json({token: generateJWT(searchAdmin.id)}); // Genera el token
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

const extractUserIdFromToken = (req,res) => {
    console.log(req.admin.id);
};


export {profile,authprofile,register,confirmAccount,extractUserIdFromToken};

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