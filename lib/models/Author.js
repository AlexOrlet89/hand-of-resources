const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT name, dob, pob FROM authors;');
    return rows.map((row) => new Author(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT name, dob, pob FROM authors WHERE authors.id=$1',
      [id]
    );
    return new Author(rows[0]);
  }

  static async updateById(id, updatedAuthor) {
    const author = await Author.getById(id);
    // console.log(author, id, updatedAuthor);
    if (!author) return null;
    const { name, dob, pob } = { ...author, ...updatedAuthor };
    const { rows } = await pool.query(
      `UPDATE authors
        SET name=$2, dob=$3, pob=$4
        WHERE id=$1 RETURNING *`,
      [id, name, dob, pob]
    );
    // console.log(rows);
    return new Author(rows[0]);
  }

  static async insert({ name, dob, pob }) {
    const { rows } = await pool.query(
      `INSERT INTO authors (name, dob, pob)
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [name, dob, pob]
    );
    return new Author(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM authors WHERE id = $1 RETURNING *',
      [id]
    );
    return new Author(rows[0]);
  }
};
