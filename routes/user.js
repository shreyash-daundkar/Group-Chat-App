const express = require('express');

const { addUser } = require('../controllers/user');

const { signupValidation } = require('../middlewares/userValidation');



const router = express.Router();



router.post('/signup', signupValidation, addUser);



module.exports = router;