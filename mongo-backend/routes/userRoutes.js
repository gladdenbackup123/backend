const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a new user 
router.post('/', async (req,res)=>{
    const user = await User.create(req.body);
    res.status(201).json(user);
})

module.exports = router;