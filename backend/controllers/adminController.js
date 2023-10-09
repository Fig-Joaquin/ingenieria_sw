import Admin from '../models/admin.js'

const profile = (req, res) => {
    res.json({msg: "Perfil del admin"});
};

const register = async (req, res) => {
    try{
        const admin = new Admin(req.body);
        const savedAdmin = await admin.save();
        res.json({msg: "Registrando al administrador"});
    }catch(e){
        console.log(e);
    }
}


export {profile, register};