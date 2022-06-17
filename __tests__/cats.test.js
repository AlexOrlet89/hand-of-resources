const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Cat = require('../lib/models/Cat');

describe('cats routes testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should return a list of cats', async () => {
    const results = await request(app).get('/cats');
    expect(results.status).toEqual(200);
    expect(results.body.length).toEqual(8);
  });

  it.skip('should return a single cat based on the id params', async () => {
    const results = await request(app).get('/cats/1');
    expect(results.body.name).toEqual('Felix');
  });

  it.skip('should insert a new cat into our table', async () => {
    const cat = new Cat({
      name: 'Pumpkin',
      type: 'House Cat',
      url: 'https://static.wikia.nocookie.net/charactercommunity/images/7/73/SylvesterDance.png',
      year: 2017,
      lives: 1,
      is_sidekick: true,
    });
    const results = await request(app).post('/cats/:id').send(cat);
    expect(results.status).toEqual(200);
    expect(results.body.name).toEqual('Pumpkin');
    expect(results.body.year).toEqual(2017);
  });

  it('PUT /cats/:id should update cat with id', async () => {
    const results = await request(app).put('/cats/1').send({
      name: 'Felix da Housecat',
    });
    console.log(results.body);
    expect(results.status).toEqual(200);
    expect(results.body.name).toEqual('Felix da Housecat');
    expect(results.body.type).toEqual('Tuxedo');
  });

  it.skip('DELETE /cats/:id should delete the cat with the matching ID', async () => {
    const results = await request(app).delete('/cats/1');
    expect(results.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
