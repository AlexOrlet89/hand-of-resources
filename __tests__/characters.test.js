const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const setup = require('../data/setup');

describe('characters routes testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should return a list of characters', async () => {
    const results = await request(app).get('/characters');
    expect(results.status).toEqual(200);
    expect(results.body.length).toEqual(7);
  });

  it.skip('should return a single character based on the id params', async () => {
    const results = await request(app).get('/characters/1');
    expect(results.body.first_name).toEqual('Moira');
  });

  it('PUT /characters/:id should update character with id', async () => {
    const results = await request(app).put('/characters/1').send({
      first_name: 'Moira',
    });
    console.log(results.body);
    expect(results.status).toEqual(200);
    expect(results.body.first_name).toEqual('Moira');
  });

  afterAll(() => {
    pool.end();
  });
});
