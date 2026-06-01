const mongoose = require("mongoose")

const trafficSchema = new mongoose.Schema({
  trafficId: {
    type: String,
    required: true,
    unique: true,
  },
  signalId: {
    type: String,
    required: true,
  },
  vehicleCount: {
    type: Number,
    default: 0,
  },
  congestionLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  averageWaitTime: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Traffic", trafficSchema)
