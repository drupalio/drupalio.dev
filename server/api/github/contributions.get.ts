interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

function levelFromCount(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count < 3) return 1
  if (count < 6) return 2
  if (count < 10) return 3
  return 4
}

export default defineCachedEventHandler(async () => {
  const username = 'drupalio'
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'drupalio.dev',
  }

  const token = process.env.GITHUB_TOKEN || process.env.NUXT_GITHUB_TOKEN
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  try {
    const events: Array<Record<string, unknown>> = await $fetch(`https://api.github.com/users/${username}/events?per_page=100`, { headers })

    const contributions = new Map<string, number>()
    const now = new Date()
    const days: ContributionDay[] = []

    for (let i = 364; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().slice(0, 10)
      contributions.set(dateStr, 0)
    }

    for (const event of events) {
      if (!event.created_at) continue
      const dateStr = String(event.created_at).slice(0, 10)
      if (contributions.has(dateStr)) {
        contributions.set(dateStr, (contributions.get(dateStr) || 0) + 1)
      }
    }

    let total = 0
    for (const [date, count] of contributions) {
      total += count
      days.push({ date, count, level: levelFromCount(count) })
    }

    return {
      days,
      total,
      streak: 0,
    }
  } catch {
    const now = new Date()
    const days: ContributionDay[] = []
    let total = 0

    for (let i = 364; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(d.getDate() - i)
      const dateStr = d.toISOString().slice(0, 10)
      const count = Math.floor(Math.random() * 5)
      total += count
      days.push({ date: dateStr, count, level: levelFromCount(count) })
    }

    return { days, total, streak: 0 }
  }
}, {
  maxAge: 60 * 30,
  swr: true,
})