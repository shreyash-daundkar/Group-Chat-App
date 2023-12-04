const { getGroups, createGroup } = require('../services/group');


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
        
        membersIds.push(id)

        const group =  await createGroup({ name, membersIds, adminId: id });

        res.status(201).json({ data: group, success: true});
    } catch (error) {
        next(error);
    }
}