require('../config/config');
require('./connect');

const {Category} = require('../model/category');
const {Cart} = require('../model/cart');
const {Merchant} = require('../model/merchant');
const {Order} = require('../model/order');
const {Product} = require('../model/product');
const {Sales} = require('../model/sales');
const {User} = require('../model/user');

const category = async () => {
    try {
        var data = [
            {
                name: "Books",
                description: "This is the category for book"
            },
            {
                name: "Electronics",
                description: "This is the category for electronics"
            },
            {
                name: "Gadget",
                description: "This is the category for book"
            }
        ]

        data.forEach(cat => {
            var category = new Category({
                name: cat.name,
                description: cat.description
            });
            category.save();
        });
        console.log("Information successfully seeded into the database")
    } catch (error) {
        console.log(error)
    }
};

const user = async () => {
    try {
        var data = [
            {
                name: "Salami Haruna",
                email: "samlak@dev.com",
                role: "Admin",
                image: "SSAA01-1.jpg",
                password: "password"
            },
            {
                name: "Salami Olalekan",
                email: "sam@lak.dev",
                role: "Merchant",
                image: "SSAA01-1.jpg",
                password: "password"
            },
            {
                name: "Dev Samlak",
                email: "dev@samlak.io",
                role: "User",
                image: "SSAA01-1.jpg",
                password: "password"
            }
        ]

        data.forEach(userInfo => {
            var user = new User({
                name: userInfo.name,
                email: userInfo.email,
                role: userInfo.role,
                image: userInfo.image,
                password: userInfo.password
            });
            user.save();
        });

        console.log("Information successfully seeded into the database")
    } catch (error) {
        console.log(error)
    }
};

const merchant = async () => {
    try {
        var categories = await Category.find();
        var data = [
            {
                name: "Apple",
                description: "Official store for Apple Inc",
                category: categories[1]._id,
                logo: "SSAA01-2.jpg"
            },
            {
                name: "Techno",
                description: "Official store for Techno Inc",
                category: categories[1]._id,
                logo: "SSAA01-2.jpg"
            },
            {
                name: "Bella Naija",
                description: "Official store for Bella Naija Inc",
                category: categories[0]._id,
                logo: "SSAA01-2.jpg"
            }
        ]

        data.forEach(merchantInfo => {
            var merchant = new Merchant({
                name: merchantInfo.name,
                description: merchantInfo.description,
                category: merchantInfo.category,
                logo: merchantInfo.logo
            });
            merchant.save();
        });

        console.log("Information successfully seeded into the database")
    } catch (error) {
        console.log(error)
    }
};

const product = async () => {
    try {
        var merchants = await Merchant.find();
        var users = await User.find();
        var data = [
            {
                merchant: merchants[1]._id,
                name: "Samsung P5",
                description: "This is the description of a perfect product from the best seller ever",
                quantity: 10,
                price: 45000,
                image: "SSAA01-3.jpg",
                review: [
                    {
                        user: users[2]._id,
                        comment: "This product is good and I will want you to use it"
                    },
                    {
                        user: users[1]._id,
                        comment: "This product is good as well try it out"
                    }
                ],
                rating: [
                    {
                        user: users[2]._id,
                        rating: 100
                    }
                ]
            },
            {
                merchant: merchants[0]._id,
                name: "IPhone 11 Pro",
                description: "This is the description of a perfect product from the best seller ever",
                quantity: 10,
                price: 450000,
                image: "SSAA01-3.jpg",
                review: [],
                rating: [
                    {
                        user: users[2]._id,
                        rating: 100
                    }
                ]
            },
            {
                merchant: merchants[2]._id,
                name: "Think and grow rich",
                description: "This is the description of a perfect product from the best seller ever",
                quantity: 10,
                price: 20000,
                image: "SSAA01-3.jpg",
                review: [],
                rating: []
            }
        ]

        data.forEach(productInfo => {
            var product = new Product({
                merchant: productInfo.merchant,
                name: productInfo.name,
                description: productInfo.description,
                quantity: productInfo.quantity,
                price: productInfo.price,
                image: productInfo.image,
                review: productInfo.review,
                rating: productInfo.rating
            });
            product.save();
        });

        console.log("Information successfully seeded into the database")
    } catch (error) {
        console.log(error)
    }
};

const sales = async () => {
    try {
        var users = await User.find();
        var products = await Product.find();
        var data = [
            {
                user: users[2]._id,
                product: products[1]._id,
                quantity: 2,
                price: 40000,
            },
            {
                user: users[2]._id,
                product: products[0]._id,
                quantity: 1,
                price: 400000,
            },
        ]

        data.forEach(salesInfo => {
            var sales = new Sales({
                user: salesInfo.user,
                product: salesInfo.product,
                quantity: salesInfo.quantity,
                price: salesInfo.price,
            });
            sales.save();
        });

        console.log("Information successfully seeded into the database")
    } catch (error) {
        console.log(error)
    }
};

const cart = async () => {
    try {
        var users = await User.find();
        var products = await Product.find();
        var data = [
            {
                user: users[2]._id,
                product: [products[0]._id, products[1]._id]
            }
        ]

        data.forEach(cartInfo => {
            var cart = new Cart({
                user: cartInfo.user,
                product: cartInfo.product
            });
            cart.save();
        });

        console.log("Information successfully seeded into the database")
    } catch (error) {
        console.log(error)
    }
};

const order = async () => {
    try {
        var sales = await Sales.find();
        var data = [
            {
                sales: [sales[0]._id, sales[1]._id],
                status: "Received"
            },
        ]

        data.forEach(orderInfo => {
            var order = new Order({
                sales: orderInfo.sales,
                status: orderInfo.status
            });
            order.save();
        });

        console.log("Information successfully seeded into the database")
    } catch (error) {
        console.log(error)
    }
};

// Run the seed data

// category();
// user();
// merchant();
// product();
// sales();
// cart();
// order();