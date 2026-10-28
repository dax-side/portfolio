// Wave counter for the Contact section, deployed as a Vercel function backed by Upstash Redis.
// GET returns { total, countries }; POST adds a wave, at most once per visitor every 10 minutes.
// Visitors are told apart by a hash of their IP, never the IP itself.
import { createHash } from 'node:crypto'

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN
const ORIGINS = ['https://damola.me', 'https://www.damola.me']
const COOLDOWN_SECONDS = 600

async function redis(...commands) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    body: JSON.stringify(commands),
  })
  if (!res.ok) throw new Error(`redis: ${res.status}`)
  return (await res.json()).map(reply => reply.result)
}

async function counts() {
  const [total, countries] = await redis(['GET', 'waves:total'], ['SCARD', 'waves:countries'])
  return { total: Number(total) || 0, countries: Number(countries) || 0 }
}

export default async function handler(req, res) {
  if (ORIGINS.includes(req.headers.origin)) res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  if (req.method === 'OPTIONS') return res.status(204).end()

  if (req.method === 'GET') return res.status(200).json(await counts())

  if (req.method === 'POST') {
    const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    const visitor = createHash('sha256').update(ip).digest('hex').slice(0, 32)
    const [fresh] = await redis(['SET', `waves:visitor:${visitor}`, '1', 'NX', 'EX', String(COOLDOWN_SECONDS)])
    if (fresh !== 'OK') return res.status(429).json(await counts())

    const country = String(req.headers['x-vercel-ip-country'] || '').toUpperCase()
    const commands = [['INCR', 'waves:total']]
    if (/^[A-Z]{2}$/.test(country)) commands.push(['SADD', 'waves:countries', country])
    await redis(...commands)
    return res.status(200).json(await counts())
  }

  res.setHeader('Allow', 'GET, POST, OPTIONS')
  return res.status(405).end()
}
