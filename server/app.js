var express         = require("express");
var app             = express();
var mongoose        = require("mongoose");
var bodyParser       = require("body-parser");
var morgan          = require("morgan");
var config          = require("./config/config");
var session         = require("express-session");
var cookieParser    = require("cookie-parser");
var flash           = require("connect-flash");
var passport        = require("passport");
var LocalStrategy   = require("passport-local").Strategy;
var User            = require("./models/user");


mongoose.connect(config.database);

app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);
app.set("views", __dirname + "/../client/views");

app.use(express.static("../client/public"));
app.use(express.static("../client/app"))
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(cookieParser());
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    User.findById({ _id: id }, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password',
} ,
    function (name, password, done) {
        User.findOne({ name: name}, function(err, user) {

            if (err) { return done(err); }

            if (!user) {
                return done(null, false, { message: "Wrong name" });
            }

            if (!user.admin) {
                return done(null, false, { message: "User is not mod"});
            }

            user.validPassword(password, function(err, data) {
                if (err) { return done(err); }

                if (!data) {
                    return done(null, false, { message: "password is wrong "});
                }

                return done(null, user);
            })
        })
    }
))

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlush: true}), function(req, res) {
    if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 6 * 3;
    } else {
        req.session.cookie.expires = false;
    }
    res.redirect("/admin#/blogs");
});

app.get('/*', function(req, res, next) {
    if (req.headers.host.match(/^www/) !== null ) {
        res.redirect('http://' + req.headers.host.replace(/^www\./, '') + req.url);
    } else {
        next();
    }
});

app.use("/", require("./routes"));
app.use("/admin", require("./routes/admin"));
//app.use("/test", require("./routes/testUser"));

var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("app listening on " + host + " " + port);
});