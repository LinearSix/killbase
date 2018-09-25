'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// render all assassins by kills (default)
router.get('/assassins_all', (req, res, next) => {
  knex('assassins')
    .whereNot('assassin_id', 1)
    .orderBy('kills', 'desc')
    .then((assassins) => {
      // res.send(assassins);
      res.render('assassins_all', {assassins});
    })
    .catch((err) => {
      next(err);
    });
});

// render all assassins by kills
router.get('/assassins_kills', (req, res, next) => {
  let kills = 10000;
  if (req.query.kills) {
    kills = req.query.kills;
  }
  knex('assassins')
    .whereNot('assassin_id', 1)
    .where('kills', '>=', kills)
    .orderBy('kills', 'asc')
    .then((assassins) => {
      // res.send(assassins);
      res.render('assassins_all', {assassins});
    })
    .catch((err) => {
      next(err);
    });
});

// render all assassins by age
router.get('/assassins_age', (req, res, next) => {
  let age = 10000;
  if (req.query.age) {
    age = req.query.age;
  }
  knex('assassins')
    .whereNot('assassin_id', 1)
    .where('age', '>=', age)
    .orderBy('age', 'asc')
    .then((assassins) => {
      // res.send(assassins);
      res.render('assassins_all', {assassins});
    })
    .catch((err) => {
      next(err);
    });
});

// render all assassins by price
router.get('/assassins_price', (req, res, next) => {
  let price = 10000;
  if (req.query.price) {
    price = req.query.price;
  }
  knex('assassins')
    .whereNot('assassin_id', 1)
    .where('price', '>=', price)
    .orderBy('price', 'asc')
    .then((assassins) => {
      // res.send(assassins);
      res.render('assassins_all', {assassins});
    })
    .catch((err) => {
      next(err);
    });
});

// render all assassins by rating
router.get('/assassins_rating', (req, res, next) => {
  let rating = 10000;
  if (req.query.rating) {
    rating = req.query.rating;
  }
  knex('assassins')
    .whereNot('assassin_id', 1)
    .where('rating', '>=', rating)
    .orderBy('rating', 'asc')
    .then((assassins) => {
      // res.send(assassins);
      res.render('assassins_all', {assassins});
    })
    .catch((err) => {
      next(err);
    });
});

// render assassins by availability
router.get('/assassins_availability', (req, res, next) => {
  let availability;
  if (req.query.availability) {
    availability = req.query.availability;
  }
  if (availability === 'contracted') {
    knex('assassins')
    .distinct('assassin_id','assassin_name', 'assassin_contact', 'weapon', 'age', 'price', 'rating', 'assassin_photo', 'kills')
    .innerJoin('ass_cont', 'ass_cont_assassin', 'assassin_id')
    .whereNot('assassin_id', 1)
    .orderBy('kills', 'desc')
    .then((assassins) => {
      // res.send(assassins);
      res.render('assassins_all', {assassins});
    })
    .catch((err) => {
      next(err);
    });
  } else {
    knex('assassins')
      .whereNotIn('assassin_id', function() {
      this.select('ass_cont_assassin').from('ass_cont');
    })
    .whereNot('assassin_id', 1)
    .orderBy('kills', 'desc')
    .then((assassins) => {
      // res.send(assassins);
      res.render('assassins_all', {assassins});
    })
    .catch((err) => {
      next(err);
    });
  }
});

// render selected assassin profile
router.get('/assassins_all/:id', (req, res, next) => {
  console.log(req.params.id)
  knex('assassins')
    .where('assassin_id', req.params.id)
    // .first()
    .then((assassins) => {
      return knex('code_names')
      .where('code_assassin', req.params.id)
      .then((code_names) => {
        return knex('contracts')
        .innerJoin('ass_cont', 'ass_cont_contract', 'contract_id')
        .where('ass_cont_assassin', req.params.id)
        .then((contracts) => {
          res.render('assassin_profile', { assassins, code_names, contracts })
        })
      })
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
      .then((resp) => {
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
      .then(() => {
          // console.log(assassin_id);
          res.redirect('assassins_all/' + assassin_insert_id);
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

// render edit page for selected assassin
router.get('/assassins_all/edit/:id', (req, res, next) => {
  console.log(req.params.id)
  knex('assassins')
    .where('assassin_id', req.params.id)
    // .first()
    .then((assassins) => {
      return knex('code_names')
      .where('code_assassin', req.params.id)
      .then((code_names) => {
        return knex('contracts')
        .innerJoin('ass_cont', 'ass_cont_contract', 'contract_id')
        .where('ass_cont_assassin', req.params.id)
        .then((contracts) => {
          res.render('assassin_edit', { assassins, code_names, contracts })
        })
      })
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
    .then(() => {
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
      res.redirect('/assassins_all');
    })
    .catch((err) => {
      next(err);
    });

    res.redirect('/assassins_all');

});

// // delete an assassin and redirect to confirmation page
// router.get('/assassins_all/assassin_deleted/:id', (req, res, next) => {

//   let deleted_assassin = req.params.id;
//   res.render('/assassins_all/assassin_deleted', {deleted_assassin});

// });

module.exports = router;