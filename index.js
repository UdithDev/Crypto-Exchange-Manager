const express = require("express");
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const connectDB=require('./db')

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json()); //For parsing JSON bodies

// Connect to MongoDB
connectDB();

// // Routes
app.use("/api/orders",orderRoutes);
app.use("/api/users",userRoutes);

// Basic route for health check
app.get("/", (req, res) => {
  res.send("Crypto Exchange Mock Service is running!");
});

//Start the server
app.listen(PORT, () => {
  console.log(`server is running on http:localhost:${PORT}`);
});
