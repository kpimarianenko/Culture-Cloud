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
        console.log(err.toString())
        res.status(500).json(this.error500)
    }
}

module.exports.error500 = {
    message: "Internal server error"
}

module.exports.error404 = {
    message: "Not found"
}