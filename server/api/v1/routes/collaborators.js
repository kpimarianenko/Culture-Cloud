const express = require('express');
const router = express.Router();
const utils = require('../../../utils');
const Collaborator = require('../../../models/users').Collaborator;

router.get('/', function(req, res){
    Collaborator.getPage(req.query.page || 1, 5)
    .then(users => {
        res.json(users);
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