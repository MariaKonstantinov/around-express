// connect
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// import helmet middleware to set security headers for API
const helmet = require('helmet');

// create a server
const app = express();

// connect to the MongoDB server
mongoose.connect('mongodb://localhost:27017/aroundb', {
  useNewUrlParser: true,
  // useCreateIndex: false,
  // useFindAndModify: false,
});

// specify port
const { PORT = 3000 } = process.env;

app.use(helmet());

app.use(bodyParser.json());

// temporary authorization middleware
app.use((req, _res, next) => {
  req.user = {
    _id: '64cbc5c7be3cf4a6940b524a', // the _id of the test user
  };

  console.log(req.user._id);

  next();
});

// connect routers
const usersRouter = require('./routes/usersData');

app.use(usersRouter);

const cardsRouter = require('./routes/cardsData');

app.use(cardsRouter);

const { errorHandler } = require('./errors/customErrors');

app.use(errorHandler);

// connect port
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
