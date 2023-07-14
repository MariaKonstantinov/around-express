// adding path method
const path = require('path');

const { getJsonFromFile } = require('../helpers/files');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath);

    res.send(users);
  } catch (error) {
    console.log('Error happened in getUsers', error);
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

// get user by id
const getUserById = async (req, res) => {
  try {
    const users = await getJsonFromFile(usersFilePath);

    const user = users.find((user) => user._id === req.params.user_id);

    // error state
    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
    }

    res.send(user);
  } catch (error) {
    console.log('Error happened in getUsers', error);
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
};

module.exports = {
  getUsers,
  getUserById,
};
