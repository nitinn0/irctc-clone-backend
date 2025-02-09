const express = require("express");
const router = express.Router();
const Train = require("../models/Train");
const Ticket = require("../models/Ticket");
const verifyToken = require("../middlewares/verifyToken");
const nodemailer = require("nodemailer");

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nitinkapoor117@gmail.com", // Change to your email
    pass: "zbjg cqum ojqp lwrs" // Use App Password, NOT your email password
  }
});

// 🎟️ Route to Book a Ticket
router.post("/bookTicket", verifyToken, async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { passengerName, trainNumber, seatClass, travelDate, email } = req.body; // Extract email
    if (!passengerName || !trainNumber || !seatClass || !travelDate || !email) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Check if Train Exists
    const train = await Train.findOne({ trainNumber });
    if (!train) {
      return res.status(404).json({ error: "Train not found." });
    }

    // Check Available Seats
    if (train.bookedSeats >= train.totalSeats) {
      return res.status(400).json({ error: "No seats available on this train." });
    }

    // Increment Booked Seats
    train.bookedSeats += 1;
    const remainingSeats = train.totalSeats - train.bookedSeats;
    await train.save();

    // Create Ticket
    const newTicket = new Ticket({
      ticketId: Math.random().toString(36).substr(2, 9), // Random Ticket ID
      passengerName,
      userId: req.userId,
      trainName: train.trainName,
      trainNumber,
      seatClass,
      travelDate,
    });

    await newTicket.save();

    // Send Confirmation Email
    const mailOptions = {
      from: "nitinkapoor117@gmail.com",
      to: email,
      subject: "🎟️ Ticket Booking Confirmation",
      html: `
        <h2>🚆 Ticket Confirmation</h2>
        <p><b>Passenger Name:</b> ${passengerName}</p>
        <p><b>Train Name:</b> ${train.trainName}</p>
        <p><b>Train Number:</b> ${trainNumber}</p>
        <p><b>Seat Class:</b> ${seatClass}</p>
        <p><b>Travel Date:</b> ${new Date(travelDate).toLocaleDateString()}</p>
        <p><b>Ticket ID:</b> ${newTicket.ticketId}</p>
        <p>🔗 <a href="https://i.ibb.co/1dLhTDm/doge.webp" target="_blank">View Your Ticket</a></p>
        <p>Thank you for booking with us! 🚆</p>
      `
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      msg: "Ticket booked successfully! Email sent.",
      ticket: newTicket,
      remainingSeats,
    });
  } catch (error) {
    console.error("Error during ticket booking:", error);
    return res.status(500).json({ error: "Server error", details: error.message });
  }
});

module.exports = router;
