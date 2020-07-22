let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser');
let db = require('./util/database');
let session = require('express-session');
var nodemailer = require('nodemailer');

const expressHbs = require('express-handlebars');

const Handlebars = require("handlebars");

Handlebars.registerHelper('if-equals', function (a, b, options) {
  let val = (a == b) ? options.fn(this) : options.inverse(this);
  
  return val;
});


app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'login-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

app.engine(
    'hbs',
    expressHbs({
      layoutsDir: 'views/layouts/',
      defaultLayout: 'main-layout',
      extname: 'hbs'
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', 'views');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
  secret: 'mysecret'
}));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

let routes = require('./routes/router');
app.use(routes);

app.get('/', function (req,res) {
  res.render('login', {layout: 'login-layout.hbs'});
});

app.listen(process.env.PORT || 5000);