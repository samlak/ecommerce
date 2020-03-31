const _ = require('lodash');
const {ObjectID} = require('mongodb');

const {Merchant} = require('../model/merchant');
const {Product} = require('../model/product');
const {Sales} = require('../model/sales');
const {Order} = require('../model/order');

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
            populate({
                path: 'sales', 
                populate: [{
                    path: 'product',
                    select: 'name -_id' 
                },{
                    path: 'user',
                    select: 'name -_id' 
                }],
                select: '-created '
            });
        // if(order){
        //     order = {
        //         salesInfo: order,
        //         otherInfo: {

        //         }
        //     }
        // }else{
        //     order = "Invoice not found";
        // }
        res.status(200).send({
            status: "success",
            data: {
                order: order ? order : "Invoice not found"
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

module.exports = {invoice}