const pool = require('../utils/pool');

module.exports = class Friend {
  id;
  name;
  status;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.status = row.status;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT name, status FROM friends;');
    return rows.map((row) => new Friend(row));
  }

  static async getById(id) {
    console.log('model check');
    const { rows } = await pool.query(
      'SELECT name, status FROM friends WHERE friends.id=$1;',
      [id]
    );
    return new Friend(rows[0]);
  }
  static async insert({ name, status }) {
    const { rows } = await pool.query(
      `INSERT INTO friends (name, status)
       VALUES ($1, $2) 
       RETURNING *`,
      [name, status]
    );
    return new Friend(rows[0]);
  }

  static async updateById(id, updatedFriend) {
    const friend = await Friend.getById(id);
    if (!friend) return null;
    const { name, status } = { ...friend, ...updatedFriend };
    const { rows } = await pool.query(
      `UPDATE friends
        SET name=$2, status=$3
        WHERE id=$1 RETURNING *`,
      [id, name, status]
    );
    // console.log(rows);
    return new Friend(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM friends WHERE id = $1 RETURNING *',
      [id]
    );
    return new Friend(rows[0]);
  }
};
