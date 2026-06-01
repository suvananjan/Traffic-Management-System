'use client'

import { useState } from 'react'
import { AlertCircle, CheckCircle2, Clock, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface SignalData {
  id: string
  location: string
  status: 'operational' | 'maintenance' | 'alert'
  greenTime: number
  redTime: number
  yellowTime: number
  cycleTime: number
  efficiency: number
  lastUpdate: string
}

const signals: SignalData[] = [
  { id: 'SG-001', location: 'Main St & 5th Ave', status: 'operational', greenTime: 45, redTime: 35, yellowTime: 5, cycleTime: 85, efficiency: 92, lastUpdate: '2 min ago' },
  { id: 'SG-002', location: 'Broadway & 42nd', status: 'operational', greenTime: 50, redTime: 30, yellowTime: 5, cycleTime: 85, efficiency: 88, lastUpdate: '1 min ago' },
  { id: 'SG-003', location: 'Park Ave & 34th', status: 'alert', greenTime: 40, redTime: 40, yellowTime: 5, cycleTime: 85, efficiency: 65, lastUpdate: '5 min ago' },
  { id: 'SG-004', location: 'Madison Ave & 52nd', status: 'maintenance', greenTime: 45, redTime: 35, yellowTime: 5, cycleTime: 85, efficiency: 0, lastUpdate: '30 min ago' },
  { id: 'SG-005', location: 'Lexington & 45th', status: 'operational', greenTime: 48, redTime: 32, yellowTime: 5, cycleTime: 85, efficiency: 90, lastUpdate: '3 min ago' },
]

export default function SignalPanel() {
  const [selectedSignal, setSelectedSignal] = useState<SignalData | null>(signals[0])
  const [editMode, setEditMode] = useState(false)
  const [editValues, setEditValues] = useState<Partial<SignalData>>({})

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'maintenance': return <Clock className="h-5 w-5 text-yellow-500" />
      case 'alert': return <AlertCircle className="h-5 w-5 text-red-500" />
      default: return null
    }
  }

  const handleEdit = () => {
    if (selectedSignal) {
      setEditValues(selectedSignal)
      setEditMode(true)
    }
  }

  const handleSave = () => {
    setEditMode(false)
    // In a real app, this would save to the backend
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Signal List */}
      <div className="lg:col-span-1">
        <Card className="p-4">
          <h3 className="mb-4 font-semibold">All Signals</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {signals.map((signal) => (
              <button
                key={signal.id}
                onClick={() => {
                  setSelectedSignal(signal)
                  setEditMode(false)
                }}
                className={`w-full rounded-lg border p-3 text-left transition-colors ${
                  selectedSignal?.id === signal.id
                    ? 'border-green-500 bg-green-50 dark:bg-green-950'
                    : 'border-border hover:bg-muted'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{signal.id}</p>
                    <p className="text-xs text-muted-foreground">{signal.location}</p>
                  </div>
                  {getStatusIcon(signal.status)}
                </div>
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Signal Details */}
      <div className="lg:col-span-2">
        {selectedSignal && (
          <div className="space-y-4">
            {/* Header */}
            <Card className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{selectedSignal.id}</h2>
                  <p className="text-muted-foreground">{selectedSignal.location}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(selectedSignal.status)}
                  <span className="text-sm font-medium capitalize">{selectedSignal.status}</span>
                </div>
              </div>
            </Card>

            {/* Timing Configuration */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Signal Timing</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium">Green Time (s)</label>
                  <input
                    type="number"
                    value={editMode ? editValues.greenTime : selectedSignal.greenTime}
                    onChange={(e) => setEditValues({ ...editValues, greenTime: parseInt(e.target.value) })}
                    disabled={!editMode}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Red Time (s)</label>
                  <input
                    type="number"
                    value={editMode ? editValues.redTime : selectedSignal.redTime}
                    onChange={(e) => setEditValues({ ...editValues, redTime: parseInt(e.target.value) })}
                    disabled={!editMode}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Yellow Time (s)</label>
                  <input
                    type="number"
                    value={editMode ? editValues.yellowTime : selectedSignal.yellowTime}
                    onChange={(e) => setEditValues({ ...editValues, yellowTime: parseInt(e.target.value) })}
                    disabled={!editMode}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Cycle Time (s)</label>
                  <input
                    type="number"
                    value={editMode ? editValues.cycleTime : selectedSignal.cycleTime}
                    onChange={(e) => setEditValues({ ...editValues, cycleTime: parseInt(e.target.value) })}
                    disabled={!editMode}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm disabled:opacity-50"
                  />
                </div>
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold">Performance</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Efficiency</span>
                    <span className="text-sm font-bold text-green-600">{selectedSignal.efficiency}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${selectedSignal.efficiency}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  Last updated: {selectedSignal.lastUpdate}
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              {!editMode ? (
                <>
                  <Button onClick={handleEdit} className="flex-1 bg-green-600 hover:bg-green-700">
                    <Zap className="mr-2 h-4 w-4" />
                    Edit Timing
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View History
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
                    Save Changes
                  </Button>
                  <Button onClick={() => setEditMode(false)} variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
