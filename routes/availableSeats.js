const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

router
.get('/availableSeats/:trainNumber', async (req, res) => {
    try {
        const { trainNumber } = req.params;
        const train = await Train.findOne({ trainNumber });
        if(!train){
            return res.status(404).json({error: "Train not found"});
        }
        // Train available. Now to calculate available seats
        const availableSeats = train.totalSeats - train.bookedSeats;

        // Now return
        res.status(200).json({
            trainName: train.trainName,
            trainNumber : train.trainNumber,
            availableSeats
        });
    }
    catch(error){
        res.status(500).json({error: "Server Error"})
    }
});

module.exports = router;