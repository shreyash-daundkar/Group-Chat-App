const { getGroupMembers } = require('../services/groupMember');


exports.getMembers = async (req, res, next) => {
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