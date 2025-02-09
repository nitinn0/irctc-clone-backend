const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin');
const Train = require('../models/Train');
const Station = require('../models/Station');

// const { RoleSelectMenuInteraction } = require('discord.js');

router.post('/addTrain', verifyAdmin, async (req, res) => {
    try {
        const { trainName, trainNumber, startStation, endStation, totalSeats } = req.body;

        if (!trainName || !trainNumber || !startStation || !endStation || !totalSeats) {
            return res.status(400).json({ msg: "All fields are required..." });
        }

        const newTrain = new Train({ trainName, trainNumber, startStation, endStation, totalSeats });
        await newTrain.save();

        res.status(201).json({ msg: 'Train added!', train: newTrain });
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error });
    }
});

router
.delete('/deleteTrain/:id', verifyAdmin, async(req, res) => {
    
    try {
        const {id} = req.params;
        const deletedTrain = await Train.findByIdAndDelete(id);
        if(!deletedTrain){
            return res.status(404).json({error : "Train not found"});
        }
        res.status(200).json({msg: "Train deleted!"});
    }
    catch(error){
        res.status(500).json({ error : "Server Error"})
    }
    return res.json({status : "success"});
});

router.post('/addStation', verifyAdmin, async (req, res) => {
    const stations = req.body;  // Expecting an array of stations

    if (!Array.isArray(stations) || stations.length === 0) {
        return res.status(400).json({ error: "Please provide an array of stations." });
    }

    try {
        // Add all stations at once
        const addedStations = await Station.insertMany(stations);
        res.status(201).json({ msg: "Stations added successfully!", stations: addedStations });
    } catch (error) {
        res.status(500).json({ error: "Server Error!", error });
    }
});

module.exports = router;
