const express = require('express');
const router = new express.Router();
const Polls = require('../models/Polls');

router.get('/getPolls', (req, res, next) => {
    Polls.find(function(err, polls) {
        if(err) {
            return next(err);
        }
        if(!polls) {
            return res.json({message: "No Polls Found"})
        }
        return res.json(polls);
    })
})

router.get('/userPolls', (req, res, next) => {
    Polls.find({user: req.user.username}, function(err, polls) {
        if(err) {
            return next(err);
        }
        if(!polls) {
            return res.json(false);
        }
        return res.json(polls);
    })
})

router.post('/addPoll', (req, res, next) => {
    const options = req.body.options.filter(option => {
        return option !== '';
    }).map(option => {
        return {name: option, votes: 0};
    })
    if(!req.user) {
        return res.json("User logged out.")
    }
    const poll = new Polls({
        title: req.body.title,
        options: options,
        user: req.user.username
    })

    poll.save(function(err, newPoll) {
        if(err) {
            return next(err);
        }
        return res.json("Poll created");
    })
})

router.post('/getPoll', (req, res, next) => {
    let voter;
    let user;
    if(req.user) {
        voter = req.user.username;
        user = true;
    } else {
        voter = req.ip;
        user = false;
    }
    Polls.findById(req.body.pollID, function(err, poll) {
        if(err) {
            return next(err);
        }
        if(!poll) {
            return res.json({poll: "Poll not found"});
        }
        const didVote = poll.voters.filter(username => {
            return username === voter;
        })
        if(didVote.length === 0) {
            return res.json({poll: poll, didVote: false, user: user});
        }
        return res.json({poll: poll, didVote: true});
    })
})

router.post('/updatePoll', (req, res, next) => {
    const selected = req.body["selected"];
    if(!selected && !req.body.custom) {
        return res.json({poll: "Please select an option"});
    }
    let voter;
    if(req.user) {
        voter = req.user.username;
    } else {
        voter = req.ip;
    }
    Polls.findById(req.body.pollID, function(err, poll) {
        if(err) {
            return next(err);
        }
        if(!poll) {
            return res.json({poll: "Poll not found"});
        }
        const didVote = poll.voters.filter(voters => {
            return voter === voters;
        })
        if(didVote.length !== 0) {
            return res.json({poll: "User Already Voted"});
        }
        if(req.body.custom) {
            const newOption = {name: req.body.custom, votes: 1};
            Polls.findOneAndUpdate({_id: poll._id}, 
                {$push: {"voters": voter, "options": newOption}},
                {new: true}, function(err, newPoll) {
                    if(err) {
                        return next(err);
                    } else
                    if(!newPoll) {
                        return res.json({poll: "Could not Update Poll"});
                    }
                    return res.json(newPoll);
                }
            )
        } else if(selected) {
            Polls.findOneAndUpdate({_id: poll._id, "options.name": selected}, 
                {$inc: {"options.$.votes": 1}, $push: {"voters": voter}},
                {new: true}, function(err, newPoll) {
                    if(err) {
                        return next(err);
                    } else
                    if(!newPoll) {
                        return res.json({poll: "Could not Update Poll"});
                    }
                    return res.json(newPoll);
                }
            )
        } else {return res.json({poll: "Could not Update Poll"})}
    })
})

router.post('/deletePoll', (req, res, next) => {
    if(!req.user) {
        return res.json("User logged out.");
    }
    Polls.findByIdAndRemove(req.body.id, (err, obj) => {
        if(err) {
            return next(err);
        }
        return res.json("Success");
    })
})

module.exports = router;