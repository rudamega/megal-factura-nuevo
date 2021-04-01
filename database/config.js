const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log('Base de datos conectada');
    } catch (error) {
        console.log('Error al conectar a la base de datos')
        throw new Error('Error a la hora de enlazar a la db')
    }

};



module.exports = {
    dbConnection
}