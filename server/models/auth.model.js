const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('auths', authSchema);