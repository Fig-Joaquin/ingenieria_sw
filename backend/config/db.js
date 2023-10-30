import mongoose from 'mongoose'

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI, {
            // Para evitar warnings en la consola
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado: ${url}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        // Para que la app se detenga
        process.exit(1)
    }
}

export default conectarDB;