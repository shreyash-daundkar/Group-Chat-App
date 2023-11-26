const express = require('express');

const { addUser } = require('../controllers/user');



const router = express.Router();



router.post('/signup', addUser);



module.exports = router;