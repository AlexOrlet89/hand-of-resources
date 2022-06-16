const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT title, released FROM books;');
    return rows.map((row) => new Book(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT title, released FROM books WHERE books.id=$1',
      [id]
    );
    return new Book(rows[0]);
  }

  static async insert({ title, released }) {
    const { rows } = await pool.query(
      `INSERT INTO books (title, released)
       VALUES ($1, $2) 
       RETURNING *`,
      [title, released]
    );
    return new Book(rows[0]);
  }

  static async updateById(id, updatedBook) {
    const book = await Book.getById(id);
    // console.log(book, id, updatedBook);
    if (!book) return null;
    const { title, released } = { ...book, ...updatedBook };
    const { rows } = await pool.query(
      `UPDATE books
        SET title=$2, released=$3
        WHERE id=$1 RETURNING *`,
      [id, title, released]
    );
    // console.log(rows);
    return new Book(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM books WHERE id = $1 RETURNING *',
      [id]
    );
    return new Book(rows[0]);
  }
};
