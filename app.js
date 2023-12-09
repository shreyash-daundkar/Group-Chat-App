const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

require('dotenv').config();

const database = require('./utils/database');

const User = require('./models/user');
const Chat = require('./models/chat');
const  Group = require('./models/group');
const  GroupMember = require('./models/groupMember');

const { userAuth, socketUserAuth, groupMemberAuth, socketGroupMemberAuth } = require('./middlewares/authentication.js');

const { addChat } = require('./controllers/chat.js');

const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const groupRouter = require('./routes/group');
const groupMemberRouter =  require('./routes/groupMember');




const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: 'http://127.0.0.1:5500',
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



app.use( cors({ origin: 'http://127.0.0.1:5500' }) );

app.use(bodyParser.json());


app.use('/user', userRoutes);

app.use('/chat', userAuth, groupMemberAuth, chatRoutes);

app.use('/group', userAuth, groupRouter);

app.use('/group-member', userAuth, groupMemberAuth, groupMemberRouter);


app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, `public${req.url}`));
});

app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ message: 'Something went wrong!', success: false });
});






User.hasMany(Chat);
Chat.belongsTo(User);

User.belongsToMany(Group, { through: GroupMember });
Group.belongsToMany(User, { through: GroupMember });

GroupMember.belongsTo(Group, {constraints : true, onDelete : 'CASCADE'});
GroupMember.belongsTo(User , {constraints : true, onDelete : 'CASCADE'});

Group.hasMany(Chat);
Chat.belongsTo(Group);



database.sync()
 .then(() => server.listen(process.env.PORT || 4000))
 .catch(error => console.error(error.stack))