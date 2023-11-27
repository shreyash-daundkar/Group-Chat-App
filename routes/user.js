const express = require('express');

const { addUser, verifyUser } = require('../controllers/user');

const { signupValidation } = require('../middlewares/userValidation');



const router = express.Router();



router.post('/signup', signupValidation, addUser);

router.post('/login', verifyUser);

module.exports = router;