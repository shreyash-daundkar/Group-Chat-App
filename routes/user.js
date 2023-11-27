const express = require('express');

const { addUser, verifyUser } = require('../controllers/user');

const { signupValidation, loginValidation } = require('../middlewares/userValidation');



const router = express.Router();



router.post('/signup', signupValidation, addUser);

router.post('/login',loginValidation, verifyUser);

module.exports = router;