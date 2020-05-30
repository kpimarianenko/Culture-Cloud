const express = require('express');
const router = express.Router();
const utils = require('../../../utils');
const uploader = require('cloudinary').v2.uploader;
const Excursion = require('../../../models/excursions');
const quantity = 5;

router.get('/', function(req, res){
    Promise.all([Excursion.getPage(req.query.page || 1, quantity, ""), Excursion.getCount("")]) 
    .then(response => {
        res.json({
            excursions: response[0],
            maxPage: Math.ceil(response[1] / quantity)
        });
    })
    .catch(utils.serverError(res))
})

router.post('/', function(req, res){
    const search = req.body.search || "";
    const from = req.body.from;
    const to = req.body.to;
    Promise.all([Excursion.getPage(req.query.page || 1, quantity, search, from, to), Excursion.getCount(search, from, to)]) 
    .then(response => {
        res.json({
            excursions: response[0],
            maxPage: Math.ceil(response[1] / quantity)
        });
    })
    .catch(utils.serverError(res))
})

router.get('/collaborators/:id', function(req, res){
    Excursion.getCollaboratorsExcursions(req.params.id)
    .then(excursions => res.json(excursions))
    .catch(utils.serverError(res))
})

router.post('/new', function(req, res){
    if (req.files.avatar)
    uploader.upload_stream({ resource_type: 'raw' }, function (error, result) {
        if (error) res.status(500).json(error);
        else {
            Excursion.add(new Excursion(req.body.name, req.body.about, parseFloat(req.body.price).toFixed(2), req.body.place, result.url))
            .then(excursion => {
                if (excursion)
                res.status(200).json({
                    message: "Excursion added successfully!",
                    status: 200,
                    data: {
                        excursion
                    }
                })
            })
            .catch(utils.serverError(res))
        }
    })
    .end(req.files.avatar.data);
    else {
        Excursion.add(new Excursion(req.body.name, req.body.about, parseFloat(req.body.price).toFixed(2), req.body.place))
        .then(excursion => {
            if (excursion)
            res.status(200).json({
                message: "Register successfully!",
                status: 200,
                data: {
                    excursion
                }
            })
        })
        .catch(utils.serverError(res))
    }
})

module.exports = router;