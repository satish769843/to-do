const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
connectDB();

// Middle init
app.use(express.json({ extended: false }));
app.use('/api/todo', require('./route/api/todo'));
app.use('/api/login', require('./route/api/login'));
app.use('/api/register', require('./route/api/register'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // set static  folder
  app.use(express.static('todo-list/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'todo-list', 'build', 'index.html'));
  });
}

app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`this is run in port ${PORT}`));
