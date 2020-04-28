const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('../../config');
const User = require('../../models/users');

router.get('/', verifyToken, function(req, res){
    jwt.verify(req.token, config.secret, function(err, authData){
        if (err) {
            res.status(403).json({
                message: "Unathorized",
                status: 403
            });
        }
        else {
            res.json({
                sasi: "huy",
                authData
            })
        }
    })
})

router.get('/me', verifyToken, function(req, res){
    jwt.verify(req.token, config.secret, function(err, authData){
        if (err) {
            res.status(403).json({
                message: "Unathorized",
                status: 403
            });
        }
        else {
            res.status(200).json({
                user: authData.user,
                status: 200
            })
        }
    })
})

router.post('/auth/login', function(req, res){
    const jwtSign = user => {
        if (user) 
        jwt.sign({user}, config.secret, { expiresIn: "10s" },function(err, token){
            if (err) res.json(err)
            else res.status(200).json({
                status: 200,
                token
            });
        })
        else res.status(404).json({
            message: "Incorrect email or password",
            status: 404
        })
    }

    if (req.body.googleId)
    User.getByEmail(req.body.email)
    .then(jwtSign)
    .catch(err => {
        res.status(500).json({
            message: "Internal server error",
            status: 500
        })
    })
    else
    User.getByEmailAndPasswordHash(req.body.email, sha512(req.body.password, config.salt))
    .then(jwtSign)
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            status: 500
        })
    })
})

router.post('/auth/register', function(req, res){
    console.log(req.body, req.files)
    const name = req.body.name ? req.body.name : `${req.body.firstname} ${req.body.lastname}`
    User.getByEmail(req.body.email)
    .then(user => {
        if (user) res.json({
            message: "User with this email already exist",
            status: 400
        })
        else return User.add(new User(req.body.email, sha512(req.body.password, config.salt), name, req.body.avaUrl))
    })
    .then(user => {
        if (user)
        res.status(200).json({
            message: "Register successfully!",
            status: 200,
            data: {
                user
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            status: 500
        })
    })
})

function verifyToken(req, res, next) {
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

function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
};

module.exports = router;