// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/killbase'
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      port:     5432,
      user:     'linearsix@gmail.com',
      password: '1HerokuIsEnough!'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'postgres://bhllimujmwwfug:48add9a09a226b25428486cc93eab6395232bfc4d343e66e1d9bda884f4730a3@ec2-54-243-147-162.compute-1.amazonaws.com:5432/de4kg3q8vdvcbb5',
      port:     5432,
      user:     'linearsix@gmail.com',
      password: '1HerokuIsEnough!'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
