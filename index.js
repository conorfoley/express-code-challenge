const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/expressapp', { useNewUrlParser: true });

const app = express();
const router = express.Router();

const userRouter = require('./routes/user.route');

const User = require('./models/user.model');

const index = require('./routes/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

router.use((req, res, next) => {
  console.log('hit it');
  next();
});

router.get('/', index);

app.use('/', userRouter);

app.listen(3000, () => console.log(`Open http://localhost:3000 to see a response.`));
