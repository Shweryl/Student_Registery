const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware')
const userRoute = require('./routes/userRoute')
const invoiceRoute = require('./routes/invoiceRoute')

// Connecting to mongodb atlas
const dburl = "mongodb+srv://shwezin:shwezin23@cluster0.1dku236.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dburl,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then((res) => console.log('db is successfully connected.'))
    .catch((err) => console.log(err))

// public access to static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(cookieParser());

app.get("/welcome", (req, res) => {
    res.send("Hello from my new bae:)")
})

app.get('/student_form', authMiddleware.requireAuth , (req, res) => {
    res.sendFile(path.join(__dirname, 'protected/student_form.html'));
});

app.get('/student_list', authMiddleware.requireAuth , (req, res) => {
    res.sendFile(path.join(__dirname, 'protected/student_list.html'));
});


// authentication routes
app.use(userRoute);
app.use(invoiceRoute);

app.listen(3000, () => {
    console.log("sever is connect on port 3000")
})