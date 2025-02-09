const express = require("express");
const mongoose = require("mongoose");
// const app = express();

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true },
    password: {type: String, required: true},
    isAdmin: { type: Boolean, default: false },
});
module.exports = mongoose.model('User', userSchema);

const db =
"mongodb+srv://nitinkapoor117:PRAJWa67IbBncLHG@test-db.rwlyl.mongodb.net/?retryWrites=true&w=majority&appName=test-db"
// "mongodb+srv://nitinkapoor117:PRAJWa67IbBncLHG@test-db.rwlyl.mongodb.net/"
console.log(db);

mongoose
.connect(db)
.then(()=>console.log("DB connected"))
.catch((err)=> console.log("error", err));

const User = mongoose.model('User', userSchema);
