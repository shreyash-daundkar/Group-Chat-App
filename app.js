const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

require('dotenv').config();

const database = require('./utils/database');

const User = require('./models/user');
const Chat = require('./models/chat');
const Group = require('./models/group');
const GroupMember = require('./models/groupMember');
const ArchivedChat = require('./models/archivedChat.js');
const ForgotPassword = require('./models/forgotPassword.js');

const { userAuth, socketUserAuth, groupMemberAuth, socketGroupMemberAuth } = require('./middlewares/authentication.js');

const { addChat } = require('./controllers/chat.js');

const  { cronJob } = require('./utils/cron.js');

const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const groupRouter = require('./routes/group');
const groupMemberRouter =  require('./routes/groupMember');
const archivedChatRouter = require('./routes/archivedChat.js');




const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: `http://${process.env.HOST}`,
    }
});




const groupNamespace = io.of('/group');

groupNamespace.use(socketUserAuth);

groupMemberRouter.use(socketGroupMemberAuth);

groupNamespace.on('connection', async socket => {
    
    socket.on('join-chat-room', async data => {
        socket.leaveAll();
        socket.join(data.groupId);
    });

    socket.on('send-chat', async data => {
        addChat(groupNamespace, socket, data);
    });
    
    socket.on('disconnect', () => {
        socket.leaveAll();
    });   
});




app.use( cors({ origin: `http://${process.env.HOST}` }) );

app.use(bodyParser.json());

cronJob.start();




app.use('/user', userRoutes);

app.use('/group', userAuth, groupRouter);

app.use('/chat', userAuth, groupMemberAuth, chatRoutes);

app.use('/group-member', userAuth, groupMemberAuth, groupMemberRouter);

app.use('/archived-chat', userAuth, groupMemberAuth, archivedChatRouter);

app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, `public${req.url}`));
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ message: 'Something went wrong!', success: false });
});




User.hasMany(Chat);
Chat.belongsTo(User);

User.hasMany(ArchivedChat);
ArchivedChat.belongsTo(User);

User.belongsToMany(Group, { through: GroupMember });
Group.belongsToMany(User, { through: GroupMember });

GroupMember.belongsTo(Group);
GroupMember.belongsTo(User);

Group.hasMany(Chat);
Chat.belongsTo(Group);

Group.hasMany(ArchivedChat);
ArchivedChat.belongsTo(Group);

User.hasMany(ForgotPassword);
ForgotPassword.belongsTo(User);




database.sync()
 .then(() => server.listen(process.env.PORT || 4000))
 .catch(error => console.error(error.stack))