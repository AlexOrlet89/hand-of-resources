const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');

describe('books routes testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of books', async () => {
    const results = await request(app).get('/books');
    expect(results.status).toEqual(200);
    expect(results.body.length).toEqual(4);
  });

  it('should return a single book based on the id params', async () => {
    const results = await request(app).get('/books/1');
    expect(results.body.title).toEqual('The Monster at the end of this book');
  });

  afterAll(() => {
    pool.end();
  });
});
