const { Router } = require('express');
const Friend = require('../models/Friend');

module.exports = Router()
  .get('/', async (req, res) => {
    const friends = await Friend.getAll();
    res.json(friends);
  })
  .get('/:id', async (req, res) => {
    const id = req.params.id;
    const friend = await Friend.getById(id);
    console.log(friend);
    res.json(friend);
  });
