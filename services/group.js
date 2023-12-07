const database = require('../utils/database');

const User = require('../models/user');
const Group = require('../models/group');
const GroupMember = require('../models/groupMember');

const { getGroupMembers } = require('./groupMember');


exports.getGroupById = async options => {
    try {
        const { groupId } = options;

        const group = await Group.findByPk(groupId);
        return group;

    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}


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

    let t;

    try {
        t = await database.transaction(); 

        const { name, membersIds, adminId } = options;


        const group = await Group.create({name, adminId}, {transaction: t});

        
        await group.addUser(membersIds, { through: GroupMember, transaction: t });
        
        await t.commit();
        return;

    } catch (error) {
        await t.rollback();

        console.error(error.stack);
        throw error;
    }
}


exports.editGroup = async options => {

    let t;

    try {
        t = await database.transaction(); 

        const { groupId, name, membersIds, adminId } = options;

        const group = await Group.findByPk(groupId);

        group.name = name;
        group.adminId = adminId;
        await group.save({ transaction: t });

        const existingMembers = await getGroupMembers({ groupId });

        existingMembers.forEach(async (member) => {

            if (!membersIds.includes(member.id)) {
              await member.destroy({ transaction : t});
            }
          });
          
        const existingMembersIds = existingMembers.map(member => member.id);
        const membersToAdd = membersIds.filter(id => !existingMembersIds.includes(id));

        await group.addUser(membersToAdd, { through: GroupMember, transaction: t });
        
        await t.commit();
        return;

    } catch (error) {
        await t.rollback();

        console.error(error.stack);
        throw error;
    }
}


exports.deleteGroup = async options => {
    try {
        const { groupId } = options;

        const group = await Group.findByPk(groupId);

        await group.destroy();

    } catch (error) {
        console.error(error.stack);
        throw error;
    }
}