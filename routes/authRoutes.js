const express = require('express');
const router = new express.Router();
const passport = require('passport');
const User = require('../models/User');

router.post('/signup', (req, res, next) => {
    const body = req.body;

    if(!body.name || !body.username || !body.email || !body.password || !body.confPassword) {
        return res.json({message: "Missing Credentials"});
    }

    if(body.password !== body.confPassword) {
        return res.json({message: "Passwords do not match"});
    }
    
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const isEmail = re.test(String(body.email).toLowerCase());

    if(!isEmail) {
        return res.json({message: "Please enter a valid Email"});
    }

    const user = new User({
        name: body.name,
        username: body.username,
        email: body.email,
        password: body.password
    })

    User.validateUserInfo(user, function(err, isValidated, message) {
        if(err) next(err);
        if(!isValidated) {
            return res.json({message: message});
        }
        
        User.hashPassword(user, function(err, newUser) {
            newUser.save(function(err) {
                if(err) next(err);
                return res.json({message: "Success"});
            })
        })
    })
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if(err) next(err);
        if(!user) {
            return res.json(info);
        }
        req.login(user, function(err) {
            if(err) next(err);
            return res.json({message: "Successful Login", user: req.user.name});
        })
    })(req, res, next);
})

router.get('/user', (req, res) => {
    if(req.user) {
        res.json(req.user.name);
    } else {
        res.json(false);
    }
})

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy(function(err) {
        if(err) next(err);
        res.clearCookie('VotingApp');
        res.redirect('/');
    })
})

module.exports = router;