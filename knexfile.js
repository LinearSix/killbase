// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/killbase'
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

  // production: {
  //   client: 'postgresql',
  //   connection: {
  //     database: 'dd340qs8d2v9e6',
  //     // port:     5432,
  //     user:     'njngxvbrucgouw',
  //     password: '29fdbbe8ea512198febc1f38c754a8557982b905a8512067fa2a446cd04915ce'
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: 'knex_migrations'
  //   }
  // }

};
