'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// render all contracts
router.get('/contracts_all', (req, res, next) => {
  knex.from('contracts')
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
    .innerJoin('targets', 'contract_target_id', 'target_id')
    .innerJoin('clients', 'contract_client_id', 'client_id')
    .then((contracts) => {
      if (!contracts) {
        return next();
      }
      res.render('contract_detail', {contracts});
    })
    .catch((err) => {
      next(err);
    });
}); 

// get client names for select options
router.get('/contract_add', (req, res, next) => {
  let new_client = '';
  knex('clients')
    .orderBy('client_name')
    .then((clients) => {
      // res.send(assassins);
      res.render('contract_add', {clients, new_client})
    })
    .catch((err) => {
      next(err);
    });
});

// get client names for select options with new client id
router.get('/contract_add/:id', (req, res, next) => {
  let new_client = req.params.id;
  knex('clients')
    .orderBy('client_id', 'desc')
    .then((clients) => {
      // res.send(assassins);
      res.render('contract_add', { clients, new_client })
    })
    .catch((err) => {
      next(err);
    });
});


// router.get('/contract_add/:id', (req, res, next) => {
//   knex("clients")
//     .where('client_id', req.params.id)
//     .then((ret) => {
//       new_client = ret
//       return knex('clients')
//       .whereNot('client_id', req.params.id)
//   }).then((clients) => {
//     res.redirect('contract_add',{
//       new_client: new_client,
//       clients: clients
//     })
//   })
// })

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

let contract_insert_id;
router.post('/contract_submit', (req, res, next) => {
  knex.transaction(function(t) {
    return knex('targets')
    .transacting(t)
    .returning('target_id')
    .insert({
        target_name: req.body.target_name, 
        location: req.body.location, 
        target_photo: req.body.photo, 
        security: req.body.security 
    })
    .then(function(resp) {
        return knex('contracts')
        .transacting(t)
        .returning('contract_id')
        .insert({
            contract_client_id: req.body.contract_client_id, 
            contract_target_id: Number(resp), 
            budget: req.body.budget, 
            completed: false, 
            completed_by: null 
        })
    })
    .then((contract_id) => {
      contract_insert_id = Number(contract_id)
    })
    .then(t.commit)
    .then(() => {
      console.log('id is ' + contract_insert_id)
      // contract_insert_id = 
      res.redirect('contracts_all/' + contract_insert_id);
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
let contract_update_id;
router.post('/contracts_all/update', (req, res, next) => {
  contract_update_id = req.body.contract_id;
  knex.transaction(function(t) {
    return knex('targets')
    .transacting(t)
    .where('target_id', Number(req.body.contract_target_id))
    // .first()
    // .returning('target_id')
    .update({
        target_name: req.body.target_name, 
        location: req.body.location, 
        // photo: req.body.photo, 
        security: req.body.security 
    })
    .then((resp) => {
        // console.log('contract_id: ' + req.body.contract_id);
        // console.log('contract_update_id: ' + contract_update_id);
        return knex('contracts')
        .transacting(t)
        // .returning('contract_id')
        .where('contract_id', req.body.contract_id)
        .update({
            contract_client_id: req.body.contract_client_id, 
            contract_target_id: req.body.contract_target_id,
            budget: req.body.budget, 
            completed: false, //req.body.completed, 
            completed_by: req.body.completed_by
        })
    })
    .then((x) => {
      console.log('contract_id: ' + req.body.contract_id);
      console.log('contract_update_id: ' + contract_update_id);
    })
    .then(t.commit)
    .then(() => {
      res.redirect('contracts_all/' + contract_update_id);
    })
    .catch((err) => {
      t.rollback();
      throw err;
    })
    .then(() => {
    console.log('it worked');
    })
    .catch((err) => {
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
      res.redirect('/contracts_all', {contracts});
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;