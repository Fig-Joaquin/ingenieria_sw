import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js'

const checkAuth = async (req, res, next) => {
    let token;
    if(
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer'))
    {
        try{
            token = req.headers.authorization.split(' ')[1]; // Separa el token del Bearer
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
            req.admin = await Admin.findById(decoded.id).select('-password -token -confirmed'); // Selecciona todos los campos menos la contraseña
            return next();
            //req.user = decoded;
        }catch (error) {
            console.log(error);
            const e = new Error('No autorizado, token fallido');
            res.status(403).json({msg: e.message}); 
        }
    }

    if(!token)
    {
    const error = new Error('No autorizado, no existe token');
    res.status(403).json({msg: error.message}); 
    }
    next();
};

export default checkAuth;