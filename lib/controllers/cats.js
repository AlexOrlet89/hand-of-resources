const { Router } = require('express');
const Cat = require('../models/Cat');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const cat = await Cat.deleteById(req.params.id);
      console.log('the price is wrong', cat);
      res.json(cat);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const cat = await Cat.updateById(req.params.id, req.body);
      // console.log(cat);
      res.json(cat);
    } catch (e) {
      next(e);
    }
  })
  .post('/:id', async (req, res, next) => {
    try {
      const cat = await Cat.insert(req.body);
      res.json(cat);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const cats = await Cat.getAll();
      res.json(cats);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const cat = await Cat.getById(id);
      console.log(cat);
      res.json(cat);
    } catch (e) {
      next(e);
    }
  });
