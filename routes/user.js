const express = require('express');

const { addUser, verifyUser, getUsers } = require('../controllers/user');

const { signupValidation, loginValidation } = require('../middlewares/validation.js');
const { userAuth } = require('../middlewares/authentication.js');



const router = express.Router();



router.get('/', userAuth, getUsers);

router.post('/signup', signupValidation, addUser);

router.post('/login',loginValidation, verifyUser);



module.exports = router;