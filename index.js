const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectToMongoDb = require('./connection');
const { checkForAuthentication, restrictTo } = require('./middleware/auth')

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRoute');
const userRoute = require('./routes/users');
const adminRoute = require('./routes/admin');

const app = express();
const PORT = 4000;

connectToMongoDb("mongodb://127.0.0.1:27017/short-url");

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);

app.use('/', staticRoute);
app.use('/admin', restrictTo(["ADMIN"]), adminRoute);
app.use('/url', restrictTo(["NORMAL", "ADMIN"]), urlRoute);
app.use('/user', userRoute);



app.listen(PORT, ()=>{
    console.log(`Server Started at PORT ${PORT}`);
})