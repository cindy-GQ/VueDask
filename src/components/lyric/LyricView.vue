<script setup lang="ts">
import { computed, toRef } from 'vue'

import { useLyric } from '@/composables/useLyric'

const props = withDefaults(
  defineProps<{
    lrcText: string
    currentTime: number
  }>(),
  {
    lrcText: '',
    currentTime: 0,
  },
)

const LINE_HEIGHT = 40
const CENTER_OFFSET = 160

const { parsedLyrics, currentLineIndex } = useLyric(toRef(props, 'lrcText'), toRef(props, 'currentTime'))

const offset = computed(() => CENTER_OFFSET - currentLineIndex.value * LINE_HEIGHT)
</script>

<template>
  <div class="relative h-full w-full overflow-hidden">
    <p v-if="!parsedLyrics.length" class="pt-40 text-center text-slate-500">暂无歌词</p>
    <div v-else class="transition-transform duration-300 ease-out" :style="{ transform: `translateY(${offset}px)` }">
      <p
        v-for="(line, index) in parsedLyrics"
        :key="`${line.time}-${index}`"
        class="flex items-center justify-center transition-all duration-300"
        :style="{ height: `${LINE_HEIGHT}px` }"
        :class="index === currentLineIndex ? 'text-2xl font-bold text-green-400' : 'text-base text-slate-500'"
      >
        {{ line.text }}
      </p>
    </div>
  </div>
</template>
