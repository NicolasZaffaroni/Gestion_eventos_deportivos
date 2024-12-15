const jwt = require('jsonwebtoken');

const createToken = (info) => {
    const data = {
    user_id: info._id,
    user_email: info.email,
    };
    return jwt.sign(data, process.env.SECRET_KEY_JWT);
};

module.exports = { createToken };