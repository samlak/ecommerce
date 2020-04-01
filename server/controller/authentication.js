const _ = require('lodash');
const {User} = require('../model/user');

const login = async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send({
            status: "success",
            data: {
                message: "Authentication successful",
                user
            }
        });
    } catch(e) {
        console.log(e);
        res.status(400).send({
            status: "error",
            message: "Authentication unsuccessful. Please check your login detail."
        });
    }
}

const register = async (req, res) => {
    const body = _.pick(req.body, ['name', 'email', 'password']);
    
    var newUser = new User({
        name: body.name,
        email: body.email,
        role: "User",
        password: body.password,
    });
    
    await newUser.save().then(async (result) => {
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send({
            status: "success",
            data: {
                message: "Account created successfully",
                user
            }
        });
    }, (e) => {
        console.log(e);
        res.status(400).send({
            status: "error",
            message: "Error creating account"
        });
    });
        
}

module.exports = {login, register}