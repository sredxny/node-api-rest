require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');

// create application/json parser
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(require('./routes/index'));

mongoose.connect('mongodb://localhost:27017/mongoose',{ useNewUrlParser: true ,useCreateIndex: true,},(err,res)=>{
    if (err) throw err;

    console.log("DB running")
});

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`App running in port ${port}`)
});