const express = require("express");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

const app = express();

main()
 .then(() => console.log("connection success"))
 .catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  { from: "neha", to: "preeti", msg: "send me notes for exams", created_at: new Date() },
  { from: "rohit", to: "mohit", msg: "teach me js", created_at: new Date() },
 
];

// Chat.insertMany(allChats); // run only once, then comment

app.listen(8080, () => console.log("server is running"));
