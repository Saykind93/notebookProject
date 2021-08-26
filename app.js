require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
//session
const redis = require('redis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient()
const userRouter = require('./routes/userRouter');

const PORT = process.env.PORT || 3000;
const app = express();

const indexRouter = require('./routes/indexRouter');
app.set('view engine', 'hbs');
//process.env.PWD
hbs.registerPartials(__dirname + '/views/partials');

//session middleware
app.use(
  session({
    name: 'sId',
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: process.env.SESSIONSECRET,
    resave: false,
  })
)

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());

app.use('/', indexRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log('Server start on ', PORT)
})
