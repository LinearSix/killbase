exports.seed = (knex) => {
    return knex('targets').del()
      .then(() => {
          return knex('targets').insert([
            {
              "target_name": "Butch Coolidge",
              "location": "Los Angeles",
              "target_photo": "https://goo.gl/LCquZj",
              "security": 3
            },
            {
              "target_name": "The Jaguar",
              "location": "Russian Embassy",
              "target_photo": "https://goo.gl/6JWsiv",
              "security": 9
            },
            {
              "target_name": "Norman Stansfield",
              "location": "Manhattan",
              "target_photo": "https://i.imgur.com/mdIk33E.jpg",
              "security": 7
            },
            {
              "target_name": "Santino D'Antonio",
              "location": "Continental Hotel",
              "target_photo": "https://goo.gl/fUPkYy",
              "security": 10
            },
            {
              "target_name": "Sonny Valerio",
              "location": "Queens",
              "target_photo": "https://goo.gl/8DHYUS",
              "security": 4
            }
          ]);
    });
}