exports.seed = (knex) => {
    return knex('targets').del()
      .then(() => {
          return knex('targets').insert([
            {
              "target_name": "Butch Coolidge",
              "location": "Los Angeles",
              "photo": "https://goo.gl/LCquZj",
              "security": 3
            },
            {
              "target_name": "The Jaguar",
              "location": "Russian Embassy",
              "photo": "https://goo.gl/6JWsiv",
              "security": 9
            },
            {
              "target_name": "Norman Stansfield",
              "location": "Manhattan",
              "photo": "https://i.imgur.com/mdIk33E.jpg",
              "security": 7
            },
            {
              "target_name": "Santino D'Antonio",
              "location": "Continental Hotel",
              "photo": "https://goo.gl/fUPkYy",
              "security": 10
            },
            {
              "target_name": "Sonny Valerio",
              "location": "Queens",
              "photo": "https://goo.gl/8DHYUS",
              "security": 4
            }
          ]);
    });
}