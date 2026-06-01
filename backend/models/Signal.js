const mongoose = require("mongoose")

const signalSchema = new mongoose.Schema({
  signalId: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  city: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["red", "yellow", "green"],
    default: "red",
  },
  redDuration: {
    type: Number,
    default: 30,
  },
  yellowDuration: {
    type: Number,
    default: 5,
  },
  greenDuration: {
    type: Number,
    default: 25,
  },
  vehicleCount: {
    type: Number,
    default: 0,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

signalSchema.index({ location: "2dsphere" })

module.exports = mongoose.model("Signal", signalSchema)
