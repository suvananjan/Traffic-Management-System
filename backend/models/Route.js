const mongoose = require("mongoose")

const routeSchema = new mongoose.Schema({
  routeId: {
    type: String,
    required: true,
    unique: true,
  },
  startPoint: {
    type: String,
    required: true,
  },
  endPoint: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  signals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signal",
    },
  ],
  congestionLevel: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  efficiency: {
    type: Number,
    default: 100,
  },
  coordinates: [
    {
      latitude: Number,
      longitude: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Route", routeSchema)
