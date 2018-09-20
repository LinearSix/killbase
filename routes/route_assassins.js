'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// render all assassins
router.get('/assassins_all', (req, res, next) => {
  knex('assassins')
    .orderBy('kills', 'desc')
    .then((assassins) => {
      // res.send(assassins);
      res.render('assassins_all', {assassins});
    })
    .catch((err) => {
      next(err);
    });
});

// render selected assassin profile
router.get('/assassins_all/:id', (req, res, next) => {
  console.log(req.params.id)
  knex('assassins')
    .where('assassin_id', req.params.id)
    // .first()
    .then((assassins) => {
      if (!assassins) {
        return next();
      }
      res.render('assassin_profile', {assassins});
    })
    .catch((err) => {
      next(err);
    });
});

// render update page for selected assassin
router.get('/assassins_all/edit/:id', (req, res, next) => {
  console.log(req.params.id)
  knex('assassins')
    .where('assassin_id', req.params.id)
    // .first()
    .then((assassins) => {
      if (!assassins) {
        return next();
      }
      res.render('assassin_edit', {assassins});
    })
    .catch((err) => {
      next(err);
    });
});

// update assassin record and render confirmation page
router.post('/assassins_all/update', (req, res, next) => {
  // console.log(req.body);
  knex('assassins')
    .where('assassin_id', Number(req.body.assassin_id))
    .first()
    .then((assassins) => {
      if (!assassins) {
        return next;
      };
      return knex('assassins')
        .update({ 
          assassin_name: req.body.assassin_name, 
          assassin_contact: req.body.assassin_contact, 
          weapon: req.body.weapon, 
          age: req.body.age, 
          price: req.body.price, 
          rating: req.body.rating, 
          kills: req.body.kills, 
        }, '*')
        .where('assassin_id', Number(req.body.assassin_id));
    })
    .then((assassins) => {
      res.render('assassin_edit', {assassins});
    })
    .catch((err) => {
      next(err);
    });
});

// delete an assassin
router.get('/assassins_all/delete/:id', (req, res, next) => {
  let assassin_row;

  knex('assassins')
    .where('assassin_id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }
      assassin_row = row;
      return knex('assassins')
        .del()
        .where('assassin_id', req.params.id);
    })
    .then(() => {
      delete assassin_row.assassin_id;
      console.log('assassin_row is ' + assassin_row)
      res.render('assassin_delete', {assassin_row});
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;