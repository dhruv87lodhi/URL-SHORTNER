const { getUser } = require('../services/auth')

function checkForAuthentication(req, res, next) {
    req.user = null;

    if(!req.cookies.token) {
        return next();
    }

    const user = getUser(req.cookies.token);
    req.user = user;

    return next();
}

function restrictTo(roles = []) {
    return function (req, res, next) {
        if(!req.user) {
            return res.redirect('/login');
        }

        if(!roles.includes(req.user.role)) {
            return res.end("UnAuthorized");
        }

        return next();
    }
}

module.exports = {
    checkForAuthentication,
    restrictTo
}