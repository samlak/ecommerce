require('./config/config');
require('./database/connect');

const {Category} = require('../model/category');
const {Cart} = require('../model/cart');
const {Merchant} = require('../model/merchant');
const {Order} = require('../model/order');
const {Product} = require('../model/product');
const {Sales} = require('../model/sales');
const {User} = require('../model/user');

const saveArticle = async (req, res) => {
    try {
        if(req.files){
            var image = req.files.image;
            var modifiedName = new Date().getTime() + image.name ;
            var path = __dirname + '/../../public/upload/' + modifiedName;
            
            await image.mv(path);
        
            var article = new Article({
                author: "5e4da886e4f93d18a024e699",
                category: req.body.category,
                title: req.body.title,
                content: req.body.content,
                image: modifiedName
            });
        }else{
            var article = new Article({
                author: "5e4da886e4f93d18a024e699",
                category: req.body.category,
                title: req.body.title,
                content: req.body.content,
            });
        }

        await article.save().then((result) => {
            req.flash('articleCreated', "Your article has been created successfully");
        }, (e) => {
            req.flash('articleCreated', "There is problem creating a new article");
        });

        res.redirect('/admin/article');
    } catch (error) {
        req.flash('articleCreated', "There is problem uploading image for your new article");
        res.redirect('/admin/article');
    }
};