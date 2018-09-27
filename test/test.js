// require the app we exported from app.js
const request = require('supertest');
const app = require('../index');
const chai = require('chai');  
const assert = chai.assert;    // Using Assert style
const expect = chai.expect;    // Using Expect style
const should = chai.should();

describe('assassin page description', function() {
  it('shows the assassin page function text', function(done) {
    request(app).get('/')
      .expect(200)
      .expect(/ - Meet the Assassins/, done)
  })
})

// describe('GET assassins_all', function() {
//   it('should return all assassins', function(done) {
//     chai.request(app)
//     .get('/assassins_all')
//     .end(function(err, res) {
//     // res.should.have.status(200);
//     res.body[0].assassin_name.should.equal('John Wick');
//     done();
//     });
//   });
// });