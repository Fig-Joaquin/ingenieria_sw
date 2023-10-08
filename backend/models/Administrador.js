import mongoose from 'mongoose'

const administradorSchema = mongoose.Schema({

    name: {
        type: 'string', // Tipo de dato
        required: true, // Obligatorio
        trim: true, // Eliminar espacios en blanco
    },
    lastname: {
        type: 'string', // Tipo de dato
        required: true, // Obligatorio
        
    },
    rut:{
        type: 'string', // Tipo de dato
        required: true, // Obligatorio
    }, 
    password: {
        typeof: 'string', // Tipo de dato
        required: true, // Obligatorio
    },
    email: {
        type: 'string', // Tipo de dato
        required: true, // Obligatorio
        unique: true, // Unico en su tipo
        trim: true, // Eliminar espacios en blanco
    },
    token: {
        type: 'string', // Tipo de dato
    },
    confirmed: {
        type: 'boolean', // Tipo de dato
        default: false, // Valor por defecto
    },
});

const Administrador = mongoose.model('Administrador', administradorSchema);
export default Administrador;