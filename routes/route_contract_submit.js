'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.post('/contract_submit', (req, res, next) => {
    let target_id = null;
    knex.transaction(function(t) {
        return knex('targets')
        .transacting(t)
        .returning('target_id')
        .insert({
            target_name: req.body.target_name, 
            location: req.body.location, 
            photo: req.body.photo, 
            security: req.body.security 
        }).then(function(resp) {
            console.log('res' + resp);
            return knex('contracts')
            .transacting(t)
            .insert({
                contract_client_id: req.body.contract_client_id, 
                contract_target_id: Number(resp), 
                budget: req.body.budget, 
                completed: false, 
                completed_by: null 
            })
        })
        .then(t.commit)
        .then((targets) => {
            res.send(targets);
        })
        .catch(function(err) {
            t.rollback();
            throw err;
        })
        .then(function() {
        console.log('it worked');
        })
        .catch(function(err) {
        console.log('it failed');
        })
    })
});

module.exports = router;