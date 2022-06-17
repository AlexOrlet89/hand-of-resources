const { Router } = require('express');
const Friend = require('../models/Friend');

module.exports = Router().get('/', async (req, res) => {
  const friends = await Friend.getAll();
  res.json(friends);
});
