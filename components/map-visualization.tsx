"use client"

import { useState } from "react"
import { MapPin, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Signal {
  id: string
  lat: number
  lng: number
  status: "operational" | "maintenance" | "alert"
  name: string
  vehicles: number
  waitTime: number
}

const signals: Signal[] = [
  {
    id: "SG-001",
    lat: 40.7128,
    lng: -74.006,
    status: "operational",
    name: "Main St & 5th Ave",
    vehicles: 45,
    waitTime: 32,
  },
  {
    id: "SG-002",
    lat: 40.715,
    lng: -74.005,
    status: "operational",
    name: "Broadway & 42nd",
    vehicles: 78,
    waitTime: 45,
  },
  { id: "SG-003", lat: 40.71, lng: -74.008, status: "alert", name: "Park Ave & 34th", vehicles: 92, waitTime: 58 },
  {
    id: "SG-004",
    lat: 40.718,
    lng: -74.004,
    status: "maintenance",
    name: "Madison Ave & 52nd",
    vehicles: 12,
    waitTime: 15,
  },
  {
    id: "SG-005",
    lat: 40.711,
    lng: -74.007,
    status: "operational",
    name: "Lexington & 45th",
    vehicles: 56,
    waitTime: 38,
  },
]

export default function MapVisualization() {
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-500"
      case "maintenance":
        return "bg-yellow-500"
      case "alert":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle2 className="h-4 w-4" />
      case "maintenance":
        return <Clock className="h-4 w-4" />
      case "alert":
        return <AlertCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Map Container */}
      <div className="lg:col-span-2">
        <Card className="overflow-hidden">
          <div className="relative h-96 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 sm:h-[500px]">
            {/* Simplified Map Grid */}
            <svg className="h-full w-full opacity-20" viewBox="0 0 400 500">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="400" height="500" fill="url(#grid)" />
            </svg>

            {/* Signal Markers */}
            <div className="absolute inset-0">
              {signals.map((signal) => {
                const x = ((signal.lng + 74.01) / 0.01) * 2
                const y = ((signal.lat - 40.71) / 0.01) * 2
                return (
                  <button
                    key={signal.id}
                    onClick={() => setSelectedSignal(signal)}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transform transition-all hover:scale-125 ${
                      selectedSignal?.id === signal.id ? "scale-125" : "scale-100"
                    }`}
                    style={{ left: `${x}%`, top: `${y}%` }}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${getStatusColor(signal.status)} shadow-lg`}
                    >
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </Card>
      </div>

      {/* Signal Details */}
      <div className="space-y-4">
        <Card className="p-4">
          <h3 className="mb-4 font-semibold">Signal Locations</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {signals.map((signal) => (
              <button
                key={signal.id}
                onClick={() => setSelectedSignal(signal)}
                className={`w-full rounded-lg border p-3 text-left transition-colors ${
                  selectedSignal?.id === signal.id
                    ? "border-green-500 bg-green-50 dark:bg-green-950"
                    : "border-border hover:bg-muted"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{signal.id}</p>
                    <p className="text-xs text-muted-foreground">{signal.name}</p>
                  </div>
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-full ${getStatusColor(signal.status)} text-white`}
                  >
                    {getStatusIcon(signal.status)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Selected Signal Details */}
        {selectedSignal && (
          <Card className="p-4">
            <h3 className="mb-4 font-semibold">Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Signal ID</p>
                <p className="font-medium">{selectedSignal.id}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p className="font-medium text-sm">{selectedSignal.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Vehicles Waiting</p>
                <p className="font-medium">{selectedSignal.vehicles}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Wait Time</p>
                <p className="font-medium">{selectedSignal.waitTime}s</p>
              </div>
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700">Adjust Timing</Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
