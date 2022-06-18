const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const characters = await Character.getAll();
      res.json(characters);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const character = await Character.getById(id);
      console.log(character);
      res.json(character);
    } catch (e) {
      next(e);
    }
  });
