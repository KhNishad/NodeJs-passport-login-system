const express =  require('express');
const app = express();
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


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

// routes 

app.use('/', require('./routes/index'));

app.use('/users', require('./routes/users'));


const port = process.env.port || 3000 ;
app.listen(port , console.log('Server Running at 3000'));

