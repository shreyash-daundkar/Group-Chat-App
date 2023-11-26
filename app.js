const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();


app.use(bodyParser.json());


app.use('/', (req, res, next) => {
    res.sendFile(path.join(__dirname , 'public' + req.url))
});



app.listen(process.env.PORT || 4000);