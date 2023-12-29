const express = require('express');

const { sendMail, resetPassword } = require('../controllers/forgotPassword');

const { emailValidation, passwordValidation } = require('../middlewares/validation');



const router = express.Router();



router.post('/send-mail', emailValidation, sendMail);

router.post('/reset-password', passwordValidation, resetPassword);



module.exports = router;