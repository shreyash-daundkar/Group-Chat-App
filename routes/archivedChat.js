const express = require('express');

const { getArchivedChats } = require('../controllers/archivedChat');


const router = express.Router();


router.get('/', getArchivedChats);


module.exports = router;