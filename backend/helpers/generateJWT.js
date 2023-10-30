import jwt from 'jsonwebtoken'

const generarJWT = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});	// Genera el JWT con el id del usuario y la clave secreta
}	// Función para generar el JWT

export default generarJWT;	// Exporta la función