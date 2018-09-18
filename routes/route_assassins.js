'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex')('development');

// list all shops
router.get('/assassins', (req, res, next) => {
  knex('assassins')
    .orderBy('kills')
    .then((assassins) => {
      res.send(assassins);
      // res.render('index', {test: 'test'})
    })
    .catch((err) => {
      next(err);
    });
});

// list selected shop
// router.get('/shops/:id', (req, res, next) => {
//   knex('shop')
//     .where('shop_id', req.params.id)
//     .first()
//     .then((shop) => {
//       if (!shop) {
//         return next();
//       }

//       res.send(shop);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// // add a new shop
// router.post('/shops', (req, res, next) => {
//   knex('shop')
//     .insert({ name: req.body.name, city: req.body.city })
//     .then((shops) => {
//       res.send(shops[0]);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// // update a shop
// router.patch('/shops/:shop_id', (req, res, next) => {
//   knex('shop')
//     .where('shop_id', req.params.shop_id)
//     .first()
//     .then((shops) => {
//       if (!shops) {
//         return next;
//       };
//       return knex('shop')
//         .update({ name: req.body.name, city: req.body.city }, '*')
//         .where('shop_id', req.params.shop_id);
//     })
//     .then((shops) => {
//       res.send(shops);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// // delete a shop
// router.delete('/shops/:shop_id', (req, res, next) => {
//   let shop_row;

//   knex('shop')
//     .where('shop_id', req.params.shop_id)
//     .first()
//     .then((row) => {
//       if (!row) {
//         return next();
//       }
//       shop_row = row;
//       return knex('shop')
//         .del()
//         .where('shop_id', req.params.shop_id);
//     })
//     .then(() => {
//       delete shop_row.shop_id;
//       res.send(shop_row);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

module.exports = router;