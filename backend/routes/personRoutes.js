const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

// Create
router.post('/', async (req, res) => {
  const person = new Person(req.body);
  const saved = await person.save();
  res.json(saved);
});

// Read all
router.get('/', async (req, res) => {
  const people = await Person.find();
  res.json(people);
});

// Update
router.put('/:id', async (req, res) => {
  const updated = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;