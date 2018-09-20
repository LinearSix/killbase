const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 1666;
const bodyParser = require('body-parser');
const knex = require('./db/knex');
const morgan = require('morgan');

console.log(knex);

const logger = require('morgan');
// const knex = require('knex');

// Set the default views directory to pages folder
app.set('views', path.join(__dirname, 'views'));

// Set the folder for css & java scripts
app.use(express.static('./css'))
app.use(express.static(path.join(__dirname, 'node_modules')))

// Set the view engine to ejs
app.set('view engine', 'ejs')

app.use(logger('dev'));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const index = require('./routes');
const assassins_show = require('./routes/route_assassins');
// const assassins_id = require('./routes/route_assassins:id');
const contract_add = require('./routes/route_contract_add');
const contract_submit = require('./routes/route_contract_submit');

app.use(index);
app.use(assassins_show);
// app.use(assassins_id);
app.use(contract_add);
app.use(contract_submit);

app.get('/', function(req, res){ res.redirect(index)});

// ################ FROM HEROKU INSTRUCTIONS ##################
app.get('/db', async (req, res) => {
    try {
      const client = await pool.connect()
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
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





