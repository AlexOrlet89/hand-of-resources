const setup = require('../data/setup');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('friends testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should return a list of friends', async () => {
    const results = await request(app).get('/friends');
    expect(results.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
