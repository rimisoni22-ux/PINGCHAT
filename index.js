const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Chat = require("./models/chat");
const ExpressError = require("./ExpressError");

// ASYNC WRAPPER
function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    };
}

// VIEW ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// MIDDLEWARE
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// DATABASE CONNECTION
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main()
    .then(() => console.log("MongoDB connection successful"))
    .catch(err => console.log(err));

// INDEX ROUTE
app.get("/chats", asyncWrap(async (req, res) => {
    const chats = await Chat.find();
    res.render("index.ejs", { chats });
}));

// NEW CHAT ROUTE
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// CREATE CHAT ROUTE
app.post("/chats", asyncWrap(async (req, res) => {
    const { from, to, msg } = req.body;

    const newChat = new Chat({
        from,
        to,
        msg,
        profileImageFrom: "/images/default-user.png",
        profileImageTo: "/images/default-user.png",
        created_at: new Date()
    });

    await newChat.save();
    res.redirect("/chats");
}));

// SHOW CHAT ROUTE
app.get("/chats/:id", asyncWrap(async (req, res) => {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    if (!chat) throw new ExpressError(404, "Chat not found");
    res.render("show.ejs", { chat });
}));

// EDIT CHAT ROUTE
app.get("/chats/:id/edit", asyncWrap(async (req, res) => {
    const { id } = req.params;
    const chat = await Chat.findById(id);
    if (!chat) throw new ExpressError(404, "Chat not found");
    res.render("edit.ejs", { chat });
}));

// UPDATE CHAT ROUTE
app.put("/chats/:id", asyncWrap(async (req, res) => {
    const { id } = req.params;
    const { msg } = req.body;
    await Chat.findByIdAndUpdate(id, { msg }, { runValidators: true });
    res.redirect("/chats");
}));

// DELETE CHAT ROUTE
app.delete("/chats/:id", asyncWrap(async (req, res) => {
    const { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
}));

// ROOT ROUTE
app.get("/", (req, res) => {
    res.redirect("/chats");
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message);
});

// SERVER
app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
