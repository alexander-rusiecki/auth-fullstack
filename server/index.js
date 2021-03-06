const express = require('express');
const rateLimit = require('express-rate-limit');
const volleyball = require('volleyball');
const cors = require('cors');
const auth = require('./auth/routes/index');
require('dotenv').config();
const connectDB = require('./db/connection');
connectDB();
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(limiter);
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
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening on port ${port}`));
