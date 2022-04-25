const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');
const auth = require('./auth/routes/index');
require('dotenv').config();
const connectDB = require('./db/connection');
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(volleyball);
app.use(cors());

app.get('/', (req, res) => {
  res.json({
    message: 'YOoo..',
  });
});

app.use('/auth', auth);

const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode || 500);
  res.json({
    message: err,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
