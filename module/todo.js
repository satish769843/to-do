const mongoose = require('mongoose');
const todoSchema = mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  nowDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = todo = mongoose.model('todo', todoSchema);
