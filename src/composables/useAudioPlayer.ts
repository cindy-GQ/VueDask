import { watch } from 'vue'

import { usePlayerStore } from '@/stores/player'
import { PlayMode } from '@/types/music'

let audio: HTMLAudioElement | null = null
let initialized = false

function ensureAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio()
    audio.preload = 'metadata'
  }
  return audio
}

function safePlay(el: HTMLAudioElement) {
  el.play().catch(() => {
    /* 自动播放被浏览器拦截时静默处理 */
  })
}

export function useAudioPlayer() {
  const store = usePlayerStore()
  const el = ensureAudio()

  if (!initialized) {
    initialized = true

    el.addEventListener('timeupdate', () => {
      store.currentTime = el.currentTime
    })
    el.addEventListener('durationchange', () => {
      store.duration = el.duration
    })
    el.addEventListener('ended', () => {
      if (store.playMode === PlayMode.LOOP) {
        el.currentTime = 0
        safePlay(el)
      } else {
        store.next()
      }
    })

    el.volume = store.volume

    watch(
      () => store.isPlaying,
      (playing) => {
        if (!store.currentSong?.url) return
        if (playing) safePlay(el)
        else el.pause()
      },
    )

    watch(
      () => store.currentSong,
      (song) => {
        if (!song?.url) return
        el.src = song.url
        el.currentTime = 0
        if (store.isPlaying) safePlay(el)
      },
    )

    watch(
      () => store.volume,
      (value) => {
        el.volume = Math.max(0, Math.min(1, value))
      },
    )
  }

  function seek(time: number) {
    if (!Number.isFinite(time)) return
    el.currentTime = time
    store.currentTime = time
  }

  function setVolume(value: number) {
    store.setVolume(value)
  }

  function toggleMute() {
    store.toggleMute()
  }

  return { seek, setVolume, toggleMute, audio: el }
}
