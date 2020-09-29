const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost:27017/expressapp', { useNewUrlParser: true });

const app = express();
const router = express.Router();

const userRouter = require('./routes/user.route');
const bookRouter = require('./routes/book.route');
const institutionRouter = require('./routes/institution.route');

const User = require('./models/user.model');

const index = require('./routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

router.get('/', index);

app.use('/', userRouter);
app.use('/', bookRouter);
app.use('/', institutionRouter);

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((err, req, res, next) => {
  // catch all, since I did this very quickly
  if (err) return res.json({status: 500, message: 'Something went wrong...'})
});

app.listen(3000, () => console.log(`Open http://localhost:3000 to see a response.`));
