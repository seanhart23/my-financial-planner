var methodOverride = require('method-override'),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    express        = require('express'),
    request        = require("express"),
    router         = express.Router(),
    app            = express();

//CONNECT PACKAGES
mongoose.connect("mongodb://localhost/myfinancialplanner_v1", {useMongoClient: true});    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

var billRoutes         = require('./routes/bills');
var dashboardRoutes    = require('./routes/dashboard');
    
//REQUIRING ROUTE FILES USING EXPRESS ROUTER
app.use('/bills', billRoutes);
app.use('/dashboard', dashboardRoutes);

//ROUTES
app.get('/', function(req, res){
    res.render('landing');
});

//TELL APP TO LISTEN TO PORT AND IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("================================");
    console.log("The My Financial Planner server has started!");
    console.log("================================");
});