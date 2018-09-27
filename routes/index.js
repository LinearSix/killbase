'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all assassins
router.get('/', (req, res, next) => {
  knex('assassins')
    .orderBy('kills', 'desc')
    .then((assassins) => {
      res.render('assassins_all', { assassins })
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;