const express = require("express");
const mongoose = require("mongoose");
// const station = require('./');


const trainSchema = new mongoose.Schema({
    trainName: { type: String, required: true },
    trainNumber: { type: Number, required: true, unique: true },
    startStation: { type: String, required: true},
    endStation: { type: String, required: true},
    totalSeats: {type: Number, required: true, default: 0},
    bookedSeats: {type: Number, required: true, default: 0}
});

const Train = mongoose.model('Train', trainSchema);

module.exports = Train;

const db =
"mongodb+srv://nitinkapoor117:PRAJWa67IbBncLHG@test-db.rwlyl.mongodb.net/?retryWrites=true&w=majority&appName=test-db"
console.log(db);

mongoose
.connect(db)
.then(()=>console.log("DB connected"))
.catch((err)=> console.log("error"));
