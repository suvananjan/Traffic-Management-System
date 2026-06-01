"use client"

import { useState } from "react"
import Dashboard from "./pages/Dashboard"
import MapView from "./pages/MapView"
import RouteFinder from "./pages/RouteFinder"
import AdminDashboard from "./pages/AdminDashboard"
import "./App.css"

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard")

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "map":
        return <MapView />
      case "routes":
        return <RouteFinder />
      case "admin":
        return <AdminDashboard />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-brand">Traffic Signal Management System</div>
        <div className="navbar-menu">
          <button
            className={`nav-btn ${currentPage === "dashboard" ? "active" : ""}`}
            onClick={() => setCurrentPage("dashboard")}
          >
            Dashboard
          </button>
          <button className={`nav-btn ${currentPage === "map" ? "active" : ""}`} onClick={() => setCurrentPage("map")}>
            Map View
          </button>
          <button
            className={`nav-btn ${currentPage === "routes" ? "active" : ""}`}
            onClick={() => setCurrentPage("routes")}
          >
            Route Finder
          </button>
          <button
            className={`nav-btn ${currentPage === "admin" ? "active" : ""}`}
            onClick={() => setCurrentPage("admin")}
          >
            Admin
          </button>
        </div>
      </nav>
      <main className="main-content">{renderPage()}</main>
    </div>
  )
}

export default App
