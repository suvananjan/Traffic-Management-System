const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const path = require("path")

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/traffic-signals", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Import Routes
const signalRoutes = require("./routes/signals")
const routeRoutes = require("./routes/routes")
const trafficRoutes = require("./routes/traffic")
const alertRoutes = require("./routes/alerts")

// Use Routes
app.use("/api/signals", signalRoutes)
app.use("/api/routes", routeRoutes)
app.use("/api/traffic", trafficRoutes)
app.use("/api/alerts", alertRoutes)

// Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
