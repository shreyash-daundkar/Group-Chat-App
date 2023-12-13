const { getGroupMembers, deleteGroupMember } = require('../services/groupMember');


exports.getGroupMembers = async (req, res, next) => {
    try {
        const { groupId } = req.query;
        const { id } = req.user;

        const members = await getGroupMembers({ groupId });

        const data = members.map(member => {
            const { userId, user: { username } } = member;
            return {
                userId,
                username,
                isAdmin: userId === id,
            }
        });

        res.status(200).json({ data, success: true });

    } catch (error) {
        next(error);
    }
}


exports.deleteGroupMember = async (req, res, next) => {
    try {
        const { groupId } = req.query;
        const { id } = req.user;

        await deleteGroupMember({ groupId, userId: id});

        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}