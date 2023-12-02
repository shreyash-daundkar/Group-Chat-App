const express = require('express');

const { addUser, verifyUser, getUsers } = require('../controllers/user');

const { signupValidation, loginValidation } = require('../middlewares/userValidation');
const { userAuth } = require('../middlewares/userAuthentication');



const router = express.Router();



router.get('/', userAuth, getUsers);

router.post('/signup', signupValidation, addUser);

router.post('/login',loginValidation, verifyUser);



module.exports = router;