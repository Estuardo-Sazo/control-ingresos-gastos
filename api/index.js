const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const cors = require('cors')

const config = require('../config/index');
const groups = require('./components/groups/network');
const subGroups = require('./components/sub-groups/network');
const expenses = require('./components/expenses/network');
const incomes = require('./components/incomes/network');
const realDate = require('./components/real-date/network');


const errors = require('../network/errors');

const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(morgan('dev'));


// ROUTER
app.use('/api/groups', groups);
app.use('/api/sub-groups', subGroups);
app.use('/api/expenses', expenses);
app.use('/api/incomes', incomes);
app.use('/api/real-date', realDate);






app.use(errors);

app.listen(config.api.port, () => {
    console.log('API escuchando en el puerto ', 'http://localhost:' + config.api.port + '/api/');
})