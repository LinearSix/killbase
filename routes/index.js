'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// list all assassins
router.get('/', (req, res, next) => {
  knex('assassins')
    .orderBy('kills', 'desc')
    .then((assassins) => {
      res.render('index', {assassins})
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;