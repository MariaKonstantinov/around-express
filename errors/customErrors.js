const BadReqError = require('./BadReqError');
const NotFoundError = require('./NotFoundError');

const createBadReqError = (error, message) => {
  throw new BadReqError({ message: `${message} : ${error.message}` });
};

const createNotFoundError = (error, message) => {
  throw new NotFoundError(`${message} : ${error.message}`);
};

const errorHandler = (error, messageBadReq, messageNotFound) => {
  if (error.name === 'CastError') {
    createNotFoundError(error, messageNotFound);
  }

  createBadReqError(error, messageBadReq);
};

module.exports = {
  createBadReqError,
  createNotFoundError,
  errorHandler,
};

// When a 'CastError' occurs, it indicates that a MongoDB query couldn't cast a value to the expected type, which could mean that a resource was not found.
