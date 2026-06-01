const mongoose = require("mongoose")
const dotenv = require("dotenv")
const Signal = require("../models/Signal")
const Route = require("../models/Route")
const Traffic = require("../models/Traffic")
const Alert = require("../models/Alert")

dotenv.config()

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/traffic-signals", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log("Connected to MongoDB")

    // Clear existing data
    await Signal.deleteMany({})
    await Route.deleteMany({})
    await Traffic.deleteMany({})
    await Alert.deleteMany({})

    // Create sample signals for Guntur
    const gunturSignals = [
      {
        signalId: "GUNTUR-001",
        location: {
          type: "Point",
          coordinates: [80.4365, 16.3067],
        },
        city: "Guntur",
        status: "green",
        redDuration: 30,
        yellowDuration: 5,
        greenDuration: 25,
        vehicleCount: 45,
      },
      {
        signalId: "GUNTUR-002",
        location: {
          type: "Point",
          coordinates: [80.4375, 16.3077],
        },
        city: "Guntur",
        status: "red",
        redDuration: 30,
        yellowDuration: 5,
        greenDuration: 25,
        vehicleCount: 62,
      },
      {
        signalId: "GUNTUR-003",
        location: {
          type: "Point",
          coordinates: [80.4385, 16.3087],
        },
        city: "Guntur",
        status: "yellow",
        redDuration: 30,
        yellowDuration: 5,
        greenDuration: 25,
        vehicleCount: 38,
      },
    ]

    // Create sample signals for Bangalore
    const bangaloreSignals = [
      {
        signalId: "BANGALORE-001",
        location: {
          type: "Point",
          coordinates: [77.5946, 12.9716],
        },
        city: "Bangalore",
        status: "green",
        redDuration: 35,
        yellowDuration: 5,
        greenDuration: 30,
        vehicleCount: 78,
      },
      {
        signalId: "BANGALORE-002",
        location: {
          type: "Point",
          coordinates: [77.5956, 12.9726],
        },
        city: "Bangalore",
        status: "red",
        redDuration: 35,
        yellowDuration: 5,
        greenDuration: 30,
        vehicleCount: 95,
      },
      {
        signalId: "BANGALORE-003",
        location: {
          type: "Point",
          coordinates: [77.5966, 12.9736],
        },
        city: "Bangalore",
        status: "green",
        redDuration: 35,
        yellowDuration: 5,
        greenDuration: 30,
        vehicleCount: 52,
      },
    ]

    const allSignals = await Signal.insertMany([...gunturSignals, ...bangaloreSignals])
    console.log(`Created ${allSignals.length} signals`)

    // Create sample routes
    const routes = [
      {
        routeId: "ROUTE-001",
        startPoint: "Guntur",
        endPoint: "Bangalore",
        distance: 450,
        duration: 480,
        signals: allSignals.slice(0, 3).map((s) => s._id),
        congestionLevel: "medium",
        efficiency: 85,
        coordinates: [
          { latitude: 16.3067, longitude: 80.4365 },
          { latitude: 15.5, longitude: 79.5 },
          { latitude: 12.9716, longitude: 77.5946 },
        ],
      },
      {
        routeId: "ROUTE-002",
        startPoint: "Guntur",
        endPoint: "Bangalore",
        distance: 480,
        duration: 510,
        signals: allSignals.slice(3, 6).map((s) => s._id),
        congestionLevel: "low",
        efficiency: 92,
        coordinates: [
          { latitude: 16.3067, longitude: 80.4365 },
          { latitude: 15.2, longitude: 79.8 },
          { latitude: 12.9716, longitude: 77.5946 },
        ],
      },
      {
        routeId: "ROUTE-003",
        startPoint: "Guntur",
        endPoint: "Bangalore",
        distance: 420,
        duration: 450,
        signals: allSignals.slice(0, 3).map((s) => s._id),
        congestionLevel: "high",
        efficiency: 72,
        coordinates: [
          { latitude: 16.3067, longitude: 80.4365 },
          { latitude: 15.8, longitude: 79.2 },
          { latitude: 12.9716, longitude: 77.5946 },
        ],
      },
    ]

    const createdRoutes = await Route.insertMany(routes)
    console.log(`Created ${createdRoutes.length} routes`)

    // Create sample traffic data
    const trafficData = allSignals.map((signal) => ({
      trafficId: `TRAFFIC-${signal.signalId}`,
      signalId: signal.signalId,
      vehicleCount: Math.floor(Math.random() * 100),
      congestionLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      averageWaitTime: Math.floor(Math.random() * 60),
    }))

    await Traffic.insertMany(trafficData)
    console.log(`Created ${trafficData.length} traffic records`)

    // Create sample alerts
    const alerts = [
      {
        alertId: "ALERT-001",
        signalId: "GUNTUR-002",
        message: "High traffic congestion detected",
        severity: "high",
        resolved: false,
      },
      {
        alertId: "ALERT-002",
        signalId: "BANGALORE-002",
        message: "Signal malfunction detected",
        severity: "high",
        resolved: false,
      },
      {
        alertId: "ALERT-003",
        signalId: "GUNTUR-001",
        message: "Maintenance required",
        severity: "medium",
        resolved: true,
        resolvedAt: new Date(),
      },
    ]

    await Alert.insertMany(alerts)
    console.log(`Created ${alerts.length} alerts`)

    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
