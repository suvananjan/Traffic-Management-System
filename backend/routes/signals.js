const express = require("express")
const router = express.Router()
const Signal = require("../models/Signal")

// Get all signals
router.get("/", async (req, res) => {
  try {
    const signals = await Signal.find()
    res.json(signals)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get signal by ID
router.get("/:id", async (req, res) => {
  try {
    const signal = await Signal.findById(req.params.id)
    if (!signal) return res.status(404).json({ message: "Signal not found" })
    res.json(signal)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create signal
router.post("/", async (req, res) => {
  const signal = new Signal(req.body)
  try {
    const newSignal = await signal.save()
    res.status(201).json(newSignal)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update signal
router.put("/:id", async (req, res) => {
  try {
    const signal = await Signal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(signal)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete signal
router.delete("/:id", async (req, res) => {
  try {
    await Signal.findByIdAndDelete(req.params.id)
    res.json({ message: "Signal deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
