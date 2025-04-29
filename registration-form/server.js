const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors()); // ✅ Just use cors() simply for now (allow all origins)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error: ", err));

// Schema for user registration
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  date: Date,
  gender: String,
  address: {
    street1: String,
    street2: String,
    country: String,
    city: String,
    region: String,
    postalCode: Number
  }
});

const User = mongoose.model("User", userSchema);

// Routes
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, date, gender, address } = req.body;

    const newUser = new User({
      name,
      email,
      password,
      date,
      gender,
      address
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message }); // ✅ keep this inside catch
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
