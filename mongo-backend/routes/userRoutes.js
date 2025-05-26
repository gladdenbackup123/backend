const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a new user 
router.post('/', async (req,res)=>{
    const user = await User.create(req.body);
    res.status(201).json(user);
})

// Read all users
router.get('/',async (req,res)=>{
    const users = await User.find();
    res.json(users);
})

// Read a single user by ID 
router.get('/:id',async (req,res)=>{
    const user = await User.findById(req.params.id);
    res.json(user);
})

// Update a user by ID
router.put('/:id',async (req,res)=>{
    userId = req.params.id.trim();
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        req.body,
        {new : true}
    )

    res.json(updatedUser);
})

// Delete a user by ID 
router.delete('/:id',async (req,res)=>{
    await User.findByIdAndDelete(req.params.id);
    res.json({message:"User deleted"})
})

module.exports = router;