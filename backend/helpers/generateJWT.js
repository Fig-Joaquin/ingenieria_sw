import jwt from 'jsonwebtoken'

const generarJWT = (id, rol) => {
    return jwt.sign({id, rol}, process.env.JWT_SECRET, {expiresIn: '3d'});	// Genera el JWT con el id del usuario y la clave secreta
}	// Función para generar el JWT

export default generarJWT;	// Exporta la función