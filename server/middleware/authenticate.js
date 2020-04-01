const {User} = require('./../model/user');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        if(!user){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send({
            status: "error",
            message: "You need to be authenticated before you can access this."
        });
    });
};

var isMerchant = (req, res, next) => {
    var token = req.header('x-auth');

    User.findByToken(token).then((user) => {
        var role = user.role.includes("Merchant");
        if(!role){
            return Promise.reject();
        }
        next();
    }).catch((e) => {
        res.status(401).send({
            status: "error",
            message: "Opps! You must be a Merchant to access this page. Contact the admin for more info."
        });
    });
};

module.exports = {authenticate, isMerchant}