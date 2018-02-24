const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    title: String,
    options: Array,
    user: String,
    voters: Array
})

const Polls = module.exports = mongoose.model('Polls', pollSchema);