const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid"); // For generating unique user IDs
const User = require("../models/User");

// Create a new user
router.post("/saveUser", async (req, res) => {
  try {
    const newUser = new User(req.body);
    const saveUser = await newUser.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to save user" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch Users",
    });
  }
});

// Update an existing user
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update User" });
  }
});

module.exports = router;
