const express = require('express');
const router = express.Router();
const utils = require('../../../utils');
const Collaborator = require('../../../models/users').Collaborator;
const Excursion = require('../../../models/excursions');

router.get('/', function(req, res){
    let quantity = 5;
    Promise.all([Collaborator.getPage(req.query.page || 1, quantity), Collaborator.getCount()]) 
    .then(response => {
        res.json({
            collaborators: response[0],
            maxPage: Math.ceil(response[1] / quantity)
        });
    })
    .catch(utils.serverError(res))
})

router.get('/filters', function(req, res){
    Promise.all([Collaborator.getTypes(), Collaborator.getCities()])
    .then(response => {
        res.json({
            types: response[0],
            cities: response[1]
        })
    })
    .catch(utils.serverError(res))
})

router.get('/:id', function(req, res){
    Collaborator.get(req.params.id)
    .then(user => {
        if (user) res.json(user);
        else res.status(404).json(utils.error404)
    })
    .catch(utils.serverError(res))
})

router.get('/gallery/:id', function(req, res){
    Promise.all([Excursion.getGallery(req.params.id, req.query.page || 1, 12), Excursion.getGalleryCount(req.params.id)])
    .then(response => {
        res.json({
            urls: response[0],
            count: response[1]
        })
    })
    .catch(utils.serverError(res))
})

module.exports = router;