const { Schema, model } = require('mongoose');

const categoriaSchema = Schema({
    nombre: {
        type: String,
        maxlength: 50,
        unique: true,
        required: true
    },
    descripcion: {
        type: String,
        maxlength: 255
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

module.exports = model('Categorias', categoriaSchema);