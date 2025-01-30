require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

const logSchema = new mongoose.Schema({
  userId: String,
  date: String,
  startOdometer: Number,
  endOdometer: Number,
  purpose: String
});

const Log = mongoose.model("Log", logSchema);

// Add a log
app.post("/api/logs", async (req, res) => {
  const newLog = new Log(req.body);
  await newLog.save();
  res.status(201).send("Log added successfully!");
});

// Get all logs for a user
app.get("/api/logs/:userId", async (req, res) => {
  const logs = await Log.find({ userId: req.params.userId });
  res.json(logs);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
