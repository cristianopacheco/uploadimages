require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(morgan('dev'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')));

app.use(require('./routes'));

app.listen(3000);
