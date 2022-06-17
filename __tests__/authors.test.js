const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Author = require('../lib/models/Author');

describe('authors routes testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should return a list of authors', async () => {
    const results = await request(app).get('/authors');
    expect(results.status).toEqual(200);
    expect(results.body.length).toEqual(3);
  });

  it.skip('should return a single author based on the id params', async () => {
    const results = await request(app).get('/authors/1');
    expect(results.body.name).toEqual('Eric Hill');
  });

  it.skip('PUT /authors/:id should update author with id', async () => {
    const results = await request(app).put('/authors/1').send({
      name: 'Eric Hill, PhD',
    });
    console.log(results.body);
    expect(results.status).toEqual(200);
    expect(results.body.name).toEqual('Eric Hill, PhD');
  });

  it.skip('should insert a new author into our table', async () => {
    const author = new Author({
      name: 'Alex Orlet',
      dob: 1989,
      pob: 'St. Louis, Missouri',
    });
    const results = await request(app).post('/authors/:id').send(author);
    expect(results.status).toEqual(200);
    expect(results.body.name).toEqual('Alex Orlet');
  });

  it.skip('DELETE /authors/:id should delete the author with the matching ID', async () => {
    const DeletedAuthor = await request(app).delete('/authors/1');
    expect(DeletedAuthor.body.name).toEqual(
      'The Monster at the end of this author'
    );
    const results = await request(app).get('/authors/1');
    expect(results.status).toEqual(500);
  });

  afterAll(() => {
    pool.end();
  });
});
