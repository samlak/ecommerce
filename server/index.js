require('./config/config');
require('./database/connect');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());


app.get('/', (req, res) => {
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})