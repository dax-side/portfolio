const API = import.meta.env.VITE_WAVES_API || ''

export async function fetchWaves() {
  if (!API) return null
  const res = await fetch(API)
  if (!res.ok) throw new Error(`waves: ${res.status}`)
  return res.json()
}

// A 429 means this visitor waved recently: it still carries the current counts.
export async function sendWave() {
  if (!API) return null
  const res = await fetch(API, { method: 'POST' })
  if (!res.ok && res.status !== 429) throw new Error(`waves: ${res.status}`)
  return res.json()
}
