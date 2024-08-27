const express = require('express');
const { signup, login, getUsers } = require('../controller/controller');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/', getUsers);

module.exports = router;
