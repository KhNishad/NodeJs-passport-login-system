const express =  require('express');
const app = express();
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash   = require('connect-flash');
const session   =  require('express-session');
const passport = require('passport');


// passport config

require('./config/passport')(passport);


// databse config
const db  = require('./config/keys').MongoURI;

// connect to mongo
mongoose.connect(db,{
 useNewUrlParser : true,
 useUnifiedTopology: true 
})
.then(() => console.log("Mongo connected")
)
.catch(err => console.log(err));


// ejs 

app.use(expresslayouts);
app.set('view engine' , 'ejs');

// body-parser

app.use(express.urlencoded({ extended : false }));

// express session midlware
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

// passport  middleware 
app.use(passport.initialize());
app.use(passport.session());

// connect flash midlware
app.use(flash());
// global vars 
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// routes 

app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));


const port = process.env.port || 3000 ;
app.listen(port , console.log('Server Running at 3000'));

