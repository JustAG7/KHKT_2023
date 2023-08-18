const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    dob: Date,
    email: String,
    phone: String,
    address: String,
    avatar: String,
    role: String,
    department: String,
    position: String
});

module.exports = mongoose.model('users', userSchema);