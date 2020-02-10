const assert = require('assert');
const request = require('supertest');
const app = require('../index');

after(() => app.close());

// Ensure that koa is handling not found routes correctly
describe('Integration tests', () => {
  it('should return 404 for unmatched route', (done) => {
    request(app)
      .get('/')
      .expect(404, done);
  });

  /**
   * Finish implementing this test to make sure that the server is returning the expected response
   */
  it('`GET /route-weather` should return json in expected format', (done) => {
    request(app)
      .get('/route-weather')
      .query({
        start: '41 Elizabeth St New York, NY 10013',
        end: '27 Main St Brewster, NY 10509',
        mode: 'bicycle',
      })
      .expect('Content-Type', /json/)
      .end((err, res) => {
        assert.deepEqual(res.body, { test: 'me!' });
        done();
      });
  });
});
