const { getGroupMembers } = require('../services/groupMember');


exports.getMembers = async (req, res, next) => {
    try {
        const { groupId } = req.query;

        const members = await getGroupMembers({ groupId });

        const data = members.filter(member => member.userId !== req.user.id);

        res.status(200).json({ data, success: true });

    } catch (error) {
        next(error);
    }
}  