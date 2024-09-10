const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

//create a new order
router.post("/neworder", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const saveOrder = await newOrder.save();
    res.status(201).json(saveOrder);
  } catch (err) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

//Get All Order
router.get("/get", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch orders",
    });
  }
});

//update an existing order
router.put("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedOrder) {
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update order" });
  }
});

module.exports = router;
