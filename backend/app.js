const express = require('express');
require('dotenv').config();
const userRoutes = require('./Routes/userRoutes.js');
const dbConnect = require('./DatabaseConnect/db.js');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require("cors");


//middleware
app.use(express.json());
app.use(cors({
    origin:["http://127.0.0.1:5500",'http://localhost:5500'],
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // origin:"http://localhost:5500",
    credentials:true,
}));
app.use(cookieParser());

app.use('/',userRoutes);
dbConnect();

module.exports = app;