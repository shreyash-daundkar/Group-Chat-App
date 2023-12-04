const { getMembers } = require('../services/groupMember');


exports.getMembers = async (req, res, next) => {
    try {
        const { groupId } = req.params;

        const members = await getMembers({ groupId });

        const data = members.filter(member => member.userId !== req.userId);

        res.status(200).json({ data, success: true });

    } catch (error) {
        next(error);
    }
}