const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    email: String,
    phone: String,
    address: String,
    avatar: String,
    status: String,
    date_joined: Date,
    events: [{type: mongoose.Schema.Types.ObjectId, ref: 'events'}],
    departments: [{type: mongoose.Schema.Types.ObjectId, ref: 'departments'}]
});

module.exports = mongoose.model('users', userSchema);