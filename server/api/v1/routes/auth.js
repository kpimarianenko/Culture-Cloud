const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../../config');
const utils = require('../../../utils');
const uploader = require('cloudinary').v2.uploader;
const User = require('../../../models/users');

router.post('/login', function(req, res){
    const jwtSign = user => {
        if (user) 
        jwt.sign({user}, config.secret, { expiresIn: "10h" },function(err, token){
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
    .catch(utils.serverError(res))
    else
    User.getByEmailAndPasswordHash(req.body.email, utils.sha512(req.body.password, config.salt))
    .then(jwtSign)
    .catch(utils.serverError(res))
})

router.post('/register', function(req, res, next) {
    User.getByEmail(req.body.email)
    .then(user => {
        if (user) res.json({
            message: "User with this email already exist",
            status: 400
        })
        else next();
    })
    .catch(utils.serverError(res))
}, function(req, res, next){
    const isSimpleUser = (req.body.issimpleuser === "true") ? true : false;
    if (!isSimpleUser) next();
    else {
        const name = req.body.name || `${req.body.firstname} ${req.body.lastname}`
        if (req.files.avatar)
        uploader.upload_stream({ resource_type: 'raw' }, function (error, result) {
            if (error) res.status(500).json(error);
            else {
                User.add(new User(req.body.email, utils.sha512(req.body.password, config.salt), name, result.url))
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
                .catch(utils.serverError(res))
            }
        })
        .end(req.files.avatar.data);
        else {
            User.add(new User(req.body.email, utils.sha512(req.body.password, config.salt), name))
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
            .catch(utils.serverError(res))
        }
    }
}, function(req, res){
    const isSimpleUser = (req.body.issimpleuser === "true") ? true : false;
    if (!isSimpleUser) {
        const name = req.body.name || `${req.body.firstname} ${req.body.lastname}`
        if (req.files.avatar)
        uploader.upload_stream({ resource_type: 'raw' }, function (error, result) {
            if (error) res.status(500).json(error);
            else {
                User.Collaborator.add(new User.Collaborator(req.body.email, utils.sha512(req.body.password, config.salt), name, req.body.placeName, req.body.city, req.body.cardNumber, req.body.cvv, req.body.expDate, req.body.type, req.body.about, result.url))
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
                .catch(utils.serverError(res))
            }
        })
        .end(req.files.avatar.data);
        else {
            User.Collaborator.add(new User.Collaborator(req.body.email, utils.sha512(req.body.password, config.salt), name, req.body.placeName, req.body.city, req.body.cardNumber, req.body.cvv, req.body.expDate, req.body.type, req.body.about))
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
            .catch(utils.serverError(res))
        }
    }
})

module.exports = router;