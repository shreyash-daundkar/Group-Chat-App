const express = require('express');

const { getChats, addChat } = require('../controllers/chat');


const router = express.Router();


router.get('/', getChats);

router.post('/', addChat);


module.exports = router;