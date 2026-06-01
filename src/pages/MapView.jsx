"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import "../styles/MapView.css"

function MapView() {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current) return

    map.current = L.map(mapContainer.current).setView([15.8497, 78.0373], 13)

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map.current)

    fetchSignals()
  }, [])

  const fetchSignals = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/signals")
      const signals = await response.json()

      signals.forEach((signal) => {
        const [lng, lat] = signal.location.coordinates
        const color = signal.status === "green" ? "green" : signal.status === "yellow" ? "orange" : "red"

        L.circleMarker([lat, lng], {
          radius: 8,
          fillColor: color,
          color: "#000",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8,
        })
          .bindPopup(`<b>${signal.signalId}</b><br>Status: ${signal.status}`)
          .addTo(map.current)
      })
    } catch (error) {
      console.error("Error fetching signals:", error)
    }
  }

  return (
    <div className="map-view">
      <h1>Map View</h1>
      <div ref={mapContainer} className="map-container"></div>
    </div>
  )
}

export default MapView
