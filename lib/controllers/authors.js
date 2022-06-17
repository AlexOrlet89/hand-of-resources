const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .put('/:id', async (req, res, next) => {
    try {
      const author = await Author.updateById(req.params.id, req.body);
      // console.log(author);
      res.json(author);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const authors = await Author.getAll();
      res.json(authors);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const author = await Author.getById(id);
      console.log(author);
      res.json(author);
    } catch (e) {
      next(e);
    }
  });
