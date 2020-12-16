const express = require('express');
const router = express.Router();
const utils = require('../../../utils');
const Exhibit = require('../../../models/exhibit');

router.get('/', function (req, res) {
    Exhibit.get()
        .then(response => {
            res.json({
                exhibits: response.map(el => {
                    return {
                        name: el.name,
                        url: el.url,
                        isPicture: el.isPicture,
                        text: el.text,
                    }
                }),
            })

        })
        .catch(utils.serverError(res));
});

router.post('/new', function (req, res) {
    const name = req.body.name;
    const url = req.body.url;
    let isPicture = true;
    if(req.body.isPicture == 0){
        isPicture = false;
    }
    const text = req.body.text;
    const exhibit = new Exhibit(name, url, isPicture, text);
    Exhibit.add(exhibit)
    .then(res.status(200)).catch(res.status(200))
})

module.exports = router;