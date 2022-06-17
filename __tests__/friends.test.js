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

  it('should return a single friend based on the id params', async () => {
    const results = await request(app).get('/friends/1');
    // expect(results.body.name).toEqual('Ross');
    expect(results.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
