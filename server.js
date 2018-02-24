const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const pollRoutes = require('./routes/pollRoutes');
const PORT = process.env.PORT || 3000;

const app = express();

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;

app.use(session({
    name: '_VSID',
    secret: 'AllthePolls',
    cookie: {maxAge: (24 * 60 * 60 * 1000)},
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}))

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.getUsername(username, function(err, user) {
            if(err) throw err;
            if(!user) {
                return done(null, false, {message: "User not found"})
            }
            User.comparePassword(password, user.password, function(err, isMatch) {
                if(err) throw err;
                if(!isMatch) {
                    return done(null, false, {message: "Invalid Password"})
                }
                return done(null, user);
            })
        })
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
})

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if(err) throw err;
        done(null, user);
    })
})

app.use('/auth', authRoutes);

app.use('/polls', pollRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})

app.get('/poll/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
})

app.use(function(err, req, res, next) {
    console.log(err.message);
    res.send(err.status + ' ' + err.message);
})

app.listen(PORT, () => console.log('API running on port 3000...'));