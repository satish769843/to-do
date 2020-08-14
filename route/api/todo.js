const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const todoDB = require('../../module/todo');

// @todo   POST  api/todo
// @desc   post todo
// @status  Private

router.post(
  '/',
  [
    auth,
    [
      check('todo', 'Enter Todo').not().notEmpty(),
      check('date', 'Please Enter Date').not().notEmpty(),
    ],
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    const { todo, date, status } = req.body;
    try {
      const newtodo = new todoDB({
        todo,
        date,
        status,
      });
      newtodo.save();
      res.json(newtodo);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

// @todo  GET api/todo
// @desc  get all todo
// @status Private

router.get('/', auth, async (req, res) => {
  try {
    const getTodo = await todoDB.find().sort({ nowDate: -1 });
    res.json(getTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'server error' });
  }
});

// @todo  Edit api/todo
// @desc  Edit Todo
// @status Private

router.put(
  '/:id',
  [
    auth,
    [
      check('todo', 'Please Enter Todo').not().isEmpty(),
      check('date', 'Please Enter Date').not().notEmpty(),
    ],
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.mapped() });
    }

    const { todo, date, status } = req.body;
    console.log(typeof status);
    const updateTodo = {};
    if (todo) updateTodo.todo = todo;
    if (date) updateTodo.date = date;
    updateTodo.status = status;

    try {
      // console.log(status);
      const editTodo = await todoDB.findByIdAndUpdate(
        req.params.id,
        { $set: updateTodo },
        { new: true }
      );
      // console.log(editTodo);
      res.json(editTodo);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @todo  DELETE api/todo
// @desc  delete Todo
// @status Private
router.delete('/:id', auth, async (req, res) => {
  try {
    await todoDB.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Delete' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// @todo  GET api/todo/:id
// @desc  GET Todo
// @status Private
router.get('/:id', auth, async (req, res) => {
  try {
    const getTodo = await todoDB.findById(req.params.id);
    res.json(getTodo);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
