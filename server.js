const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware')
const userRoute = require('./routes/userRoute')
const invoiceRoute = require('./routes/invoiceRoute')
const studentRoute = require('./routes/studentRoute')
require('dotenv').config();

// Connecting to mongodb atlas
const dburl = process.env.DB_URL;

mongoose.connect(dburl,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('db is successfully connected.'))
    .catch((err) => console.log(err))

// public access to static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(cookieParser());


app.use(userRoute);
app.use(invoiceRoute);
app.use(studentRoute);

// for non-existing routes
app.use((req, res) => {
    res.sendFile(path.join(__dirname, './public/404.html'));
});

app.listen(3000, () => {
    console.log("sever is connect on port 3000")
})