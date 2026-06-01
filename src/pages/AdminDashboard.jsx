"use client"

import { useState, useEffect } from "react"
import "../styles/AdminDashboard.css"

function AdminDashboard() {
  const [signals, setSignals] = useState([])
  const [formData, setFormData] = useState({
    signalId: "",
    city: "",
    redDuration: 30,
    yellowDuration: 5,
    greenDuration: 25,
  })

  useEffect(() => {
    fetchSignals()
  }, [])

  const fetchSignals = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signals")
      const data = await response.json()
      setSignals(data)
    } catch (error) {
      console.error("Error fetching signals:", error)
    }
  }

  const handleAddSignal = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:5000/api/signals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          location: {
            type: "Point",
            coordinates: [78.0373, 15.8497],
          },
        }),
      })
      if (response.ok) {
        setFormData({
          signalId: "",
          city: "",
          redDuration: 30,
          yellowDuration: 5,
          greenDuration: 25,
        })
        fetchSignals()
      }
    } catch (error) {
      console.error("Error adding signal:", error)
    }
  }

  const handleDeleteSignal = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/signals/${id}`, { method: "DELETE" })
      fetchSignals()
    } catch (error) {
      console.error("Error deleting signal:", error)
    }
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="admin-container">
        <div className="add-signal-form">
          <h3>Add New Signal</h3>
          <form onSubmit={handleAddSignal}>
            <input
              type="text"
              placeholder="Signal ID"
              value={formData.signalId}
              onChange={(e) => setFormData({ ...formData, signalId: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Red Duration (s)"
              value={formData.redDuration}
              onChange={(e) => setFormData({ ...formData, redDuration: Number.parseInt(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Yellow Duration (s)"
              value={formData.yellowDuration}
              onChange={(e) => setFormData({ ...formData, yellowDuration: Number.parseInt(e.target.value) })}
            />
            <input
              type="number"
              placeholder="Green Duration (s)"
              value={formData.greenDuration}
              onChange={(e) => setFormData({ ...formData, greenDuration: Number.parseInt(e.target.value) })}
            />
            <button type="submit">Add Signal</button>
          </form>
        </div>

        <div className="signals-list">
          <h3>Manage Signals</h3>
          <table>
            <thead>
              <tr>
                <th>Signal ID</th>
                <th>City</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {signals.map((signal) => (
                <tr key={signal._id}>
                  <td>{signal.signalId}</td>
                  <td>{signal.city}</td>
                  <td>
                    <span className={`status ${signal.status}`}>{signal.status}</span>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteSignal(signal._id)} className="delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
