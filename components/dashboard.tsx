'use client'

import { Activity, AlertTriangle, CheckCircle2, Clock, TrendingDown, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const trafficData = [
  { time: '00:00', flow: 45, congestion: 20 },
  { time: '04:00', flow: 32, congestion: 15 },
  { time: '08:00', flow: 78, congestion: 65 },
  { time: '12:00', flow: 92, congestion: 85 },
  { time: '16:00', flow: 88, congestion: 80 },
  { time: '20:00', flow: 65, congestion: 55 },
  { time: '23:59', flow: 38, congestion: 18 },
]

const signalStats = [
  { name: 'Operational', value: 156, icon: CheckCircle2, color: 'text-green-500' },
  { name: 'Maintenance', value: 8, icon: Clock, color: 'text-yellow-500' },
  { name: 'Alerts', value: 3, icon: AlertTriangle, color: 'text-red-500' },
  { name: 'Avg Response', value: '2.3s', icon: Activity, color: 'text-blue-500' },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {signalStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Traffic Flow Chart */}
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Traffic Flow (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="time" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="flow"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                name="Vehicle Flow"
              />
              <Line
                type="monotone"
                dataKey="congestion"
                stroke="#ef4444"
                strokeWidth={2}
                dot={false}
                name="Congestion %"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Signal Status Distribution */}
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Signal Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={[
              { status: 'Operational', count: 156 },
              { status: 'Maintenance', count: 8 },
              { status: 'Alerts', count: 3 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="status" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Recent Alerts</h3>
        <div className="space-y-3">
          {[
            { id: 'SG-001', issue: 'Signal timing adjustment needed', time: '2 min ago', severity: 'warning' },
            { id: 'SG-045', issue: 'Sensor malfunction detected', time: '15 min ago', severity: 'error' },
            { id: 'SG-089', issue: 'Maintenance scheduled', time: '1 hour ago', severity: 'info' },
          ].map((alert) => (
            <div key={alert.id} className="flex items-center justify-between border-b border-border pb-3 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full ${
                  alert.severity === 'error' ? 'bg-red-500' :
                  alert.severity === 'warning' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
                <div>
                  <p className="font-medium">{alert.id}</p>
                  <p className="text-sm text-muted-foreground">{alert.issue}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{alert.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
