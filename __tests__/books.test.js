const setup = require('../data/setup');
const app = require('../lib/app');
const { request } = require('../lib/app');
const pool = require('../lib/utils/pool');

describe('books routes testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('should return a list of books', async () => {
    const results = await request(app).get('/books');
    expect(results.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
