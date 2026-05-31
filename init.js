const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
 .then(() => {
    console.log("Connection success");
    return Chat.insertMany(allChats);
 })
 .then(() => console.log("Data was initialized"))
 .catch(err => console.log(err));

let allChats = [
  { from: "neha", to: "preeti", msg: "send me notes for exams", created_at: new Date() },
  { from: "rohit", to: "mohit", msg: "teach me js", created_at: new Date() }
];