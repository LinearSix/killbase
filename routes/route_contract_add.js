'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// get assassins and code names for select options
router.get('/contract_add', (req, res, next) => {
  knex('clients')
    .orderBy('client_name')
    .then((clients) => {
      // res.send(assassins);
      res.render('contract_add', {clients})
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;