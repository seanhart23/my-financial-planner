var methodOverride = require('method-override'),
    localStrategy  = require('passport-local'),
    bodyParser     = require('body-parser'),
    passport       = require('passport'),
    mongoose       = require('mongoose'),
    express        = require('express'),
    request        = require("express"),
    router         = express.Router(),
    User           = require('./models/user'),
    budgetItem     = require('./models/budgetItem'),
    budgetExpense  = require('./models/budgetExpense'),
    // budgetIncome   = require('./models/budgetIncome'),
    middleware     = require('./middleware'),
    app            = express();

var request = require('request');

//CONNECT PACKAGES
// mongoose.connect("mongodb://localhost/myfinancialplanner_v1", {useMongoClient: true}); 
mongoose.connect("mongodb://Seanhart23:Maem250123!@ds151528.mlab.com:51528/my_financial_planner", {useMongoClient: true}); 
// mongoose.connect(process.env.DATABASEURL);    

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
var expenseRoutes      = require('./routes/expense');
var indexRoutes        = require('./routes/index');
var budgetItemRoutes   = require('./routes/budgetItem');
var debtRoutes         = require('./routes/debt');
var startingDebtRoutes = require('./routes/startingDebt');
var accountBalanceRoutes = require('./routes/accountBalance');
var snowballRoutes       = require('./routes/snowball');
var extraAmountRoutes       = require('./routes/extraAmount');
var budgetExpenseRoutes       = require('./routes/budgetExpense');
var monthlyIncomeRoutes       = require('./routes/monthlyIncome');
// var budgetIncomeRoutes       = require('./routes/budgetIncome');

//REQUIRING ROUTE FILES USING EXPRESS ROUTER
app.use('/budgetItem', budgetItemRoutes);
app.use('/budgetExpense', budgetExpenseRoutes);
// app.use('/budgetIncome', budgetIncomeRoutes);
app.use('/bills', billRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/expense', expenseRoutes);
app.use('/debt', debtRoutes);
app.use('/startingDebt', startingDebtRoutes);
app.use('/accountBalance', accountBalanceRoutes);
app.use('/snowball', snowballRoutes);
app.use('/extraAmount', extraAmountRoutes);
app.use('/monthlyIncome', monthlyIncomeRoutes);
app.use('/', indexRoutes);

app.get('/budget',  middleware.isLoggedIn, function(req, res){
budgetItem.find({}, function(err, allBudgetItems){
budgetExpense.find({}, function(err, allBudgetExpenses){
        if(err){
            console.log(err);
        } else {
            res.render("budget", {budgetItem: allBudgetItems, budgetExpense: allBudgetExpenses});      
        }
    });
});     
});

//TELL APP TO LISTEN TO PORT AND IP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("================================");
    console.log("The My Financial Planner server has started!");
    console.log("================================");
});