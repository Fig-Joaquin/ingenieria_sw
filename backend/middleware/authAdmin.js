import jwt from 'jsonwebtoken';
import Admin from '../models/admin.js';

const checkAdm = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded && decoded.rol === 'admin') {
                req.admin = await Admin.findById(decoded.id).select('-password -token -confirmed');

                // Verificar si la ruta es '/fine'
                if (req.path === '/fine') {
                    // Realizar la verificación específica para '/fine'
                    const fineVerificationResponse = await fetch('http://localhost:443/adm-muni/checkFine', {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    console.log('Fine Verification Response:', fineVerificationResponse);

                    if (!fineVerificationResponse.ok) {
                        // Si la verificación para '/fine' falla, enviar una respuesta 403 (Prohibido)
                        const error = new Error('No autorizado para acceder a /fine');
                        return res.status(403).json({ msg: error.message });
                    }
                }

                return next();
            } else {
                const error = new Error('No autorizado, rol de usuario incorrecto');
                return res.status(403).json({ msg: error.message });
            }
        } catch (error) {
            console.error(error);
            const e = new Error('No autorizado, token inválido');
            return res.status(403).json({ msg: e.message });
        }
    }

    if (!token) {
        const error = new Error('No autorizado, no existe token');
        return res.status(403).json({ msg: error.message });
    }

    const formatError = new Error('Formato de token inválido');
    return res.status(401).json({ msg: formatError.message });
};

export default checkAdm;
