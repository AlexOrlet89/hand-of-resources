const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const setup = require('../data/setup');
const Character = require('../lib/models/Character');

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

  it.skip('PUT /characters/:id should update character with id', async () => {
    const results = await request(app).put('/characters/1').send({
      first_name: 'Moira',
    });
    console.log(results.body);
    expect(results.status).toEqual(200);
    expect(results.body.first_name).toEqual('Moira');
  });

  it('should insert a new character into our table', async () => {
    const character = new Character({
      first_name: 'Alex Orlet',
      last_name: 'Orlet Orlet',
    });
    const results = await request(app).post('/characters/:id').send(character);
    expect(results.status).toEqual(200);
    expect(results.body.first_name).toEqual('Alex Orlet');
  });

  afterAll(() => {
    pool.end();
  });
});
