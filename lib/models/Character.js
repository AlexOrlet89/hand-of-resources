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

  static async insert({ first_name, last_name }) {
    const { rows } = await pool.query(
      `INSERT INTO characters (first_name, last_name)
       VALUES ($1, $2) 
       RETURNING *`,
      [first_name, last_name]
    );
    return new Character(rows[0]);
  }

  static async updateById(id, updatedCharacter) {
    const character = await Character.getById(id);
    if (!character) return null;
    const { first_name, last_name } = { ...character, ...updatedCharacter };
    const { rows } = await pool.query(
      `UPDATE characters
        SET first_name=$2, last_name=$3
        WHERE id=$1 RETURNING *`,
      [id, first_name, last_name]
    );
    // console.log(rows);
    return new Character(rows[0]);
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
