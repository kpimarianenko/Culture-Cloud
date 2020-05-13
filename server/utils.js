const crypto = require('crypto');

module.exports.verifyToken = function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader) res.status(403).json({
        status: 403,
        message: "Unathorized"
    });
    else {
        const token = bearerHeader.split(' ')[1];
        req.token = token;
        next();
    }
}

module.exports.sha512 = function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
};

module.exports.serverError = function(res) {
    return err => {
        res.status(500).json({
            message: "Internal server error",
            status: 500
        })
    }
}