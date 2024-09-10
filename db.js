const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Udith:1234@atlascluster.jyup7.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
