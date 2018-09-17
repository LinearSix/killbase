const env = process.env.NODE_ENV || 'development';
const config = ('../knexfile.js')[env];
const knex = ('knex')(config);

module.exports = knex;