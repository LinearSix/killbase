exports.seed = (knex) => {
    return knex('assassins').del()
      .then(() => {
          return knex('assassins').insert([
            {
              "assassin_photo": "",
              "assassin_name": "none",
              "assassin_contact": "",
              "weapon": "",
              "age": 0,
              "price": 0,
              "rating": 0,
              "kills": 0
            },
            {
              "assassin_photo": "http://image.cdnllnwnl.xosnetwork.com/fls/31000/old_site/images/gilford-duggan-1939.jpg",
              "assassin_name": "Alexander Duggan",
              "assassin_contact": "jackal@gmail.com",
              "weapon": "Sniper rifle",
              "age": 31,
              "price": 45,
              "rating": 7.5,
              "kills": 28
            },
            {
              "assassin_photo": "https://cdnb.artstation.com/p/assets/images/images/005/555/145/large/ryuichi-matsumoto-anton92.jpg?1491930247",
              "assassin_name": "Anton Chigurh",
              "assassin_contact": "pneujackcity@gmail.com",
              "weapon": "Pneumatic bolt gun",
              "age": 52,
              "price": 40,
              "rating": 9,
              "kills": 72
            },
            {
              "assassin_photo": "http://akirakurosawa.info/wp-content/uploads/2016/01/ghost-dog.jpg",
              "assassin_name": "",
              "assassin_contact": "ghostdog@gmail.com",
              "weapon": "Pistol",
              "age": 28,
              "price": 20,
              "rating": 6.5,
              "kills": 35
            },
            {
              "assassin_photo": "https://images.askmen.com/1080x540/2016/04/19-042243-short_teasers_released_for_jason_bourne_starring_matt_damon.jpg",
              "assassin_name": "Jason Bourne",
              "assassin_contact": "jb@gmail.com",
              "weapon": "Parkour",
              "age": 27,
              "price": 25,
              "rating": 7,
              "kills": 48
            },
            {
              "assassin_photo": "https://cdn.vox-cdn.com/thumbor/5rlVKTv_V9gr41ZBD7BOFs8nRbc=/0x0:1200x790/1200x800/filters:focal(504x252:696x444)/cdn.vox-cdn.com/uploads/chorus_image/image/52409943/jowhn-wick-2-poster.0.0.jpeg",
              "assassin_name": "John Wick",
              "assassin_contact": "babayaga@gmail.com",
              "weapon": "Lots of guns",
              "age": 35,
              "price": 50,
              "rating": 9.5,
              "kills": 433
            },
            {
              "assassin_photo": "http://static1.squarespace.com/static/57592d5f37013b849f1aad98/5759376f7da24f0b40eb5f88/57ac6553197aea9808a27dd6/1472839938328/Jules+Winnfield.jpg?format=1000w",
              "assassin_name": "Jules Winnfield",
              "assassin_contact": "bmf@gmail.com",
              "weapon": "Pistol",
              "age": 26,
              "price": 15,
              "rating": 6.5,
              "kills": 13
            },
            {
              "assassin_photo": "https://cdnb.artstation.com/p/assets/images/images/004/061/165/large/vojtech-papp-hhh.jpg?1479930316",
              "assassin_name": "Leon",
              "assassin_contact": "leon@gmail.com",
              "weapon": "Everything",
              "age": 41,
              "price": 30,
              "rating": 8.5,
              "kills": 87
            },
            {
              "assassin_photo": "http://1.bp.blogspot.com/-ZJZrIgzyzvQ/VNqiZ1ET8fI/AAAAAAAAC18/TkLCKmlFGdE/s1600/Nikita%2B-%2BNikita.jpg",
              "assassin_name": "Nikita Mears",
              "assassin_contact": "nikita@gmail.com",
              "weapon": "Silenced pistols",
              "age": 28,
              "price": 30,
              "rating": 7,
              "kills": 32
            },
            {
              "assassin_photo": "https://image-cdn.neatoshop.com/styleimg/62796/none/kiwigreen/default/361729-19;1534369085i.jpg",
              "assassin_name": "Pickle Rick",
              "assassin_contact": "rsanchez@gmail.com",
              "weapon": "Lasers and office supplies",
              "age": 60,
              "price": 0,
              "rating": 8,
              "kills": 24
            }
          ]);
    });
}