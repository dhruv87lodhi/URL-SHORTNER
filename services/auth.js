const jwt = require('jsonwebtoken');
const SECRET = "Key@$98879";

function setToken(user) {
    const payload = {
        _id : user._id,
        email : user.email,
        role : user.role
    };
    return jwt.sign(payload, SECRET)
}

function getUser(token) {
    try {
        return jwt.verify(token, SECRET);
    } catch(err) {
        return null;
    }
}

module.exports = {
    setToken,
    getUser
}