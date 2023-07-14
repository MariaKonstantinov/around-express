const express = require('express');

const router = express.Router();

const { getUsers, getUserById } = require('../controllers/usersController');

router.get('/users', getUsers);
router.get('/users/:user_id', getUserById);

module.exports = router;
