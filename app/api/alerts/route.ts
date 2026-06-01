import { type NextRequest, NextResponse } from "next/server"

// Mock alerts data
const alerts = [
  {
    id: "A-001",
    signalId: "SG-001",
    issue: "Signal timing adjustment needed",
    time: "2 min ago",
    severity: "warning",
    resolved: false,
  },
  {
    id: "A-002",
    signalId: "SG-045",
    issue: "Sensor malfunction detected",
    time: "15 min ago",
    severity: "error",
    resolved: false,
  },
  {
    id: "A-003",
    signalId: "SG-089",
    issue: "Maintenance scheduled",
    time: "1 hour ago",
    severity: "info",
    resolved: false,
  },
]

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const severity = searchParams.get("severity")
  const resolved = searchParams.get("resolved")

  let filtered = alerts

  if (severity) {
    filtered = filtered.filter((a) => a.severity === severity)
  }

  if (resolved !== null) {
    filtered = filtered.filter((a) => a.resolved === (resolved === "true"))
  }

  return NextResponse.json(filtered)
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  const newAlert = {
    id: `A-${String(alerts.length + 1).padStart(3, "0")}`,
    ...body,
    time: "just now",
    resolved: false,
  }

  alerts.push(newAlert)
  return NextResponse.json(newAlert, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { id, ...updates } = body

  const index = alerts.findIndex((a) => a.id === id)
  if (index === -1) {
    return NextResponse.json({ error: "Alert not found" }, { status: 404 })
  }

  alerts[index] = { ...alerts[index], ...updates }
  return NextResponse.json(alerts[index])
}
