const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');

describe('authors routes testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of authors', async () => {
    const results = await request(app).get('/authors');
    expect(results.status).toEqual(200);
    expect(results.body.length).toEqual(4);
  });

  it('should return a single author based on the id params', async () => {
    const results = await request(app).get('/authors/1');
    expect(results.body.name).toEqual('The Monster at the end of this author');
  });

  afterAll(() => {
    pool.end();
  });
});
