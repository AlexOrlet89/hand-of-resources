const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const setup = require('../data/setup');

describe('characters routes testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of characters', async () => {
    const results = await request(app).get('/characters');
    expect(results.status).toEqual(200);
    expect(results.body.length).toEqual(7);
  });

  it('should return a single character based on the id params', async () => {
    const results = await request(app).get('/characters/1');
    expect(results.body.first_name).toEqual('Moira');
  });

  afterAll(() => {
    pool.end();
  });
});
