import mongoose from 'mongoose'
import generarId from '../helpers/generarId.js'
import bcrypt from 'bcrypt'

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
// Encriptar contraseña antes de guardar el schema
adminSchema.pre('save', async function(next) { 
    //Hash password
    if (!this.isModified('password')) // Si la contraseña ha sido modificada no la vuelve a hashear 
    {
    next();
    };
    const salt = await bcrypt.genSalt(10); // Genera un hash de 10 caracteres
    this.password = await bcrypt.hash(this.password, salt); // Encripta la contraseña
});

const Admin = mongoose.model('Admin', adminSchema,'administrador'); // Crea el admin en la DB
export default Admin;