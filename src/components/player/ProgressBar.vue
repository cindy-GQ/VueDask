<script setup lang="ts">
import { computed, ref } from 'vue'

import { useAudioPlayer } from '@/composables/useAudioPlayer'
import { usePlayerStore } from '@/stores/player'

const playerStore = usePlayerStore()
const { seek } = useAudioPlayer()

const isDragging = ref(false)
const dragProgress = ref(0)

const displayProgress = computed(() => (isDragging.value ? dragProgress.value : playerStore.progress))

function ratioFromEvent(event: MouseEvent): number {
  const el = event.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  return Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
}

function handleMouseDown(event: MouseEvent) {
  isDragging.value = true
  dragProgress.value = ratioFromEvent(event)
}

function handleMouseMove(event: MouseEvent) {
  if (!isDragging.value) return
  dragProgress.value = ratioFromEvent(event)
}

function handleMouseUp(event: MouseEvent) {
  if (!isDragging.value) return
  isDragging.value = false
  seek(ratioFromEvent(event) * playerStore.duration)
}
</script>

<template>
  <div
    class="group relative h-4 cursor-pointer"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
  >
    <div class="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-slate-700">
      <div class="h-full rounded-full bg-green-400" :style="{ width: `${displayProgress * 100}%` }" />
    </div>
    <div
      class="absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity group-hover:opacity-100"
      :style="{ left: `calc(${displayProgress * 100}% - 6px)` }"
    />
  </div>
</template>
