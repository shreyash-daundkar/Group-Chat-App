const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const database = require('./utils/database');

const app = express();


app.use(bodyParser.json());


app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname , 'public' + req.url))
});


database.sync();
app.listen(process.env.PORT || 4000);