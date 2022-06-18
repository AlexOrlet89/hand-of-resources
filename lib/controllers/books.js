const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const book = await Book.deleteById(id);
      res.json(book);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const book = await Book.updateById(req.params.id, req.body);
      // console.log(book);
      res.json(book);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);
      res.json(book);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.json(books);
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const book = await Book.getById(id);
      console.log(book);
      res.json(book);
    } catch (e) {
      next(e);
    }
  });
