const express = require('express');
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    ticketId: { type: String, unique: true, required: true }, // Ensure unique ticket ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    passengerName: { type: String, required: true }, 
    trainName: { type: String, required: true },
    trainNumber: { type: Number, required: true }, // Allow multiple tickets for the same train
    seatClass: { type: String, required: false },
    travelDate: { type: Date, required: true },
});

const Ticket = mongoose.model('Ticket', ticketSchema);
module.exports = Ticket;


const db = "mongodb+srv://nitinkapoor117:PRAJWa67IbBncLHG@test-db.rwlyl.mongodb.net/?retryWrites=true&w=majority&appName=test-db"
console.log(db);

mongoose
.connect(db)
.then(() => console.log('DB connected'))
.catch((err) => console.log('error'));

