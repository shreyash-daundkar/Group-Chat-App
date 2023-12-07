 const GroupMember = require('../models/groupMember');
 const User = require('../models/user');



exports.getGroupMembers = async options => {
    try {
        const { groupId, userId } = options;

        const whereClause = userId ? { groupId: groupId, userId: userId } : { groupId: groupId };
        
        const groupMembers = await GroupMember.findAll({
            where: whereClause,
            include: [{
                model: User,
                attributes: ['id', 'username']
            }]
        });
        
        return groupMembers;
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}