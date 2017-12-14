var methodOverride = require('method-override'),
    localStrategy  = require('passport-local'),
    bodyParser     = require('body-parser'),
    passport       = require('passport'),
    mongoose       = require('mongoose'),
    express        = require('express'),
    request        = require("express"),
    router         = express.Router(),
    User           = require('./models/user'),
    app            = express();

//CONNECT PACKAGES
mongoose.connect("mongodb://localhost/myfinancialplanner_v1", {useMongoClient: true});    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'Mason, Emory & Jolie are the best kids!',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

var billRoutes         = require('./routes/bills');
var dashboardRoutes    = require('./routes/dashboard');
    
//REQUIRING ROUTE FILES USING EXPRESS ROUTER
app.use('/bills', billRoutes);
app.use('/dashboard', dashboardRoutes);

//ROUTES
app.get('/', function(req, res){
    res.render('landing');
});

//AUTH ROUTES
app.get('/register', function(req, res){
    res.render('register');
});

app.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/dashboard');
        });
    });
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', passport.authenticate('local', 
    {
        successRedirect: 'dashboard', 
        failureRedirect: 'login'
    }), function(req, res){
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

//TELL APP TO LISTEN TO PORT AND IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("================================");
    console.log("The My Financial Planner server has started!");
    console.log("================================");
});