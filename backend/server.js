const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var mongoose = require('mongoose');
var dbConfig = require('./config/database.config')

var 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/',)

mongoose.connect(dbConfig.url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('successfully connected to the database.')
    }).catch(err => {
        console.log('could not connect to the database. Exiting now...', err);
        process.exit();
    })

app.listen(3000, () => {
    console.log('server is listening on port 3000');
})

