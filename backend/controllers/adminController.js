import Admin from '../models/admin.js'

const profile = async (req, res) => {
    const {rut} = req.params;
    const searchAdmin = await Admin.findOne({rut});
    console.log(searchAdmin);
};

const profileBody = async (req, res) => {
    const {rut} = req.body;
    const searchAdmin = await Admin.findOne({rut});
    console.log(searchAdmin);
    res.json({msg: "Se ha encontrado el usuario"});
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



export {profile, profileBody,register, confirmAccount};

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