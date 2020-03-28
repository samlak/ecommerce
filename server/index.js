require('./config/config');
require('./database/connect');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {Category} = require('./model/category');
const {Cart} = require('./model/cart');
const {Merchant} = require('./model/merchant');
const {Order} = require('./model/order');
const {Product} = require('./model/product');
const {Sales} = require('./model/sales');
const {User} = require('./model/user');

var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());


app.get('/', authenticate, (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "Welcome"
        }
    });
});

app.post('/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
        // res.status(200).send({
        //     status: "success",
        //     data: {
        //         message: "Welcome"
        //     }
        // });
    } catch(e) {
        console.log(e);
        res.status(400).send({
            status: "error",
            message: "Authentication unsuccessful. Please check your login detail."
        });
    }
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})