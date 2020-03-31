require('./config/config');
require('./database/connect');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const Authentication = require('./controller/authentication');
const Product = require('./controller/product');
const Merchant = require('./controller/merchant');
const Sales = require('./controller/sales');

var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    await Authentication.login(req, res);
});

app.get('/products', authenticate, async (req, res) => {
    await Product.listProduct(req, res);
});

app.get('/product/:id', authenticate, async (req, res) => {
    await Product.getProduct(req, res);
});

app.get('/merchants', authenticate, async (req, res) => {
    await Merchant.listMerchant(req, res);
});

app.get('/merchant/:id', authenticate, async (req, res) => {
    await Merchant.getMerchant(req, res);
});

app.get('/invoice/:id', authenticate, async (req, res) => {
    await Sales.invoice(req, res);
});

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})