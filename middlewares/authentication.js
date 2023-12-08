const { verifyToken } = require('../services/jwt');
const { getUsers } = require('../services/user');
const { getGroupMembers } = require('../services/groupMember');
const { getGroupById } = require('../services/group');

exports.userAuth = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token not found in cookie', success: false });
        }

        const id = verifyToken(token).id;
        const users = await getUsers({ id });

        if (users.length !== 0) {
            req.user = users[0];
        } else {
            return res.status(404).json({ message: 'User not found' , success: false })
        }

        next();
    } catch (error) {
        next(error);
    }
}


exports.socketUserAuth = async (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        
        if (!token) {
            socket.emit('error', { message: 'Unauthorized - Token not found in cookie', success: false });
        }

        const id = verifyToken(token).id;
        const users = await getUsers({ id });

        if (users.length !== 0) {
            socket.user = users[0];

            return next();
        } else {
            socket.emit('error', { message: 'User not found' , success: false });
        }

    } catch (error) {
        console.log(error.stack);
        socket.emit('error', { message: 'Error in authenticating user', success: false });
    }
}


exports.groupMemberAuth = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { groupId } = req.query;

        const groupMembers = await getGroupMembers({ groupId, userId: id });
        
        if (groupMembers.length === 0) {
            return res.status(404).json({ message: 'You are not a member of this group' , success: false });
            
        } else {
            next();
        }

    } catch (error) {
        next(error);
    }
}


exports.adminAuth = async (req, res, next) => {
    try {
        const { groupId } = req.query;
        const { id } = req.user;

        const { adminId } = await getGroupById({ groupId });

        if(adminId !== id) {
            return res.status(404).json({ message: 'You are not a admin of this group', success: false });

        } else {
            next();
        }

    } catch (error) {
        next(error);
    }
}


exports.socketGroupMemberAuth = async data => {
    return async (socket, next) => {
        try {
            const { id } = socket.user;
            const { groupId } = data;
    
            const groupMembers = await getGroupMembers({ groupId, userId: id });
            
            if (groupMembers.length === 0) {
                socket.emit('error', { message: 'You are not a member of this group' , success: false });
                
            } else {
                return next();
            }
        } catch (error) {
            console.log(error.stack);
            socket.emit('error', { message: 'Error authenticating group memeber' , success: false });
        }
    }
}