var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');


if(process.env.WEB_CONCURRENCY ) {
    secret = process.env.SESSION_SECRET;
}
app.use(session({
    secret: secret,
    saveUninitialized: true,
    resave: true}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./assignment/app.js")(app);
//require ("./test/app.js")(app);

var database = require('./database/database')();
var security = require('./security/security')(database, passport);
require("./project/app")(app, database, security);
require("./proxy/app")(app);

var port = process.env.PORT || 3000;

app.listen(port);