const { ERROR_CODE } = require('../utils/constants');

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    res.status(ERROR_CODE.INCORRECT_DATA).send({ message: 'Incorrect ID' });
  } else if (error.name === 'ValidationError') {
    res.status(ERROR_CODE.INCORRECT_DATA).send({ message: 'Invalid data' });
  } else if (error.name === 'DocumentNotFoundError') {
    res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Data not found' });
  } else {
    res.status(ERROR_CODE.INTERNAL_SERVER_ERROR).send({ message: 'Error' });
  }
  next();
};

module.exports = {
  errorHandler,
};

// When a 'CastError' occurs, it indicates that a MongoDB query couldn't cast a value to the expected type, which could mean that a resource was not found.
