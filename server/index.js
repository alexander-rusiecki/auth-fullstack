const express = require('express');
const dotenv = require('dotenv').config();
const volleyball = require('volleyball');
const cors = require('cors');
const auth = require('./auth/routes/index');
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

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err,
  });
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port', port));
