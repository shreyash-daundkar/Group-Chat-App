 const GroupMember = require('../models/groupMember');



exports.getGroupMembers = async options => {
    try {
        const { groupId, userId } = options;

        const whereClause = userId ? { groupId: groupId, userId: userId } : { groupId: groupId };
        
        const groupMembers = await GroupMember.findAll({
            where: whereClause,
        });
        
        return groupMembers;
    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}