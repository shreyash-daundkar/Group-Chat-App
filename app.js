const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const database = require('./utils/database');

const userRoutes = require('./routes/user');



const app = express();



app.use(cors({
  origin: 'http://127.0.0.1:5500'
}));

app.use(bodyParser.json());


app.use('/user', userRoutes);


// app.use('/', (req, res, next) => {
//     res.sendFile(path.join(__dirname , 'public' + req.url))
// });


app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({ message: 'Something went wrong!', success: false });
  });



database.sync()
 .then(() => app.listen(process.env.PORT || 4000))
 .catch(error => console.error(error.stack))