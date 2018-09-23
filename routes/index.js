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

// router.get('/assassins/id', (req, res, next) => {
//   knex('assassins')
//     .orderBy('assassin_id')
//     .then((assassins) => {
//       // res.send(assassins);
//       res.render('index', {assassins})
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// router.get('/assassins/name', (req, res, next) => {
//   knex('assassins')
//     .orderBy('assassin_name')
//     .then((assassins) => {
//       // res.send(assassins);
//       res.render('index', {assassins})
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// router.get('/assassins/weapon', (req, res, next) => {
//   knex('assassins')
//     .orderBy('weapon')
//     .then((assassins) => {
//       // res.send(assassins);
//       res.render('index', {assassins})
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// router.get('/assassins/age', (req, res, next) => {
//   knex('assassins')
//     .orderBy('age')
//     .then((assassins) => {
//       // res.send(assassins);
//       res.render('index', {assassins})
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// router.get('/assassins/price', (req, res, next) => {
//   knex('assassins')
//     .orderBy('price')
//     .then((assassins) => {
//       // res.send(assassins);
//       res.render('index', {assassins})
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// router.get('/assassins/rating', (req, res, next) => {
//   knex('assassins')
//     .orderBy('rating')
//     .then((assassins) => {
//       // res.send(assassins);
//       res.render('index', {assassins})
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// router.get('/assassins/kills', (req, res, next) => {
//   knex('assassins')
//     .orderBy('kills')
//     .then((assassins) => {
//       // res.send(assassins);
//       res.render('index', {assassins})
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

module.exports = router;