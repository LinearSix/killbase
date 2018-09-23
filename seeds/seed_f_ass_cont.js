exports.seed = (knex) => {
    return knex('ass_cont').del()
      .then(() => {
          return knex('ass_cont ').insert([
            {
              "ass_cont_assassin": 6,
              "ass_cont_contract": 1
            },
            {
              "ass_cont_assassin": 1,
              "ass_cont_contract": 2
            },
            {
              "ass_cont_assassin": 4,
              "ass_cont_contract": 2
            },
            {
              "ass_cont_assassin": 4,
              "ass_cont_contract": 3
            },
            {
              "ass_cont_assassin": 9,
              "ass_cont_contract": 5
            },
            {
              "ass_cont_assassin": 6,
              "ass_cont_contract": 4
            },
            {
              "ass_cont_assassin": 8,
              "ass_cont_contract": 3
            },
            {
              "ass_cont_assassin": 3,
              "ass_cont_contract": 1
            }
          ]);
    });
}