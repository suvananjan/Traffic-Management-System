const express = require("express")
const router = express.Router()
const Route = require("../models/Route")

// Get all routes
router.get("/", async (req, res) => {
  try {
    const { startPoint, endPoint } = req.query
    const query = {}

    if (startPoint) query.startPoint = new RegExp(startPoint, "i")
    if (endPoint) query.endPoint = new RegExp(endPoint, "i")

    const routes = await Route.find(query).populate("signals")
    res.json(routes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Get route by ID
router.get("/:id", async (req, res) => {
  try {
    const route = await Route.findById(req.params.id).populate("signals")
    if (!route) return res.status(404).json({ message: "Route not found" })
    res.json(route)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// Create route
router.post("/", async (req, res) => {
  const route = new Route(req.body)
  try {
    const newRoute = await route.save()
    res.status(201).json(newRoute)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Update route
router.put("/:id", async (req, res) => {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(route)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// Delete route
router.delete("/:id", async (req, res) => {
  try {
    await Route.findByIdAndDelete(req.params.id)
    res.json({ message: "Route deleted" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
