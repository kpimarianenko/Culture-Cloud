const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../../config');
const utils = require('../../utils');

router.get('/', function(req, res){
    res.json({})
})

router.get('/me', utils.verifyToken, function(req, res){
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

const authRouter = require('./routes/auth');
router.use('/auth', authRouter);

const collaboratorsRouter = require('./routes/collaborators');
router.use('/collaborators', collaboratorsRouter);

const excursionsRouter = require('./routes/excursions');
router.use('/excursions', excursionsRouter);

const exhibitsRouter = require('./routes/exhibits');
router.use('/exhibits', exhibitsRouter);

module.exports = router;