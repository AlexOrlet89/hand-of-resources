const { Router } = require('express');
const Friend = require('../models/Friend');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const friend = await Friend.deleteById(id);
      res.json(friend);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const friend = await Friend.updateById(req.params.id, req.body);
      // console.log(friend);
      res.json(friend);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id', async (req, res, next) => {
    try {
      const friend = await Friend.insert(req.body);
      res.json(friend);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const friends = await Friend.getAll();
    res.json(friends);
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const friend = await Friend.getById(id);
      console.log(friend);
      res.json(friend);
    } catch (e) {
      next(e);
    }
  });
