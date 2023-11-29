const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const database = require('./utils/database');

const User = require('./models/user');
const Chat = require('./models/chat');

const { userAuth } = require('./middlewares/userAuthentication');

const userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');



const app = express();



app.use( cors({ origin: 'http://127.0.0.1:5500' }) );

app.use(bodyParser.json());


app.use('/user', userRoutes);

app.use('/chat', userAuth, chatRoutes);


app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ message: 'Something went wrong!', success: false });
});



User.hasMany(Chat);
Chat.belongsTo(User);



database.sync()
 .then(() => app.listen(process.env.PORT || 4000))
 .catch(error => console.error(error.stack))