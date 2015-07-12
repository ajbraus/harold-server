//
// test/test.js
//

var request = require('request')
  , expect = require('chai').expect
  , baseUrl = 'http://localhost:1337/api'

// DESCRIBE WHAT WE ARE TESTING
  // SAY WHAT BEHAVIOR 'IT' AUGHT TO HAVE
    // SEND THE REQUEST
      // USE CHAI-EXPECT TO EXPECT THE STATUS RESULT
      // CHECK FALSE VALUE TO SEE IF WE CAN MAKE TEST FAIL
      // CALL DONE();

describe('Articles - ', function() {
  it('/articles should be ok and have a HTTP of 200 - success', function(done) {
    request(baseUrl + '/articles', function(err, res, body) {
      expect(err).to.be.null
      expect(res.statusCode).to.equal(200)
      // expect(res.statusCode).to.equal(300)
      expect(body).to.be.ok
      done();
    })
  })
});

describe('Campaigns - ', function() {
  it('/campaigns should be ok and have a HTTP of 200 - success', function(done) {
    request(baseUrl + '/campaigns', function(err, res, body) {
      expect(err).to.be.null
      expect(res.statusCode).to.equal(200)
      // expect(res.statusCode).to.equal(300)
      expect(body).to.be.ok
      done();
    })
  })
});