const express = require('express');
const app = express();
const PORT = process.env.PORT || 1666;
const bodyParser = require('body-parser');
const knex = require('knex');
const morgan = require('morgan');

app.set('view engine', 'ejs');

app.use(bodyParser.json());

app.listen(PORT, function() {
    console.log('listening on port ' + PORT);
});


