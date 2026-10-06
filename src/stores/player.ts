import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { Song } from '@/types/music'
import { PlayMode } from '@/types/music'

const DEFAULT_VOLUME = 0.6
const VOLUME_KEY = 'vuedask:volume'
const MODE_KEY = 'vuedask:play-mode'

function readVolume(): number {
  try {
    const raw = localStorage.getItem(VOLUME_KEY)
    if (raw === null) return DEFAULT_VOLUME
    const value = Number(raw)
    if (Number.isFinite(value) && value >= 0 && value <= 1) return value
  } catch {
    /* ignore */
  }
  return DEFAULT_VOLUME
}

function readPlayMode(): PlayMode {
  try {
    const raw = localStorage.getItem(MODE_KEY)
    if (raw && (Object.values(PlayMode) as string[]).includes(raw)) {
      return raw as PlayMode
    }
  } catch {
    /* ignore */
  }
  return PlayMode.SEQUENCE
}

export const usePlayerStore = defineStore('player', () => {
  const queue = ref<Song[]>([])
  const currentIndex = ref(-1)
  const currentSong = ref<Song | null>(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(readVolume())
  const lastVolume = ref(DEFAULT_VOLUME)
  const playMode = ref<PlayMode>(readPlayMode())

  const hasPrev = computed(() => currentIndex.value > 0)
  const hasNext = computed(() => currentIndex.value < queue.value.length - 1)
  const progress = computed(() => (duration.value > 0 ? currentTime.value / duration.value : 0))

  function persistVolume() {
    try {
      localStorage.setItem(VOLUME_KEY, String(volume.value))
    } catch {
      /* ignore */
    }
  }

  function persistPlayMode() {
    try {
      localStorage.setItem(MODE_KEY, playMode.value)
    } catch {
      /* ignore */
    }
  }

  function play() {
    isPlaying.value = true
  }

  function pause() {
    isPlaying.value = false
  }

  function togglePlay() {
    isPlaying.value = !isPlaying.value
  }

  function setQueue(songs: Song[], startIndex = 0) {
    queue.value = [...songs]
    currentIndex.value = songs.length > 0 ? Math.min(Math.max(startIndex, 0), songs.length - 1) : -1
    currentSong.value = currentIndex.value >= 0 ? queue.value[currentIndex.value] : null
    currentTime.value = 0
    duration.value = 0
  }

  function playAt(index: number) {
    if (index < 0 || index >= queue.value.length) return
    currentIndex.value = index
    currentSong.value = queue.value[index]
    isPlaying.value = true
  }

  function next() {
    if (queue.value.length === 0) return
    let index = currentIndex.value + 1
    if (playMode.value === PlayMode.RANDOM) {
      index = Math.floor(Math.random() * queue.value.length)
    } else if (index >= queue.value.length) {
      index = 0
    }
    playAt(index)
  }

  function prev() {
    if (queue.value.length === 0) return
    let index = currentIndex.value - 1
    if (playMode.value === PlayMode.RANDOM) {
      index = Math.floor(Math.random() * queue.value.length)
    } else if (index < 0) {
      index = queue.value.length - 1
    }
    playAt(index)
  }

  function seek(time: number) {
    currentTime.value = time
  }

  function setVolume(value: number) {
    const clamped = Math.max(0, Math.min(1, value))
    if (clamped > 0) lastVolume.value = clamped
    volume.value = clamped
    persistVolume()
  }

  function toggleMute() {
    if (volume.value > 0) {
      lastVolume.value = volume.value
      volume.value = 0
    } else {
      volume.value = lastVolume.value > 0 ? lastVolume.value : DEFAULT_VOLUME
    }
    persistVolume()
  }

  function cyclePlayMode() {
    const modes = [PlayMode.SEQUENCE, PlayMode.LOOP, PlayMode.RANDOM]
    const current = modes.indexOf(playMode.value)
    playMode.value = modes[(current + 1) % modes.length]
    persistPlayMode()
  }

  return {
    queue,
    currentIndex,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    lastVolume,
    playMode,
    hasPrev,
    hasNext,
    progress,
    play,
    pause,
    togglePlay,
    setQueue,
    playAt,
    next,
    prev,
    seek,
    setVolume,
    toggleMute,
    cyclePlayMode,
  }
})
