// import express library
const express = require('express');

// create a server
const app = express();

// specify port
const { PORT = 3000 } = process.env;

// import helmet middleware to set security headers for API
const helmet = require('helmet');

app.use(helmet());

// connect routers

const usersRouter = require('./routes/usersData');

app.use(usersRouter);

const cardsRouter = require('./routes/cardsData');

app.use(cardsRouter);

const notFoundRouter = require('./routes/notFoundRoute');

app.use(notFoundRouter);

// connect port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
