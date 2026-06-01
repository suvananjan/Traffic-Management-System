"use client"

import { MapPin, Settings, Route, Zap, BarChart3, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface NavigationProps {
  currentView: string
  setCurrentView: (view: "dashboard" | "map" | "signals" | "routes" | "admin") => void
}

export function Navigation({ currentView, setCurrentView }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "map", label: "Map View", icon: MapPin },
    { id: "signals", label: "Signals", icon: Zap },
    { id: "routes", label: "Routes", icon: Route },
    { id: "admin", label: "Admin", icon: Settings },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">Traffic Control</span>
          </div>

          <div className="hidden md:flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView(item.id as any)}
                  className="gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              )
            })}
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setCurrentView(item.id as any)
                    setMobileMenuOpen(false)
                  }}
                  className="gap-2 justify-start"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              )
            })}
          </div>
        )}
      </div>
    </nav>
  )
}
