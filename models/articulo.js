const { Schema, model } = require('mongoose');

const articuloSchema = Schema({
    categoria: {
        type: Schema.ObjectId,
        ref: 'Categoria'
    },
    codigo: {
        type: String,
        maxlength: 64
    },
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
    precio_venta: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        required: true
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

module.exports = model('Articulo', articuloSchema);