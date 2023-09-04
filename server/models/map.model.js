const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
    event : {type: mongoose.Schema.Types.ObjectId, ref: 'events'},
    center : [],
    path: [],
});

module.exports = mongoose.model('maps', mapSchema);