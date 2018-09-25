'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// render all contracts
router.get('/contracts_all', (req, res, next) => {
  knex.from('contracts')
    .innerJoin('clients', 'contract_client_id', 'client_id')
    .innerJoin('assassins', 'completed_by', 'assassin_id')
    .orderBy('contract_id', 'asc')
    .then((contracts) => {
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
    .where('contract_id', Number(req.params.id))
    .innerJoin('clients', 'contract_client_id', 'client_id')
    .innerJoin('assassins', 'completed_by', 'assassin_id')
    // .innerJoin('code_names', 'assassin_id', 'code_assassin')
    .then((contracts) => {
      console.log(contracts)
      return knex('assassins')
      .innerJoin('ass_cont', 'ass_cont_assassin', 'assassin_id')
      .innerJoin('contracts', 'ass_cont_contract', 'contract_id')
      .innerJoin('code_names', 'assassin_id', 'code_assassin')
      .where('ass_cont_contract', req.params.id)
      .then((assassins) => {
        // console.log(contracts)
        // console.log(assassins)
        if (assassins === {}) {
          assassins = {'assassin_id': 1, 'assassin_name': 'none'}
        }
          res.render('contract_detail', { contracts, assassins });
      })
    })
    .catch((err) => {
      next(err);
    });
}); 

// render all contracts filtered by budget
router.get('/contracts_budget', (req, res, next) => {
  let budget = 10000;
  if (req.query.budget) {
    budget = req.query.budget;
  }
  knex('contracts')
    .where('budget', '>=', budget)
    .innerJoin('clients', 'contract_client_id', 'client_id')
    .innerJoin('assassins', 'completed_by', 'assassin_id')
    .orderBy('budget', 'asc')
    .then((contracts) => {
      // res.send(contracts);
      res.render('contracts_all', {contracts});
    })
    .catch((err) => {
      next(err);
    });
});

// render all contracts filtered by security
router.get('/contracts_security', (req, res, next) => {
  let security = 10000;
  if (req.query.security) {
    security = req.query.security;
  }
  knex('contracts')
    .where('security', '>=', security)
    .innerJoin('clients', 'contract_client_id', 'client_id')
    .innerJoin('assassins', 'completed_by', 'assassin_id')
    .orderBy('security', 'asc')
    .then((contracts) => {
      // res.send(contracts);
      res.render('contracts_all', {contracts});
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

// render update page for selected contract with assassins list
router.get('/contracts_all/edit/:id', (req, res, next) => {
  console.log(req.params.id)
  knex.from('contracts')
    .innerJoin('clients', 'contract_client_id', 'client_id')
    .where('contract_id', req.params.id)
    // .first()
    .then((contracts) => {
      if (!contracts) {
        return next();
      };
      return knex.from('assassins')
      .innerJoin('code_names', 'assassin_id', 'code_assassin')
      .then((assassins) => {
        // res.send(contracts);
        res.render('contract_edit', { contracts, assassins });
      })
    })
    .catch((err) => {
      next(err);
    });
});

// console.log(req.params.id)
//   knex('contracts')
//     .where('contract_id', Number(req.params.id))
//     .innerJoin('clients', 'contract_client_id', 'client_id')
//     .innerJoin('assassins', 'completed_by', 'assassin_id')
//     // .innerJoin('code_names', 'assassin_id', 'code_assassin')
//     .then((contracts) => {
//       console.log(contracts)
//       return knex('assassins')
//       .innerJoin('ass_cont', 'ass_cont_assassin', 'assassin_id')
//       .innerJoin('contracts', 'ass_cont_contract', 'contract_id')
//       .innerJoin('code_names', 'assassin_id', 'code_assassin')
//       .where('ass_cont_contract', req.params.id)
//       .then((assassins) => {
//         // console.log(contracts)
//         // console.log(assassins)
//         if (assassins === {}) {
//           assassins = {'assassin_id': 1, 'assassin_name': 'none'}
//         }
//           res.render('contract_detail', { contracts, assassins });
//       })
//     })
//     .catch((err) => {
//       next(err);
//     });
// }); 

// add a new contract
let contract_insert_id;
router.post('/contract_submit', (req, res, next) => {
  knex.transaction(function(t) {
      return knex('contracts')
      .transacting(t)
      .returning('contract_id')
      .insert({
          target_name: req.body.target_name, 
          location: req.body.location, 
          target_photo: req.body.target_photo, 
          security: req.body.security, 
          contract_client_id: req.body.contract_client_id, 
          budget: req.body.budget 
          // completed: false, 
          // completed_by: null
      })
      .then((resp) => {
          contract_insert_id = Number(resp);
      })
      .then(t.commit)
      .then(() => {
          // console.log(assassin_id);
          res.redirect('contracts_all/' + contract_insert_id);
      })
      .catch((err) => {
          t.rollback();
          throw err;
      })
      .then(() => {
      console.log('it worked');
      })
      .catch((err) => {
      console.log('it failed', err);
      })
  })
});

// update contract record and render confirmation page
let contract_update_id;
router.post('/contracts_all/update', (req, res, next) => {
  contract_update_id = Number(req.body.contract_id);
  knex('contracts')
    .where('contract_id', Number(req.body.contract_id))
    .first()
    .then((contracts) => {
      if (!contracts) {
        return next;
      };
      return knex('contracts')
        .update({ 
          target_name: req.body.target_name, 
          location: req.body.location, 
          target_photo: req.body.target_photo, 
          security: req.body.security, 
          contract_client_id: req.body.contract_client_id, 
          budget: req.body.budget, 
          completed: req.body.completed, 
          completed_by: req.body.completed_by
        }, '*')
        .where('contract_id', Number(req.body.contract_id));
    })
    .then((assassins) => {
      res.redirect('/contracts_all/' + contract_update_id);
    })
    .catch((err) => {
      next(err);
    });
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