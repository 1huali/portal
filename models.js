//https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
const mongoose = require("mongoose");

const ThoughtSchema = new mongoose.Schema({
  thought: {
    type: String,
  
  },
  date: {
    type: String,
  
  },
  xPos: {
    type: String,
   
  },
  yPos: {
    type: String,
   
  },
  saved: {
    type: String,
   
  },
  lat: {
    type: String,
    
  },
  lng: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
});

const Thought = mongoose.model("thought", ThoughtSchema);

module.exports = Thought;