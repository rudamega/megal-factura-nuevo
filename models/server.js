const express = require('express');

const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT

        //conectar a base de datos
        this.dbconectar();
        //middlewares
        this.middlewares();

        //rutas de mi app
        this.routes();


    }


    async dbconectar() {
        await dbConnection();
    }

    middlewares() {

        this.app.use(cors());

        //lectura y parseo del body

        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));

    }



    routes() {
        this.app.use('/api/categorias', require('../routes/categoria'));
        this.app.use('/api/articulos', require('../routes/articulo'));
        this.app.use('/api/usuarios', require('../routes/usuario'));
        this.app.use('/api/personas', require('../routes/persona'));
        this.app.use('/api/ingresos', require('../routes/ingreso'));
        this.app.use('/api/ventas', require('../routes/venta'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}


module.exports = Server;