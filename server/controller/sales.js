const _ = require('lodash');
const {ObjectID} = require('mongodb');

const {Order} = require('../model/order');
const {Product} = require('../model/product');
const {Sales} = require('../model/sales');

const invoice = async (req, res) => {
    try {
        const id = req.params.id;
        
        if(!ObjectID.isValid(id)){
            return res.status(404).send({
                status: "error",
                message: "Invoice ID is invalid"
            });
        }
        var order = await Order.findById(id).
            populate('user', 'name -_id');
        if(order){
            var salesInfo = [];
            for(var i = 0; i < order.sales.length; i++){
                var sales = await Sales.findById(order.sales[i]).
                    select('-user -_id -created').
                    populate('product', 'name -_id');
                salesInfo.push(sales);
            }

            var modifiedOrder = {
                sales: salesInfo,
                _id: order._id,
                user: order.user.name,
                quantity: order.quantity,
                price: order.price,
                status: order.status,
                created: order.created,
            }
        }
        res.status(200).send({
            status: "success",
            data: {
                order: order ? modifiedOrder : "Invoice not found"
            }
        });
    } catch(e) {
        console.log(e);
        res.status(400).send({
            status: "error",
            message: "Error generating invoice"
        });
    }
}

const ordersHistory = async (req, res) => {
    try {
        const authenticatedUser = req.user._id;
        var order = await Order.find({user: authenticatedUser}).select("-sales");
            
        res.status(200).send({
            status: "success",
            data: {
                order: order.length != 0 ? order : "You do not have any order history"
            }
        });
    } catch(e) {
        console.log(e);
        res.status(400).send({
            status: "error",
            message: "Error fetching order history"
        });
    }
}

module.exports = {invoice, ordersHistory}