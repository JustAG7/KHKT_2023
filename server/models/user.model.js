const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    dob: String,
    email: String,
    phone: String,
    avatar: Object,
    status: String,
    date_joined: Date,
    events: [{type: mongoose.Schema.Types.ObjectId, ref: 'events'}],
});

module.exports = mongoose.model('users', userSchema);