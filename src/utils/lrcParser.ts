import type { LyricLine } from '@/types/music'

const TIME_TAG_REGEX = /\[(\d{2}):(\d{2})(?:[.:](\d{2,3}))?\]/g

export function parseLRC(lrc: string): LyricLine[] {
  if (!lrc) return []

  const result: LyricLine[] = []

  for (const line of lrc.split(/\r?\n/)) {
    const tags = [...line.matchAll(TIME_TAG_REGEX)]
    if (tags.length === 0) continue

    const text = line.replace(TIME_TAG_REGEX, '').trim()
    if (!text) continue

    for (const tag of tags) {
      const minutes = Number(tag[1])
      const seconds = Number(tag[2])
      const fractionRaw = tag[3] ?? '0'
      const fraction = fractionRaw.length === 2 ? Number(fractionRaw) / 100 : Number(fractionRaw) / 1000
      result.push({ time: minutes * 60 + seconds + fraction, text })
    }
  }

  return result.sort((a, b) => a.time - b.time)
}
