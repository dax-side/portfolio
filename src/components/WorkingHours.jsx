import { useEffect, useState } from 'react'

// Lagos is UTC+1 all year (no daylight saving).
const LAGOS_OFFSET = 60
const DAY = 24 * 60
// Working hours in minutes after midnight: a 9-to-5 for the visitor, 9am to 7pm in Lagos for me.
const YOUR_DAY = [9 * 60, 17 * 60]
const MY_DAY = [9 * 60, 19 * 60]
const TICKS = ['00', '06', '12', '18', '24']

const localTime = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
const lagosTime = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })

// Chrome still reports some zones by their old city names.
const RENAMED = { Calcutta: 'Kolkata', Kiev: 'Kyiv', Saigon: 'Ho Chi Minh City', Katmandu: 'Kathmandu', Rangoon: 'Yangon' }
const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
const zoneCity = zone.includes('/') && !zone.startsWith('Etc/') ? zone.split('/').pop() : null
const city = zoneCity && (RENAMED[zoneCity] || zoneCity.replace(/_/g, ' '))

// Splits a span of minutes into the pieces that fall inside one day, wrapping past midnight.
function wrap([start, end]) {
  const from = ((start % DAY) + DAY) % DAY
  const to = from + end - start
  return to <= DAY ? [[from, to]] : [[from, DAY], [0, to - DAY]]
}

function intersect(spans, others) {
  return spans
    .flatMap(([s1, e1]) => others.map(([s2, e2]) => [Math.max(s1, s2), Math.min(e1, e2)]))
    .filter(([s, e]) => e > s)
}

function twelveHour(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h % 12 || 12}${m ? `:${String(m).padStart(2, '0')}` : ''}${h < 12 ? 'am' : 'pm'}`
}

const pct = minutes => `${(minutes / DAY) * 100}%`

export default function WorkingHours() {
  const [now, setNow] = useState(null)

  useEffect(() => {
    const tick = () => setNow(new Date())
    const first = setTimeout(tick, 0)
    const timer = setInterval(tick, 30000)
    return () => { clearTimeout(first); clearInterval(timer) }
  }, [])

  if (!now) return null

  // How far the visitor's clock runs ahead of Lagos, in minutes; everything below is in the visitor's time.
  const ahead = -now.getTimezoneOffset() - LAGOS_OFFSET
  const rows = [
    ['YOU', [YOUR_DAY]],
    ['ME',  wrap([MY_DAY[0] + ahead, MY_DAY[1] + ahead])],
  ]
  const shared = intersect(rows[0][1], rows[1][1])
  const sharedMinutes = shared.reduce((sum, [s, e]) => sum + e - s, 0)
  const sharedHours = Math.round(sharedMinutes / 6) / 10
  const minute = now.getHours() * 60 + now.getMinutes()

  const where = city && city !== 'Lagos' ? `You're in ${city}. ` : ''
  let verdict
  if (city === 'Lagos') {
    verdict = <>You're in Lagos too, so we share <span style={styles.accent}>the whole working day</span>.</>
  } else if (ahead === 0) {
    verdict = <>{where}Same time as Lagos, so we share <span style={styles.accent}>the whole working day</span>.</>
  } else if (sharedMinutes === YOUR_DAY[1] - YOUR_DAY[0]) {
    verdict = <>{where}We share <span style={styles.accent}>your whole working day</span>.</>
  } else if (sharedHours === 0) {
    const myTime = ((YOUR_DAY[0] - ahead) % DAY + DAY) % DAY
    verdict = <>{where}Our working days don't overlap: your 9am is my {twelveHour(myTime)}.</>
  } else {
    verdict = <>{where}We share <span style={styles.accent}>{sharedHours} working {sharedHours === 1 ? 'hour' : 'hours'}</span> a day.</>
  }

  return (
    <div style={styles.box}>
      <div style={styles.head}>
        <span className="type-label" style={styles.title}>WORKING HOURS · YOUR TIME</span>
        <span className="type-label" style={styles.clocks}>YOU {localTime.format(now)} · ME {lagosTime.format(now)}</span>
      </div>

      <div style={styles.chart} aria-hidden="true">
        {rows.map(([who, work]) => (
          <div key={who} style={styles.row}>
            <span className="type-label" style={styles.who}>{who}</span>
            <div style={styles.track}>
              {work.map(([s, e]) => <span key={s} style={{ ...styles.work, left: pct(s), width: pct(e - s) }} />)}
              {shared.map(([s, e]) => <span key={s} style={{ ...styles.shared, left: pct(s), width: pct(e - s) }} />)}
              <span style={{ ...styles.now, left: pct(minute) }} />
            </div>
          </div>
        ))}
        <div style={styles.row}>
          <span />
          <div style={styles.ticks}>
            {TICKS.map(tick => <span key={tick} className="type-label" style={styles.tick}>{tick}</span>)}
          </div>
        </div>
      </div>

      <p className="type-body-md" style={styles.verdict}>{verdict}</p>
    </div>
  )
}

const styles = {
  box: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px 24px',
    backgroundColor: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
  },
  head: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '8px 16px',
  },
  title:  { color: 'var(--color-text-muted)' },
  clocks: { color: 'var(--color-text-primary)' },
  chart: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '32px 1fr',
    alignItems: 'center',
    gap: '12px',
  },
  who: { color: 'var(--color-text-muted)' },
  track: {
    position: 'relative',
    height: '12px',
    backgroundColor: 'var(--color-primary)',
    border: '1px solid var(--color-border)',
  },
  work:   { position: 'absolute', top: 0, bottom: 0, backgroundColor: 'var(--color-track)' },
  shared: { position: 'absolute', top: 0, bottom: 0, backgroundColor: 'var(--color-accent)', boxShadow: '0 0 0 1px var(--color-accent-edge)' },
  now: {
    position: 'absolute',
    top: '-4px',
    bottom: '-4px',
    width: '2px',
    marginLeft: '-1px',
    backgroundColor: 'var(--color-text-primary)',
  },
  ticks: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tick:    { color: 'var(--color-text-secondary)' },
  verdict: { color: 'var(--color-text-primary)', lineHeight: 1.6 },
  accent:  { color: 'var(--color-accent-text)' },
}
