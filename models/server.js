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

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port)
        })
    }
}


module.exports = Server;