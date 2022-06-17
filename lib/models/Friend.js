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
};
