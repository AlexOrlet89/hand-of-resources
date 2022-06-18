const pool = require('../utils/pool');

module.exports = class Character {
  id;
  first_name;
  last_name;

  constructor(row) {
    this.id = row.id;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT first_name, last_name FROM characters;'
    );
    return rows.map((row) => new Character(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT first_name, last_name FROM characters WHERE characters.id=$1',
      [id]
    );
    return new Character(rows[0]);
  }
};
