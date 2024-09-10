const express = require('express');
const { createUser, getUsers, updateUser } = require('../services/userService');
const router = express.Router();
const { v4: uuidv4 } = require('uuid'); // For generating unique user IDs
const User=require('../models/User')

// Create a new user
router.post('/', async (req, res) => {
  try{
    const newUser=
  }catch(){

  }
 
});

// Get all users
router.get('/', (req, res) => {
  const users = getUsers();
  res.status(200).json(users);
});

// Update an existing user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const user = updateUser(id, updatedUser);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
