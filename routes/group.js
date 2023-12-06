const express = require('express');

const { getGroups, createGroup, editGroup, deleteGroup } = require('../controllers/group');

const { adminAuth } = require('../middlewares/authentication');


const router = express.Router();


router.get('/', getGroups);

router.post('/', createGroup);

router.put('/', adminAuth, editGroup);

router.delete('/', adminAuth, deleteGroup);


module.exports = router;