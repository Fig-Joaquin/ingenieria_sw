import mongoose from 'mongoose'
import generarId from '../helpers/generarId.js';

const adminSchema = mongoose.Schema({

    name: {
        type: String, // Tipo de dato
        required: true, // Obligatorio
        trim: true, // Eliminar espacios en blanco
    },
    lastname: {
        type: String, // Tipo de dato
        required: true, // Obligatorio
        
    },
    rut:{
        type: String, // Tipo de dato
        required: true, // Obligatorio
    }, 
    password: {
        type: String, // Tipo de dato
        required: true, // Obligatorio
    },
    email: {
        type: String, // Tipo de dato
        required: true, // Obligatorio
        unique: true, // Unico en su tipo
        trim: true, // Eliminar espacios en blanco
    },
    token: {
        type: String, // Tipo de dato
        default: generarId(), // Llamar la función para generar un id único
    },
    confirmed: {
        type: Boolean, // Tipo de dato
        default: false, // Valor por defecto
    },
});

const Admin = mongoose.model('Admin', adminSchema,'administrador'); // Crea el admin en la DB
export default Admin;