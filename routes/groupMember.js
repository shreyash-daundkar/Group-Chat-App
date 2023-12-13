const express = require('express');

const { getGroupMembers, deleteGroupMember } = require('../controllers/groupMember');


const router = express.Router();


router.get('/', getGroupMembers);

router.delete('/', deleteGroupMember);


module.exports = router;