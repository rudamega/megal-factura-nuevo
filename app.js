const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT

// contenido estatico
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('Hello World')
})

app.listen(port)