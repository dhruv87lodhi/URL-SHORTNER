const usersModel = require('../models/users');
const { setToken, getUser } = require('../services/auth');

async function handleUserSignUp(req, res) {
    const {name, email, password} = req.body;
    const user  = await usersModel.create({
        name,
        email,
        password
    });
    const token = setToken(user);
    res.cookie('token', token);
    return res.redirect('/');
}
async function handleUserLogin(req, res) {
    const {email, password} = req.body;
    const user = await usersModel.findOne({email, password});

    if(!user) {
        return res.redirect('/login');
    }

    const token = setToken(user);
    res.cookie('token', token);
    return res.redirect('/');
}

module.exports = {
    handleUserSignUp,
    handleUserLogin
}
