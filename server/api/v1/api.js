const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('../../config');
const User = require('../../models/users');

router.get('/', verifyToken, function(req, res){
    jwt.verify(req.token, config.secret, function(err, authData){
        if (err) {
            res.sendStatus(403);
        }
        else {
            res.json({
                sasi: "huy",
                // authData
            })
        }
    })
})

router.post('/auth/login', function(req, res){
    const user = {
        id: 1,
        username: 'kpimarianenko',
        email: 'kpimarianenko@gmail.com'
    }

    jwt.sign({user}, config.secret, function(err, token){
        if (err) res.json(err)
        else res.json({
            token
        });
    })
})

router.post('/auth/register', function(req, res){
    console.log(req.body);
    User.add(new User(req.body.email, req.body.password, `${req.body.firstname} ${req.body.lastname}`, req.body.avaUrl))
    .then(user => {
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
    if (!bearerHeader) res.sendStatus(403);
    else {
        const token = bearerHeader.split(' ')[1];
        req.token = token;
        next();
    }
}

module.exports = router;