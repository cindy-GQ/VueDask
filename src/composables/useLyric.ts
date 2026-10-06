import { computed, type Ref } from 'vue'

import { parseLRC } from '@/utils/lrcParser'
import type { LyricLine } from '@/types/music'

export function useLyric(lrcText: Ref<string>, currentTime: Ref<number>) {
  const parsedLyrics = computed<LyricLine[]>(() => parseLRC(lrcText.value))

  const currentLineIndex = computed(() => {
    const time = currentTime.value
    const lyrics = parsedLyrics.value
    for (let i = lyrics.length - 1; i >= 0; i--) {
      if (time >= lyrics[i].time) return i
    }
    return 0
  })

  return { parsedLyrics, currentLineIndex }
}
