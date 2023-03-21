//https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  thought: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  xPos: {
    type: String,
    required: true,
  },
  yPos: {
    type: String,
    required: true,
  },
  saved: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  lng: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;