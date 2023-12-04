const express = require('express');

const { getMembers } = require('../controllers/groupMember');


const router = express.Router();


router.get('/', getMembers);


module.exports = router;