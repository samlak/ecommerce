const _ = require('lodash');
const {ObjectID} = require('mongodb');

const {Product} = require('../model/product');
const {Merchant} = require('../model/merchant');
const {User} = require('../model/user');

const fetchProduct = async (id) => {
    const product = await Product.findById(id);
    const merchant = await Merchant.findById(product.merchant);

    let reviews = [];

    for(let j = 0; j < product.review.length; j++){
        const user = await User.findById(product.review[j].user);
        let review = {
            _id: product.review[j]._id,
            user: user.name,
            comment: product.review[j].comment,
        }
        reviews.push(review);
    }

    let rating = (product.rating.map((ratings) => ratings.rating).reduce((first, second) => (first + second), 0)) / product.rating.length;

    let modifiedProduct = {
        _id: product._id,
        merchant: merchant.name,
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        image: product.image,
        review: reviews.length == 0 ? "No review" : reviews,
        rating: rating ? rating : 0,
    }

    return modifiedProduct;
}

const listProduct = async (req, res) => {
    try {
        const products = await Product.find();
        let modifiedProducts = [];
        for(let i = 0; i < products.length; i++){
            const merchant = await Merchant.findById(products[i].merchant);
            let reviews = [];
            for(let j = 0; j < products[i].review.length; j++){
                const user = await User.findById(products[i].review[j].user);
                let review = {
                    _id: products[i].review[j]._id,
                    user: user.name,
                    comment: products[i].review[j].comment,
                }
                reviews.push(review);
            }
            let rating = (products[i].rating.map((ratings) => ratings.rating).reduce((first, second) => (first + second), 0)) / products[i].rating.length;
            let data = {
                _id: products[i]._id,
                merchant: merchant.name,
                name: products[i].name,
                description: products[i].description,
                quantity: products[i].quantity,
                price: products[i].price,
                image: products[i].image,
                review: reviews.length == 0 ? "No review" : reviews,
                rating: rating ? rating : 0,
            }
            modifiedProducts.push(data);
        }   
        res.status(200).send({
            status: "success",
            data: {
                products: modifiedProducts
            }
        });
    } catch(e) {
        console.log(e);
        res.status(400).send({
            status: "error",
            message: "Product information can\'t be fetched"
        });
    }
}

const getProduct = async (req, res) => {
    try {
        const id = req.params.id;
        if(!ObjectID.isValid(id)){
            return res.status(404).send({
                status: "error",
                message: "Product ID is invalid"
            });
        }

        const product = await Product.findById(id);
        if(product){
            const merchant = await Merchant.findById(product.merchant);
        
            let reviews = [];
        
            for(let j = 0; j < product.review.length; j++){
                const user = await User.findById(product.review[j].user);
                let review = {
                    _id: product.review[j]._id,
                    user: user.name,
                    comment: product.review[j].comment,
                }
                reviews.push(review);
            }
        
            let rating = (product.rating.map((ratings) => ratings.rating).reduce((first, second) => (first + second), 0)) / product.rating.length;
        
            var modifiedProduct = {
                _id: product._id,
                merchant: merchant.name,
                name: product.name,
                description: product.description,
                quantity: product.quantity,
                price: product.price,
                image: product.image,
                review: reviews.length == 0 ? "No review" : reviews,
                rating: rating ? rating : 0,
            }
        }
            
        res.status(200).send({
            status: "success",
            data: {
                product: product ? modifiedProduct : "Product not found"
            }
        });
    } catch(e) {
        console.log(e);
        res.status(400).send({
            status: "error",
            message: "Product information can\'t be fetched"
        });
    }
}

module.exports = {listProduct, getProduct}