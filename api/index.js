const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const config = require('../config/index');
const groups = require('./components/groups/network');
const subGroups = require('./components/sub-groups/network');
const expenses = require('./components/expenses/network');

const errors = require('../network/errors');

const app = express();
app.use(cors())
app.use(bodyParser.json());


// ROUTER
app.use('/api/groups', groups);
app.use('/api/sub-groups', subGroups);
app.use('/api/expenses', expenses);




app.use(errors);

app.listen(config.api.port, () => {
    console.log('API escuchando en el puerto ','http://localhost:'+ config.api.port+'/api/');
})