const express = require('express');

const { sendMail, resetPassword } = require('../controllers/forgotPassword');

const { emailValidation, passwordValidation } = require('../middlewares/validation');



const router = express.Router();



router.post('/sendMail', emailValidation, sendMail);

router.post('/resetPassword', passwordValidation, resetPassword);



module.exports = router;