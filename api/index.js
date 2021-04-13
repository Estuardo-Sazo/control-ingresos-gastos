const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const config= require('../config/index');
const groups= require('./components/groups/network');

const errors = require('../network/errors');

const app = express();

app.use(bodyParser.json());


// ROUTER
app.use('/api/groups',groups);



app.use(errors);

app.listen(config.api.port, () =>{
    console.log('API escuchando en el puerto ', config.api.port);
})