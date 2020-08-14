const express = require('express');
const app = express();
const connectDB = require('./config/db');
connectDB();

// Middle init
app.use(express.json({ extended: false }));
app.use('/api/todo', require('./route/api/todo'));
app.use('/api/login', require('./route/api/login'));
app.use('/api/register', require('./route/api/register'));

app.get('/', (req, res) => res.send('api run'));
app.use(express.json({ extended: false }));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`this is run in port ${PORT}`));
