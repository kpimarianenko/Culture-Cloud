const express = require('express');
const router = express.Router();
const utils = require('../../../utils');
const Collaborator = require('../../../models/users').Collaborator;

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

router.get('/:id', function(req, res){
    Collaborator.get(req.params.id)
    .then(user => {
        res.json(user);
    })
    .catch(utils.serverError(res))
})

module.exports = router;