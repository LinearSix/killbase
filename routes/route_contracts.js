'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// render all contracts
router.get('/contracts_all', (req, res, next) => {
  knex.from('contracts')
    .innerJoin('targets', 'contract_target_id', 'target_id')
    .innerJoin('clients', 'contract_client_id', 'client_id')
    .orderBy('contract_id', 'asc')
    .then((contracts) => {
      // res.send(contracts);
      res.render('contracts_all', {contracts});
    })
    .catch((err) => {
      next(err);
    });
});

// render selected contract
router.get('/contracts_all/:id', (req, res, next) => {
  console.log(req.params.id)
  knex('contracts')
    .where('contract_id', req.params.id)
    // .first()
    .then((contracts) => {
      if (!contracts) {
        return next();
      }
      res.render('contract_profile', {contracts});
    })
    .catch((err) => {
      next(err);
    });
}); 

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

// render update page for selected contract
router.get('/contracts_all/edit/:id', (req, res, next) => {
  console.log(req.params.id)
  knex.from('contracts')
    .innerJoin('targets', 'contract_target_id', 'target_id')
    .innerJoin('clients', 'contract_client_id', 'client_id')
    .where('contract_id', req.params.id)
    // .first()
    .then((contracts) => {
      if (!contracts) {
        return next();
      }
      res.render('contract_edit', {contracts});
    })
    .catch((err) => {
      next(err);
    });
});

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

// update contract record and render confirmation page
router.post('/contracts_all/update', (req, res, next) => {
    knex.transaction(function(t) {
        return knex('targets')
        .transacting(t)
        .where('target_id', Number(req.body.target_id))
        .first()
        .returning('target_id')
        .update({
            target_name: req.body.target_name, 
            location: req.body.location, 
            // photo: req.body.photo, 
            security: req.body.security 
        }).then(function(resp) {
            console.log('res' + resp);
            return knex('contracts')
            .transacting(t)
            .where('contract_target_id', Number(req.body.target_id))
            .update({
                contract_client_id: req.body.contract_client_id, 
                // contract_target_id: req.body.target_id,
                budget: req.body.budget, 
                completed: req.body.completed, 
                completed_by: req.body.completed_by
            })
        })
        .then(t.commit)
        .then((targets) => {
            res.render('contracts_all', {targets});
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

// delete a contract
router.get('/contracts_all/delete/:id', (req, res, next) => {
  let contracts;

  knex('contracts')
    .where('contract_id', req.params.id)
    .first()
    .then((row) => {
      if (!row) {
        return next();
      }
      contracts = row;
      return knex('contracts')
        .del()
        .where('contract_id', req.params.id);
    })
    .then(() => {
      delete contracts.contract_id;
      console.log('contracts is ' + contracts)
      res.render('contract_delete', {contracts});
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;