const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override')

app.set('view engine', 'pug');
app.set('views', './views');

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }));

  app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
});

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');


const errorController = require('./controllers/errors');
const { request } = require('http');
const { response } = require('express');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404Page);


mongoose.connect('mongodb+srv://burak:CfCaxZsI88yfoulN@havadurumu.hsuc5.mongodb.net/weather_forecast?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to mongodb');
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })