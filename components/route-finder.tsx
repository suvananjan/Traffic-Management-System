"use client"

import { useState, useEffect } from "react"
import { Navigation2, MapPin, Clock, TrendingDown } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Route {
  id: string
  name: string
  distance: number
  estimatedTime: number
  congestionLevel: "low" | "medium" | "high"
  signals: number
  efficiency: number
  start?: string
  end?: string
}

export default function RouteFinder() {
  const [routes, setRoutes] = useState<Route[]>([])
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null)
  const [startPoint, setStartPoint] = useState("Guntur")
  const [endPoint, setEndPoint] = useState("Bangalore")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInitialRoutes = async () => {
      try {
        setLoading(true)
        setError(null)
        const params = new URLSearchParams({
          start: startPoint,
          end: endPoint,
        })
        const response = await fetch(`/api/routes?${params}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch routes: ${response.status}`)
        }

        const data = await response.json()
        setRoutes(Array.isArray(data) ? data : [])
        if (Array.isArray(data) && data.length > 0) {
          setSelectedRoute(data[0])
        }
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "An error occurred"
        setError(errorMsg)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialRoutes()
  }, [])

  const handleFindRoutes = async () => {
    if (!startPoint || !endPoint) {
      setError("Please enter both start and end points")
      return
    }

    try {
      setLoading(true)
      setError(null)
      const params = new URLSearchParams({
        start: startPoint,
        end: endPoint,
      })
      const response = await fetch(`/api/routes?${params}`)

      if (!response.ok) {
        throw new Error("Failed to fetch routes")
      }

      const data = await response.json()
      setRoutes(Array.isArray(data) ? data : [])
      if (Array.isArray(data) && data.length > 0) {
        setSelectedRoute(data[0])
      } else {
        setError("No routes found for the selected points")
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred"
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const getCongestionColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-500"
      case "medium":
        return "text-yellow-500"
      case "high":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getCongestionBg = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-50 dark:bg-green-950"
      case "medium":
        return "bg-yellow-50 dark:bg-yellow-950"
      case "high":
        return "bg-red-50 dark:bg-red-950"
      default:
        return "bg-gray-50 dark:bg-gray-950"
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Form */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold">Find Optimal Route</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Start Point</label>
            <input
              type="text"
              placeholder="Enter starting city"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-medium">End Point</label>
            <input
              type="text"
              placeholder="Enter destination city"
              value={endPoint}
              onChange={(e) => setEndPoint(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
        <Button onClick={handleFindRoutes} disabled={loading} className="mt-4 w-full bg-green-600 hover:bg-green-700">
          <Navigation2 className="mr-2 h-4 w-4" />
          {loading ? "Finding Routes..." : "Find Routes"}
        </Button>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </Card>

      {/* Routes List and Details */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Routes List */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="mb-4 font-semibold">Available Routes ({routes.length})</h3>
            {loading ? (
              <div className="space-y-2">
                <div className="h-16 animate-pulse rounded-lg bg-muted"></div>
                <div className="h-16 animate-pulse rounded-lg bg-muted"></div>
                <div className="h-16 animate-pulse rounded-lg bg-muted"></div>
              </div>
            ) : routes.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No routes available. Try searching with start and end points.
              </p>
            ) : (
              <div className="space-y-2">
                {routes.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => setSelectedRoute(route)}
                    className={`w-full rounded-lg border p-3 text-left transition-colors ${
                      selectedRoute?.id === route.id
                        ? "border-green-500 bg-green-50 dark:bg-green-950"
                        : "border-border hover:bg-muted"
                    }`}
                  >
                    <p className="font-medium text-sm">{route.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {route.distance.toFixed(1)} km • {route.estimatedTime.toFixed(0)} min
                    </p>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Route Details */}
        {selectedRoute && (
          <div className="lg:col-span-2 space-y-4">
            <Card className={`p-6 ${getCongestionBg(selectedRoute.congestionLevel)}`}>
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedRoute.name}</h2>
                  <p className="text-muted-foreground mt-1">Route ID: {selectedRoute.id}</p>
                </div>
                <div
                  className={`text-sm font-semibold capitalize ${getCongestionColor(selectedRoute.congestionLevel)}`}
                >
                  {selectedRoute.congestionLevel} Congestion
                </div>
              </div>
            </Card>

            {/* Route Metrics */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Distance</p>
                    <p className="font-bold">{selectedRoute.distance.toFixed(1)} km</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Est. Time</p>
                    <p className="font-bold">{selectedRoute.estimatedTime.toFixed(0)} min</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <Navigation2 className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Signals</p>
                    <p className="font-bold">{selectedRoute.signals}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingDown className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">Efficiency</p>
                    <p className="font-bold">{selectedRoute.efficiency}%</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Route Description */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Route Details</h3>
              <div className="space-y-3 text-sm">
                <p className="text-muted-foreground">
                  This route passes through {selectedRoute.signals} traffic signals and covers a distance of{" "}
                  {selectedRoute.distance.toFixed(1)} km. Based on current traffic conditions, the estimated travel time
                  is {selectedRoute.estimatedTime.toFixed(0)} minutes.
                </p>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">Navigate</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    Share Route
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
