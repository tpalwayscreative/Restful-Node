/**
 * Created by phong on 12/18/16.
 */

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    expressValidator = require('express-validator'),
    app = express(),
    http = require('http'),
    config = require('./app/config/database'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 7000,
    server = http.createServer(app);

var users  = require('./app/v1/users_DBHandler');

mongoose.Promise = global.Promise;
mongoose.connect(config.database,function (err) {

    if(err){
        console.log('Mongodb connect error',err);
    }
    else{
        console.log('Mongodb connect successfully');
    }

});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended : false
}));
app.use(expressValidator());
app.use(morgan('dev'));


app.get('/',function (req,res) {

    res.json('Welcome to Restful Node');

});

var apiUsers = express.Router();
users(apiUsers);
app.use('/users',apiUsers);


server.listen(port,function () {
    console.log('Server listening at port %d' , server.address().port);
});