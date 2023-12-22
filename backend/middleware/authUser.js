import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) return res.status(401).json({ msg: 'No hay token, acceso no autorizado' });

  try {
    const decoded = jwt.verify(token, 'secreto');
    req.user = decoded; // Añadir información del usuario a la solicitud
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ msg: 'Token no válido' });
  }
};

export default verifyToken;
