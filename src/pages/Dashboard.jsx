"use client"

import { useState, useEffect } from "react"
import "../styles/Dashboard.css"

function Dashboard() {
  const [stats, setStats] = useState({
    totalSignals: 0,
    activeSignals: 0,
    trafficFlow: 0,
    avgWaitTime: 0,
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signals")
      const signals = await response.json()
      setStats({
        totalSignals: signals.length,
        activeSignals: signals.filter((s) => s.status === "green").length,
        trafficFlow: Math.floor(Math.random() * 100),
        avgWaitTime: Math.floor(Math.random() * 60),
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Signals</h3>
          <p className="stat-value">{stats.totalSignals}</p>
        </div>
        <div className="stat-card">
          <h3>Active Signals</h3>
          <p className="stat-value">{stats.activeSignals}</p>
        </div>
        <div className="stat-card">
          <h3>Traffic Flow</h3>
          <p className="stat-value">{stats.trafficFlow}%</p>
        </div>
        <div className="stat-card">
          <h3>Avg Wait Time</h3>
          <p className="stat-value">{stats.avgWaitTime}s</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
