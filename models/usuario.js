const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        maxlength: 50,
        required: true
    },
    rol: {
        type: String,
        maxlength: 30,
        require: true
    },
    tipo_documento: {
        type: String,
        maxlength: 20
    },
    num_documento: {
        type: String,
        maxlength: 20
    },
    direccion: {
        type: String,
        maxlength: 70
    },
    telefono: {
        type: String,
        maxlength: 20
    },
    email: {
        type: String,
        maxlength: 50,
        unique: true,
        require: true
    },
    password: {
        type: String,
        maxlength: 64,
        require: true
    },
    estado: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Usuario', usuarioSchema);