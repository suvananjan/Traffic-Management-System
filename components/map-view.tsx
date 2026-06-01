"use client"

import { Card } from "@/components/ui/card"
import { MapPin } from "lucide-react"

export function MapView() {
  const signals = [
    { id: 1, name: "Main St & 5th Ave", lat: 40.7128, lng: -74.006, status: "optimal" },
    { id: 2, name: "Broadway & 42nd St", lat: 40.758, lng: -73.9855, status: "warning" },
    { id: 3, name: "Park Ave & 34th St", lat: 40.7489, lng: -73.968, status: "optimal" },
    { id: 4, name: "Madison Ave & 23rd St", lat: 40.7461, lng: -73.9896, status: "critical" },
    { id: 5, name: "Lexington Ave & 14th St", lat: 40.7353, lng: -73.9911, status: "optimal" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "optimal":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Map View</h1>
        <p className="text-muted-foreground">Geographic distribution of traffic signals</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="p-6 h-96 bg-muted flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Map integration with Leaflet would be displayed here</p>
              <p className="text-sm text-muted-foreground mt-2">Real-time signal locations and status</p>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-foreground mb-4">Active Signals</h3>
            <div className="space-y-3">
              {signals.map((signal) => (
                <div key={signal.id} className="flex items-start gap-3 p-3 bg-secondary rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(signal.status)} mt-1 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{signal.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{signal.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
