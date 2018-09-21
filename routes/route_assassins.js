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

// render form for adding a new assasin
router.get('/assassin_add', (req, res, next) => {
  res.render('assassin_add')
});

// add a new assassin
let assassin_insert_id;
router.post('/assassin_submit', (req, res, next) => {
  knex.transaction(function(t) {
      return knex('assassins')
      .transacting(t)
      .returning('assassin_id')
      .insert({
          assassin_photo: req.body.assassin_photo, 
          assassin_name: req.body.assassin_name, 
          assassin_contact: req.body.assassin_contact, 
          weapon: req.body.weapon, 
          age: req.body.age, 
          price: req.body.price, 
          rating: req.body.rating, 
          kills: req.body.kills
      })
      .then(function(resp) {
          assassin_insert_id = Number(resp);
          // console.log('res' + resp);
          return knex('code_names')
          .transacting(t)
          // .returning(resp)
          .insert({
              code_assassin: Number(resp), 
              code_name: req.body.code_name, 
          })
      })
      .then(t.commit)
      .then((res_id) => {
          // console.log(assassin_id);
          res.redirect('assassins_all/' + assassin_insert_id);
      })
      .catch(function(err) {
          t.rollback();
          throw err;
      })
      .then(function() {
      console.log('it worked');
      })
      .catch(function(err) {
      console.log('it failed', err);
      })
  })
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
let assassin_update_id;
router.post('/assassins_all/update', (req, res, next) => {
  assassin_update_id = Number(req.body.assassin_id);
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
      res.redirect('/assassins_all/' + assassin_update_id);
    })
    .catch((err) => {
      next(err);
    });
});

let assassin_delete_name;
// delete an assassin and redirect to confirmation page
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
      assassin_delete_name = row.assassin_name;
      console.log('assassin_row' + assassin_row) // assassin_delete_name = assassins.assassin_name;
      return knex('assassins')
        .del()
        .where('assassin_id', req.params.id);
    })
    .then(() => {
      delete assassin_row.assassin_id;
      res.redirect('/assassins_all/assassin_deleted/' + assassin_delete_name);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;