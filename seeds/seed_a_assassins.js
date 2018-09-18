exports.seed = (knex) => {
    return knex('assassins').del()
      .then(() => {
          return knex('assassins').insert([
            {assassin_name: 'Beebs', weapon: 'Hartzell', age: 'beebers514@aol.com', price: 'GraceIsMyFave', rating: 22},
            {assassin_name: 'Beebs', weapon: 'Hartzell', age: 'beebers514@aol.com', price: 'GraceIsMyFave', rating: 22}
      ]);
    });
}