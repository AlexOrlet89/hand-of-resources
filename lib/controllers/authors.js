const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const author = await Author.deleteById(id);
      res.json(author);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id', async (req, res, next) => {
    try {
      const author = await Author.insert(req.body);
      res.json(author);
    } catch (e) {
      next(e);
    }
  })
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
