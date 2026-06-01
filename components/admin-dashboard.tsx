'use client'

import { useState } from 'react'
import { Settings, Plus, Trash2, Edit2, AlertTriangle } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface AdminSignal {
  id: string
  location: string
  installed: string
  lastMaintenance: string
  status: 'active' | 'inactive' | 'maintenance'
}

const adminSignals: AdminSignal[] = [
  { id: 'SG-001', location: 'Main St & 5th Ave', installed: '2022-01-15', lastMaintenance: '2024-09-20', status: 'active' },
  { id: 'SG-002', location: 'Broadway & 42nd', installed: '2022-03-10', lastMaintenance: '2024-08-15', status: 'active' },
  { id: 'SG-003', location: 'Park Ave & 34th', installed: '2021-11-05', lastMaintenance: '2024-10-01', status: 'maintenance' },
  { id: 'SG-004', location: 'Madison Ave & 52nd', installed: '2023-05-20', lastMaintenance: '2024-07-10', status: 'active' },
]

export default function AdminDashboard() {
  const [signals, setSignals] = useState(adminSignals)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSignal, setNewSignal] = useState({ location: '', installed: '' })

  const handleAddSignal = () => {
    if (newSignal.location && newSignal.installed) {
      const signal: AdminSignal = {
        id: `SG-${String(signals.length + 1).padStart(3, '0')}`,
        location: newSignal.location,
        installed: newSignal.installed,
        lastMaintenance: new Date().toISOString().split('T')[0],
        status: 'active',
      }
      setSignals([...signals, signal])
      setNewSignal({ location: '', installed: '' })
      setShowAddForm(false)
    }
  }

  const handleDeleteSignal = (id: string) => {
    setSignals(signals.filter((s) => s.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950 p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <div>
            <p className="font-semibold text-yellow-900 dark:text-yellow-100">Admin Access</p>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">You have full control over the traffic signal system</p>
          </div>
        </div>
      </Card>

      {/* Add Signal Form */}
      {showAddForm && (
        <Card className="p-6">
          <h3 className="mb-4 font-semibold">Add New Signal</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Location</label>
              <input
                type="text"
                placeholder="e.g., Main St & 5th Ave"
                value={newSignal.location}
                onChange={(e) => setNewSignal({ ...newSignal, location: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Installation Date</label>
              <input
                type="date"
                value={newSignal.installed}
                onChange={(e) => setNewSignal({ ...newSignal, installed: e.target.value })}
                className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button onClick={handleAddSignal} className="flex-1 bg-green-600 hover:bg-green-700">
              Add Signal
            </Button>
            <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Signals Management */}
      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Manage Signals</h3>
          {!showAddForm && (
            <Button onClick={() => setShowAddForm(true)} className="gap-2 bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4" />
              Add Signal
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-3 text-left font-medium">Signal ID</th>
                <th className="px-4 py-3 text-left font-medium">Location</th>
                <th className="px-4 py-3 text-left font-medium">Installed</th>
                <th className="px-4 py-3 text-left font-medium">Last Maintenance</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {signals.map((signal) => (
                <tr key={signal.id} className="border-b border-border hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{signal.id}</td>
                  <td className="px-4 py-3">{signal.location}</td>
                  <td className="px-4 py-3 text-muted-foreground">{signal.installed}</td>
                  <td className="px-4 py-3 text-muted-foreground">{signal.lastMaintenance}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                      signal.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200' :
                      signal.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-950 dark:text-gray-200'
                    }`}>
                      {signal.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="rounded-lg p-2 hover:bg-muted">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSignal(signal.id)}
                        className="rounded-lg p-2 hover:bg-red-100 dark:hover:bg-red-950"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* System Settings */}
      <Card className="p-6">
        <h3 className="mb-4 font-semibold flex items-center gap-2">
          <Settings className="h-5 w-5" />
          System Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auto-optimization</p>
              <p className="text-sm text-muted-foreground">Automatically adjust signal timings based on traffic</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Real-time Alerts</p>
              <p className="text-sm text-muted-foreground">Receive notifications for signal issues</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Data Logging</p>
              <p className="text-sm text-muted-foreground">Log all signal events for analysis</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4" />
          </div>
        </div>
      </Card>
    </div>
  )
}
