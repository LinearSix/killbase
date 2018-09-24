exports.seed = (knex) => {
    return knex('code_names').del()
      .then(() => {
          return knex('code_names').insert([
            {
              "code_assassin": 2,
              "code_name": "The Jackal"
            },
            {
              "code_assassin": 3,
              "code_name": "Old Man"
            },
            {
              "code_assassin": 4,
              "code_name": "Ghost Dog"
            },
            {
              "code_assassin": 5,
              "code_name": ""
            },
            {
              "code_assassin": 6,
              "code_name": "Baba Yaga"
            },
            {
              "code_assassin": 7,
              "code_name": ""
            },
            {
              "code_assassin": 8,
              "code_name": "The Professional"
            },
            {
              "code_assassin": 9,
              "code_name": "Nikita"
            },
            {
              "code_assassin": 9,
              "code_name": "La Femme Nikita"
            },
            {
              "code_assassin": 10,
              "code_name": "Solenya"
            }
          ]);
    });
}