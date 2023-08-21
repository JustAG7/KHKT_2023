const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: String,
    description: String,
    manager: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
});

module.exports = mongoose.model('departments', departmentSchema);
