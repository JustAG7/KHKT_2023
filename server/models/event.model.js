const mongoose = require("mongoose");

// need to add more fields
const eventSchema = new mongoose.Schema({
  name: String,
  password: String,
  description: String,
  start: Date,
  finish: Date,
  participants: [(type = mongoose.Schema.Types.ObjectId), (ref = "users")],
  feed: [],
});

module.exports = mongoose.model("events", eventSchema);
