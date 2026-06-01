"use client"

import { useState } from "react"
import "../styles/RouteFinder.css"

function RouteFinder() {
  const [startPoint, setStartPoint] = useState("Guntur")
  const [endPoint, setEndPoint] = useState("Bangalore")
  const [routes, setRoutes] = useState([])
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFindRoutes = async () => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:5000/api/routes?startPoint=${startPoint}&endPoint=${endPoint}`)
      const data = await response.json()
      setRoutes(data)
      if (data.length > 0) setSelectedRoute(data[0])
    } catch (error) {
      console.error("Error fetching routes:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="route-finder">
      <h1>Route Finder</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Start Point"
          value={startPoint}
          onChange={(e) => setStartPoint(e.target.value)}
        />
        <input type="text" placeholder="End Point" value={endPoint} onChange={(e) => setEndPoint(e.target.value)} />
        <button onClick={handleFindRoutes} disabled={loading}>
          {loading ? "Finding..." : "Find Routes"}
        </button>
      </div>

      <div className="routes-container">
        <div className="routes-list">
          <h3>Available Routes ({routes.length})</h3>
          {routes.map((route) => (
            <div
              key={route._id}
              className={`route-item ${selectedRoute?._id === route._id ? "active" : ""}`}
              onClick={() => setSelectedRoute(route)}
            >
              <p>
                <strong>{route.startPoint}</strong> → <strong>{route.endPoint}</strong>
              </p>
              <p>{route.distance} km</p>
            </div>
          ))}
        </div>

        {selectedRoute && (
          <div className="route-details">
            <h3>Route Details</h3>
            <div className="detail-item">
              <span>Start:</span>
              <strong>{selectedRoute.startPoint}</strong>
            </div>
            <div className="detail-item">
              <span>End:</span>
              <strong>{selectedRoute.endPoint}</strong>
            </div>
            <div className="detail-item">
              <span>Distance:</span>
              <strong>{selectedRoute.distance} km</strong>
            </div>
            <div className="detail-item">
              <span>Duration:</span>
              <strong>{selectedRoute.duration} mins</strong>
            </div>
            <div className="detail-item">
              <span>Congestion:</span>
              <strong>{selectedRoute.congestionLevel}</strong>
            </div>
            <div className="detail-item">
              <span>Efficiency:</span>
              <strong>{selectedRoute.efficiency}%</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RouteFinder
