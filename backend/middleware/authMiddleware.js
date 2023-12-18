import jwt from 'jsonwebtoken'
import Admin from '../models/admin.js'

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Separa el token del Bearer
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
            // Verificar si es un token de administrador
            if (decoded && decoded.rol === 'admin') {
                req.admin = await Admin.findById(decoded.id).select('-password -token -confirmed'); // Selecciona todos los campos menos la contraseña
                return next();
            } else {
                // Si el rol no es de administrador, enviar una respuesta 403 (Prohibido)
                const error = new Error('No autorizado, rol de usuario incorrecto');
                return res.status(403).json({ msg: error.message });
            }
        } catch (error) {
            console.log(error);
            const e = new Error('No autorizado, token fallido');
            return res.status(403).json({ msg: e.message }); // Devolver la respuesta aquí y salir del middleware
        }
    }

    if (!token) {
        const error = new Error('No autorizado, no existe token');
        return res.status(403).json({ msg: error.message }); // Devolver la respuesta aquí y salir del middleware
    }

    // Si el token está presente pero no sigue el formato adecuado, podrías enviar una respuesta 401 (no autorizado)
    const formatError = new Error('Formato de token inválido');
    return res.status(401).json({ msg: formatError.message });
};

export default checkAuth;