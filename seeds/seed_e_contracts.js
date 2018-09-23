exports.seed = (knex) => {
    return knex('contracts').del()
      .then(() => {
          return knex('contracts').insert([
            {
              "target_name": "Butch Coolidge",
              "location": "Los Angeles",
              "target_photo": "https://goo.gl/LCquZj",
              "security": 3,
              "contract_client_id": 1,
              "budget": 40,
              "completed": "FALSE",
              "completed_by": null
            },
            {
              "target_name": "The Jaguar",
              "location": "Russian Embassy",
              "target_photo": "https://goo.gl/6JWsiv",
              "security": 9,
              "contract_client_id": 2,
              "budget": 70,
              "completed": "FALSE",
              "completed_by": null
            },
            {
              "target_name": "Norman Stansfield",
              "location": "Manhattan",
              "target_photo": "https://i.imgur.com/mdIk33E.jpg",
              "security": 7,
              "contract_client_id": 3,
              "budget": 35,
              "completed": "FALSE",
              "completed_by": null
            },
            {
              "target_name": "Santino D'Antonio",
              "location": "Continental Hotel",
              "target_photo": "https://goo.gl/fUPkYy",
              "security": 10,
              "contract_client_id": 4,
              "budget": 25,
              "completed": "FALSE",
              "completed_by": null
            },
            {
              "target_name": "Sonny Valerio",
              "location": "Queens",
              "target_photo": "https://goo.gl/8DHYUS",
              "security": 4,
              "contract_client_id": 5,
              "budget": 10,
              "completed": "FALSE",
              "completed_by": null
            }
          ]);
    });
}