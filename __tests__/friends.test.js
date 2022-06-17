const setup = require('../data/setup');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Friend = require('../lib/models/Friend');

describe('friends testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should return a list of friends', async () => {
    const results = await request(app).get('/friends');
    expect(results.status).toEqual(200);
  });

  it.skip('should return a single friend based on the id params', async () => {
    const results = await request(app).get('/friends/1');
    // expect(results.body.name).toEqual('Ross');
    expect(results.status).toEqual(200);
  });

  it.skip('should insert a new friend into our table', async () => {
    const friend = new Friend({ name: 'Alex', status: 'Tired' });
    const results = await request(app).post('/friends/:id').send(friend);
    expect(results.status).toEqual(200);
    expect(results.body.name).toEqual('Alex');
  });

  it.skip('PUT /friends/:id should update friend with id', async () => {
    const results = await request(app).put('/friends/1').send({
      name: 'Ross from Friends',
    });
    console.log(results.body);
    expect(results.status).toEqual(200);
    expect(results.body.name).toEqual('Ross from Friends');
  });

  it('DELETE /friends/:id should delete the friend with the matching ID', async () => {
    const deletedFriend = await request(app).delete('/friends/1');
    expect(deletedFriend.body.name).toEqual('Ross');
    const results = await request(app).get('/friends/1');
    expect(results.status).toEqual(500);
  });

  afterAll(() => {
    pool.end();
  });
});
