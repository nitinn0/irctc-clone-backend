const express = require('express');
const router = express.Router();
const Train = require('../models/Train');

// Route to get all available start and end stations
router.get('/stations', async (req, res) => {
    try {
        const startStations = await Train.distinct("startStation");
        const endStations = await Train.distinct("endStation");
        

        res.status(200).json({ startStations, endStations });
    } catch (error) {
        return res.status(500).json({ error: "Server error", error });
    }
});

// Route to get available trains based on start and end stations
router.get('/availableTrains', async (req, res) => {
    try {
        const { startStation, endStation } = req.query;

        if (!startStation || !endStation) {
            return res.status(400).json({ error: 'All fields required..' });
        }

        const availableTrains = await Train.find({
            startStation: startStation,
            endStation: endStation
        });

        if (availableTrains.length === 0) {
            return res.status(404).json({ error: "No train found" });
        }
        res.status(200).json({ availableTrains });
    } catch (error) {
        console.error("Error fetching available trains:", error);  // Log the error
        return res.status(500).json({ error: "Server error", message: error.message });
    }
});

module.exports = router;
