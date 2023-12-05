const express = require('express');

const { getGroups, createGroup, editGroup } = require('../controllers/group');


const router = express.Router();


router.get('/', getGroups);

router.post('/', createGroup);

router.put('/', editGroup);


module.exports = router;