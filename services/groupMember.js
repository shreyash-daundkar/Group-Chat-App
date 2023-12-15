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
        throw error;
    }
}


exports.deleteGroupMember = async options => {
    try {
        const { groupId, userId } = options;

        const memeber = await GroupMember.destroy({
            where: { 
                groupId: groupId, 
                userId: userId 
            }
        });

        return;
    } catch (error) {
        throw error;
    }
}