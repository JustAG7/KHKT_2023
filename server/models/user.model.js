const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    email: String,
    phone: String,
    address: String,
    avatar: String,
    status: String,
    events: [{type: mongoose.Schema.Types.ObjectId, ref: 'events'}],
    department: [{type: mongoose.Schema.Types.ObjectId, ref: 'departments'}]
});

module.exports = mongoose.model('users', userSchema);