import mongoose from 'mongoose';

const transferenciaDatosSchema = new mongoose.Schema({
    banco: {
        type: String,
        default: "Banco Falabella",
    },
    cuenta: {
        type: String,
        default: "1-999-297092-0",
    },
    titular: {
        type: String,
        default: "Eduardo Riquelme Vejar",
    },
    rutTitular: {
        type: String,
        default: "20.970.296-7",
    },
    tipoCuenta: {
        type: String,
        default: "Cuenta Corriente",
    },
    emailContacto: {
        type: String,
        default: "pagos@municipalidad.com",
    },
    telefonoContacto: {
        type: String,
        default: "+56945673662",
    },
});

const TransferenciaDatos = mongoose.model('transferenciaDatos', transferenciaDatosSchema);

export default TransferenciaDatos;
