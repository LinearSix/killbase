// const request = require('supertest');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 1666;
const bodyParser = require('body-parser');
const knex = require('./db/knex');
const methodOverride = require('method-override');
const morgan = require('morgan');
const mocha = require('mocha');
const chai = require('chai');
const router = express.Router();

const logger = require('morgan');

// Set the default views directory to pages folder
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('X-HTTP-Method-Override'))

// Set the folder for css & java scripts
app.use(express.static('./css'))
// app.use(express.static('./img'))
app.use(express.static(path.join(__dirname, 'node_modules')))

// Set the view engine to ejs
app.set('view engine', 'ejs')

// app.use(logger('dev'));
if (process.env.NODE_ENV !== 'test') {
    app.use(logger('dev'));
}
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const index = require('./routes');
const assassins_show = require('./routes/route_assassins');
const clients_show = require('./routes/route_clients');
const contracts_show = require('./routes/route_contracts');

app.use('/api/v1', index);
app.use(assassins_show);
app.use(clients_show);
app.use(contracts_show);

app.get('/', function(req, res){ res.redirect('assassins_all')});

// router.get('/', (req, res, next) => {
//     res.render('index', { title: 'Killbase' });
// });

// ################ FROM HEROKU INSTRUCTIONS ##################
// app.get('/db', async (req, res) => {
//     try {
//       const client = await pool.connect()
//       const result = await client.query('SELECT * FROM test_table');
//       const results = { 'results': (result) ? result.rows : null};
//       res.render('pages/db', results );
//       client.release();
//     } catch (err) {
//       console.error(err);
//       res.send("Error " + err);
//     }
//   })
// ############################################################

app.use((_req, res) => {
    res.sendStatus(404);
});
  
app.use((err, _req, res, _next) => {
if (err.status) {
    return res
    .status(err.status)
    .set('Content-Type', 'text/plain')
    .send(err.message);
}

console.error(err.stack);
res.sendStatus(500);
});
  
app.listen(PORT, function() {
console.log("listening on port: ", PORT);
});

<<<<<<< HEAD
module.exports = app, mocha, chai, router;
=======




>>>>>>> parent of 209c28d... added contract listings to assassin profile and edit pages
