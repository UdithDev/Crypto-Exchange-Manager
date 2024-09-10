const express = require("express");
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const port = 3000;

//Middleware
app.use(express.json()); //For parsing JSON bodies

// // Routes
app.use("/api/orders",orderRoutes);
app.use("/api/users",userRoutes);

// Basic route for health check
app.get("/", (req, res) => {
  res.send("Crypto Exchange Mock Service is running!");
});

//Start the server
app.listen(port, () => {
  console.log(`server is running on http:localhost:${port}`);
});
