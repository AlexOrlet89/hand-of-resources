const pool = require('../utils/pool');

module.exports = class Cat {
  id;
  name;
  type;
  url;
  year;
  lives;
  is_sidekick;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.url = row.url;
    this.year = row.year;
    this.lives = row.lives;
    this.is_sidekick = row.is_sidekick;
  }

  static async getAll() {
    const { rows } = await pool.query(
      'SELECT name, type, url, year, lives, is_sidekick FROM cats;'
    );
    return rows.map((row) => new Cat(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      'SELECT name, type FROM cats WHERE cats.id=$1;',
      [id]
    );
    return new Cat(rows[0]);
  }

  static async insert({ name, type, url, year, lives, is_sidekick }) {
    const { rows } = await pool.query(
      `INSERT INTO cats (name, type, url, year, lives, is_sidekick)
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [name, type, url, year, lives, is_sidekick]
    );
    return new Cat(rows[0]);
  }

  static async updateById(id, updatedFriend) {
    const friend = await Cat.getById(id);
    if (!friend) return null;
    const { name, type } = { ...friend, ...updatedFriend };
    const { rows } = await pool.query(
      `UPDATE cats
        SET name=$2, type=$3
        WHERE id=$1 RETURNING *`,
      [id, name, type]
    );
    // console.log(rows);
    return new Cat(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM cats WHERE id = $1 RETURNING *',
      [id]
    );
    return new Cat(rows[0]);
  }
};
