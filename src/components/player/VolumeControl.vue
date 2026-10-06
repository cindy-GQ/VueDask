<script setup lang="ts">
import { computed } from 'vue'
import { Volume1, Volume2, VolumeX } from 'lucide-vue-next'

import { useAudioPlayer } from '@/composables/useAudioPlayer'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const { setVolume, toggleMute } = useAudioPlayer()

const percent = computed(() => Math.round(playerStore.volume * 100))
const volumeIcon = computed(() => {
  if (playerStore.volume === 0) return VolumeX
  if (playerStore.volume < 0.5) return Volume1
  return Volume2
})

function handleInput(event: Event) {
  const value = Number((event.target as HTMLInputElement).value)
  setVolume(value / 100)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <button class="text-slate-300 transition-colors hover:text-white" @click="toggleMute()">
      <component :is="volumeIcon" class="h-5 w-5" />
    </button>
    <input
      type="range"
      min="0"
      max="100"
      step="1"
      :value="percent"
      class="h-1 w-24 cursor-pointer accent-green-400"
      aria-label="音量"
      @input="handleInput"
    />
  </div>
</template>
