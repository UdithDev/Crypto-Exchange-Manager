const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
      },
      amount: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        default: 'pending'
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model("Order", OrderSchema);
