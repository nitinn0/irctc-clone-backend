const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const verifyAdmin = require('../middlewares/verifyAdmin');

// Protected Route

router.get('/',verifyToken, (req, res) => {
    res.status(200).json({message: 'Protected route accessed'})
})

router.get('/admin', verifyAdmin, (req, res)=>{
    res.json({ msg: 'Admin accessed. Admin centre!'})
})


module.exports = router;