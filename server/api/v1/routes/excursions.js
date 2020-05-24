const express = require('express');
const router = express.Router();
const utils = require('../../../utils');
const Excursion = require('../../../models/excursions');

router.get('/', function(req, res){
    res.json("lul")
})

router.post('/', function(req, res){
    res.json(req.body)
})

module.exports = router;