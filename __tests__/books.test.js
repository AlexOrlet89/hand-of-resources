const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Book = require('../lib/models/Book');

describe('books routes testing', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it.skip('should return a list of books', async () => {
    const results = await request(app).get('/books');
    expect(results.status).toEqual(200);
    expect(results.body.length).toEqual(4);
  });

  it.skip('should return a single book based on the id params', async () => {
    const results = await request(app).get('/books/1');
    expect(results.body.title).toEqual('The Monster at the end of this book');
  });

  it.skip('should insert a new book into our table', async () => {
    const book = new Book({ title: 'Goodnight Moon', released: 1947 });
    const results = await request(app).post('/books/:id').send(book);
    expect(results.status).toEqual(200);
    expect(results.body.title).toEqual('Goodnight Moon');
  });

  it('PUT /books/:id should update book with id', async () => {
    const results = await request(app).put('/books/1').send({
      title:
        'The Monster at the End of This Book: Starring Lovable, Furry Old Grover',
    });
    console.log(results.body);
    expect(results.status).toEqual(200);
    expect(results.body.title).toEqual(
      'The Monster at the End of This Book: Starring Lovable, Furry Old Grover'
    );
  });

  afterAll(() => {
    pool.end();
  });
});
