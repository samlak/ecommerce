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

module.exports = {login}