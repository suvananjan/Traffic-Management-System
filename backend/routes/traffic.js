const express = require("express")
const router = express.Router()
const Traffic = require("../models/Traffic")

// Get all traffic data
router.get("/", async (req, res) => {
  try {
    const traffic = await Traffic.find().sort({ timestamp: -1 })
    res.json(traffic)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get traffic by signal ID
router.get("/:signalId", async (req, res) => {
  try {
    const traffic = await Traffic.find({ signalId: req.params.signalId }).sort({ timestamp: -1 })
    res.json(traffic)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create traffic record
router.post("/", async (req, res) => {
  const traffic = new Traffic(req.body)
  try {
    const newTraffic = await traffic.save()
    res.status(201).json(newTraffic)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
