//importing all environment variables
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');
app.set('view engine','ejs');
app.set('views', __dirname + '/views')//telling our app where our views are located
app.set('layout','layouts/layout')//enable us to incorporate static page components like header and footer therefore we can use them anywhere
app.use(expressLayouts);
app.use(express.static('public'));//telling our app where public files such as styles or scripts found

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true});

const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.use('/',indexRouter)
app.listen(process.env.PORT || 3000)