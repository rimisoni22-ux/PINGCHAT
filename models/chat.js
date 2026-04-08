const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  from: String,
  to: String,
  msg: String,
  created_at: { type: Date, default: Date.now },
  
  
   
  
  
  
   
  
});

module.exports = mongoose.model("Chat", chatSchema);
