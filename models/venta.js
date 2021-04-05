const { Schema, model } = require('mongoose');

const ventaSchema = Schema({
    usuario: {
        type: Schema.ObjectId,
        ref: 'usuario',
        require: true
    },
    persona: {
        type: Schema.ObjectId,
        ref: 'persona',
        require: true
    },
    tipo_comprobante: {
        type: String,
        maxlength: 20,
        require: true
    },
    serie_comprobante: {
        type: String,
        maxlength: 7,
        require: true
    },
    num_comprobante: {
        type: String,
        maxlength: 20,
        require: true
    },
    impuesto: {
        type: Number,
        require: true
    },
    total: {
        type: Number,
        require: true
    },
    detalles: [{
        _id: {
            type: String,
            require: true
        },
        articulo: {
            type: String,
            require: true
        },
        cantidad: {
            type: Number,
            require: true
        },
        precio: {
            type: Number,
            require: true
        },
        descuento: {
            type: Number
        }
    }],
    estado: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = model('Venta', ventaSchema);