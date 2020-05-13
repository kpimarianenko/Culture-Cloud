const express = require('express');
const router = express.Router();
const utils = require('../../../utils');
const Collaborator = require('../../../models/users').Collaborator;

router.get('/', function(req, res){
    Collaborator.getAll()
    .then(users => {
        res.json(users);
    })
    .catch(utils.serverError(res))
})

module.exports = router;