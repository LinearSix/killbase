exports.seed = (knex) => {
    return knex('clients').del()
      .then(() => {
          return knex('clients').insert([
            {
              "client_name": "Marcellus Wallace"
            },
            {
              "client_name": "Concerto"
            },
            {
              "client_name": "Mathilda"
            },
            {
              "client_name": "Winston"
            },
            {
              "client_name": "Ray Vargo"
            }
          ]);
    });
}