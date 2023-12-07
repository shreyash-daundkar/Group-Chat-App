const { getGroups, createGroup, editGroup, deleteGroup } = require('../services/group');


exports.getGroups = async (req, res, next) => {
    try {
        const { id } = req.user;

        const groups = await getGroups({ userId: id });

        const data = groups.map(group => {
            return {
                id: group.id,
                name: group.name,
                isAdmin: group.adminId === id,
            }
        });
               
        res.status(200).json({ data, success: true});
        
    } catch (error) {
        next(error);
    }
}

exports.createGroup =  async (req, res, next) => {
    try {
        const { id } = req.user;
        const { name , membersIds } = req.body;
        
        membersIds.push(id);

        await createGroup({ name, membersIds, adminId: id });

        res.status(201).json({ success: true});
    } catch (error) {
        next(error);
    }
}


exports.editGroup = async (req, res, next) => {
    try {
        const { groupId } = req.query;
        const { name, membersIds, adminId } = req.body;
        const { id } = req.user;

        membersIds.push(id)
    
        await editGroup({ groupId, name, membersIds, adminId });
    
        res.status(201).json({ success: true });

    } catch (error) {
        next(error);
    }
}


exports.deleteGroup = async (req, res, next) => {
    try {
        const { groupId } = req.query;

        await deleteGroup({ groupId });

        res.status(201).json({ success: true });

    } catch (error) {
        next(error);
    }
}