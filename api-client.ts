// API client utilities for frontend data fetching

export async function fetchSignals() {
  const response = await fetch("/api/signals")
  if (!response.ok) throw new Error("Failed to fetch signals")
  return response.json()
}

export async function fetchSignal(id: string) {
  const response = await fetch(`/api/signals?id=${id}`)
  if (!response.ok) throw new Error("Failed to fetch signal")
  return response.json()
}

export async function updateSignal(id: string, data: any) {
  const response = await fetch("/api/signals", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ...data }),
  })
  if (!response.ok) throw new Error("Failed to update signal")
  return response.json()
}

export async function createSignal(data: any) {
  const response = await fetch("/api/signals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error("Failed to create signal")
  return response.json()
}

export async function deleteSignal(id: string) {
  const response = await fetch(`/api/signals?id=${id}`, {
    method: "DELETE",
  })
  if (!response.ok) throw new Error("Failed to delete signal")
  return response.json()
}

export async function fetchTrafficData(period = "24h") {
  const response = await fetch(`/api/traffic?period=${period}`)
  if (!response.ok) throw new Error("Failed to fetch traffic data")
  return response.json()
}

export async function fetchRoutes(start?: string, end?: string) {
  let url = "/api/routes"
  if (start && end) {
    url += `?start=${start}&end=${end}`
  }
  const response = await fetch(url)
  if (!response.ok) throw new Error("Failed to fetch routes")
  return response.json()
}

export async function fetchAlerts(severity?: string, resolved?: boolean) {
  let url = "/api/alerts"
  const params = new URLSearchParams()
  if (severity) params.append("severity", severity)
  if (resolved !== undefined) params.append("resolved", String(resolved))
  if (params.toString()) url += `?${params.toString()}`

  const response = await fetch(url)
  if (!response.ok) throw new Error("Failed to fetch alerts")
  return response.json()
}
