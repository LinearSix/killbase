exports.seed = (knex) => {
    return knex('assassins').del()
      .then(() => {
          return knex('assassins').insert([
            {
              "assassin_name": "Alexander Duggan",
              "assassin_contact": "",
              "weapon": "Sniper rifle",
              "age": 31,
              "price": 45,
              "rating": 7.5,
              "kills": 28
            },
            {
              "assassin_name": "Anton Chigurh",
              "assassin_contact": "",
              "weapon": "Pneumatic bolt gun",
              "age": 52,
              "price": 40,
              "rating": 9,
              "kills": 72
            },
            {
              "assassin_name": "",
              "assassin_contact": "",
              "weapon": "Pistol",
              "age": 28,
              "price": 20,
              "rating": 6.5,
              "kills": 35
            },
            {
              "assassin_name": "Jason Bourne",
              "assassin_contact": "",
              "weapon": "Parkour",
              "age": 27,
              "price": 25,
              "rating": 7,
              "kills": 48
            },
            {
              "assassin_name": "John Wick",
              "assassin_contact": "",
              "weapon": "Lots of guns",
              "age": 35,
              "price": 50,
              "rating": 9.5,
              "kills": 433
            },
            {
              "assassin_name": "Jules Winnfield",
              "assassin_contact": "",
              "weapon": "Pistol",
              "age": 26,
              "price": 15,
              "rating": 6.5,
              "kills": 13
            },
            {
              "assassin_name": "Leon",
              "assassin_contact": "",
              "weapon": "Everything",
              "age": 41,
              "price": 30,
              "rating": 8.5,
              "kills": 87
            },
            {
              "assassin_name": "Nikita Mears",
              "assassin_contact": "",
              "weapon": "Silenced pistols",
              "age": 28,
              "price": 30,
              "rating": 7,
              "kills": 32
            },
            {
              "assassin_name": "Pickle Rick",
              "assassin_contact": "",
              "weapon": "Lasers and office supplies",
              "age": 60,
              "price": 0,
              "rating": 8,
              "kills": 24
            }
          ]);
    });
}