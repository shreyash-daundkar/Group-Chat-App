const database = require('../utils/database');

const User = require('../models/user');
const Group = require('../models/group');
const GroupMember = require('../models/groupMember');

 
exports.getGroups = async options => {
    try {
        const { userId } = options;

        const groups = await Group.findAll({
            include: [{
              model: User,
              through: GroupMember,
              where: {  
                id: userId,
              },
            }],
        });
    
        return groups;

    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}

exports.createGroup = async options => {

    const t =  await database.transaction(); 

    try {
        const { name, membersIds, adminId } = options;


        const group = await Group.create({name, adminId}, {transaction: t});

        
        await group.addUser(membersIds, { through: GroupMember, transaction: t });
        
        console.log(group)
        
        t.commit();
        return group;
    } catch (error) {
        t.rollback();

        console.error(error.stack);
        throw error;
    }
}