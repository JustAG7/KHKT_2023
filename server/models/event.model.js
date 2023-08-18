const mongoose = require('mongoose');

// need to add more fields
const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    feed: [type = mongoose.Schema.Types.ObjectId, ref = 'users']
});

module.exports = mongoose.model('events', eventSchema);