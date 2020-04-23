const _ = require('lodash');
const {ObjectID} = require('mongodb');

const {Merchant} = require('../model/merchant');
const {Product} = require('../model/product');
const {Category} = require('../model/category');
const {User} = require('../model/user');
const {Sales} = require('../model/sales');

const fetchProduct = async (id) => {
    const product = await Product.findOne({merchant: id});
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

const listMerchant = async (req, res) => {
    try {
        const merchants = await Merchant.find();
        let modifiedMerchants = [];
        for(let i = 0; i < merchants.length; i++){
            const category = await Category.findById(merchants[i].category);
            let data = {
                _id: merchants[i]._id, 
                name: merchants[i].name,
                description: merchants[i].description,
                category: category.name,
                logo: merchants[i].logo,
            }
            modifiedMerchants.push(data);
        }   
        res.status(200).send({
            status: "success",
            data: {
                merchant: modifiedMerchants
            }
        });
    } catch(e) {
        console.log(e);
        res.status(400).send({
            status: "error",
            message: "Merchant information can\'t be fetched"
        });
    }
}

const getMerchant = async (req, res) => {
    try {
        const id = req.params.id;
        if(!ObjectID.isValid(id)){
            return res.status(404).send({
                status: "error",
                message: "Merchant ID is invalid"
            });
        }

        const merchant = await Merchant.findById(id);

        if(merchant){
            const category = await Category.findById(merchant.category);
            var modifiedMerchant = {
                _id: merchant._id, 
                name: merchant.name,
                description: merchant.description,
                category: category.name,
                logo: merchant.logo,
                product: await fetchProduct(merchant._id)
            }
        }
        res.status(200).send({
            status: "success",
            data: {
                merchants: merchant ? modifiedMerchant : "Merchant not found"
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

const merchantSummary = async (req, res) => {
    try {        
        const userID = req.user._id;
        const merchant = await Merchant.findOne({user: userID});

        var sales = await Sales.find().select("-user -_id").
            populate({
                path: "product",
                select: ('merchant name')
            });
        var modifiedSales = [];
        for(var i = 0; i < sales.length; i++){
            if(_.isEqual(sales[i].product.merchant, merchant._id)){
                modifiedSales.push(sales[i]);
            }
        }
        
        var valArr = modifiedSales.map((item) => {
            return item.product.name;
        });
        
        var newSales = [];
        modifiedSales.some((item, idx) => {  
            
            var ih = valArr.indexOf(item.product.name) != idx;
            if(!ih){
                newSales.push(item);
            }else{
                var x = newSales.filter((product => product.product.name == item.product.name)).
                    map((ne) => {
                        // console.log(ne.quantity + item.quantity)
                        return ne.quantity + item.quantity
                    });
                // x[0].quantity = x[0].quantity + item.quantity;
                
                // newSales.push(item);
                console.log(x);
            }
        });
        // console.log(newSales);
        // valArr.some((item, idx) => {
        //     console.log(valArr.indexOf(item));
        //     var ih = valArr.indexOf(item) != idx;
        //     console.log(ih);
        // })
    
        
        var summary = [];
        for(var i = 0; i < modifiedSales.length; i++){
            modifiedSales.filter((salesRecord) => {
                return salesRecord.product._id 
            })
        }
        res.status(200).send({
            status: "success",
            data: {
                sales: modifiedSales
            }
        });
    } catch(e) {
        console.log(e);
        res.status(400).send({
            status: "error",
            message: "Merchant summary can\'t be fetched"
        });
    }
}

module.exports = {listMerchant, getMerchant, merchantSummary}